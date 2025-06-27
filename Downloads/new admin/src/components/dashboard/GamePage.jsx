import React, { useEffect, useState } from 'react';
import InputField from '../utils/InputFields';
import GameCard from '../utils/GameCard';
import DashboardHeader from '../header-footer/dashBoardHeader';
import apiHandler from '../../functions/apiHandler';
import cross from '/logos/cross.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Buttons from '../utils/buttons';
import cardImg from '../../assets/adminAssets/_fortineSM_story_size_1080x1920.png'
import pencil from '../../assets/adminAssets/pencil--change-edit-modify-pencil-write-writing.png'
import arrow from '../../assets/adminAssets/arrow-bend-left.png'
import { Pencil } from "lucide-react";
import { Plus, X } from 'lucide-react';
import '../../../src/mainStyle.css'

function GamePage() {
  const [params] = useSearchParams()
  const studio = params.get("studio")
  console.log(studio)
  const [filters, setFilters] = useState({ skip: 0, limit: 16, studio: studio || "" });
  const [games, setGames] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalGames, setTotalGames] = useState(0);
const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(prev => !prev);


  const dropdownDefaults = (label) => [
    { value: label, selected: true, name: label }
  ];
  const [studios, setStudios] = useState([])

  const [dropdowns, setDropdowns] = useState({
    regionOption: dropdownDefaults('Region'),
    volatilityOption: dropdownDefaults('Volatility'),
    themeOption: dropdownDefaults('Theme'),
    featuresOption: dropdownDefaults('Feature'),
    familyOption: dropdownDefaults('Family'),
    gameTypeOption: dropdownDefaults('Game Type'),
    jackpotOption: dropdownDefaults('Jackpot'),
  });


  useEffect(() => {
    fetchGames();
  }, [filters]);

  useEffect(() => {
    fetchStudios()
    fetchCategories()

  }, [])

  // Scroll event to trigger infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
        !loading && hasMore
      ) {
        setFilters((prev) => ({ ...prev, skip: prev.skip + prev.limit }));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const fetchStudios = async () => {
    try {
      const { data } = await apiHandler.get("studios");
      const options = data?.data?.map((e) => ({ name: e.name, value: e.id }));
      setStudios([{ value: "", selected: true, name: "Select one" }, ...options]);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchCategories = async () => {
    try {
      const { data } = await apiHandler.get("categories");
      const categories = data?.data || [];

      debugger
      const options = (type) => {
        const items = categories?.filter((q) => q.type === type).map((e) => ({ name: e.title, value: e.id }))
        return [{ value: "", selected: true, name: "Select one" }, ...items]
      }

      setDropdowns({
        regionOption: options("region"),
        volatilityOption: options("volatility"),
        themeOption: options("theme"),
        featureOption: options("feature"),
        jackpotOption: options("jackpot"),
        gameTypeOption: options("gameType"),
        familyOption: options("family"),
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchGames = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const { data } = await apiHandler.get(`games?${queryParams}`);
      const newGames = data.data.games || [];
      setGames((prev) => (filters.skip === 0 ? newGames : [...prev, ...newGames]));
      setHasMore((filters.skip + filters.limit) < data.data.total);
      setTotalGames(data.data.total);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
    setLoading(false);
  };

  const onFilterChange = (e) => {
    debugger
    const updatedFilters = { ...filters, [e.target.name]: e.target.value, skip: 0 };
    setGames([]);  // Clear current games when a filter is changed
    setFilters(updatedFilters);
  };

  const clearFilter = (key) => {
    const updatedFilters = { ...filters };
    delete updatedFilters[key];
    updatedFilters.skip = 0;
    setGames([]);
    setFilters(updatedFilters);
  };



  const clearAllFilters = () => {
    setGames([]);
    setFilters({ skip: 0, limit: 16 });
  };
  
const navigate =useNavigate()

   const handleNavigate = (path) => {
    setShowDropdown(false);
    navigate(path);
  };


  return (


    <div className=' group mb-50' >


     <div className="flex flex-col relative py-10 gap-4">
      <div className="flex gap-10 items-center">

        <Buttons className='flex gap-15 justify-between items-center hover:bg-[black] cursor-pointer'  onClick={toggleDropdown}>Add New Game <span className='text-lg'> {showDropdown ? <X size={20} /> : <Plus size={20} />}</span></Buttons>

       

        <div className="flex gap-2 grow items-center rounded-xl border-2 border-black py-2 px-4">
          <img className="h-3.5 w-3.5" src="/logos/Search.png" alt="Search" />
          <input type="text" className="outline-none bg-transparent" placeholder="Keyword" />
        </div>
      </div>

      {showDropdown && (
        <div className="absolute top-24 left-0 top-19 bg-white  rounded-xl   z-10 w-64" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
          <ul className="space-y-2">
            <li  onClick={() => handleNavigate('/dashboard/games/aristocrat-interactive')} className="hover:text-[#00B290] px-3 py-2 rounded cursor-pointer">Aristrocat Intractive</li>
            <li  onClick={() => handleNavigate('/new-action-game')} className="hover:text-[#00B290] px-3 py-2 rounded cursor-pointer">Ignite Studio</li>
            <li  onClick={() => handleNavigate('/new-action-game')} className="hover:text-[#00B290] px-3 py-2 rounded cursor-pointer">Fusion</li>
          </ul>
        </div>
      )}
    </div>


      <div className="games flex gap-20 justify-between items-center">
        <h1 className="font-medium text-[48px] leading-[100%] tracking-[0] font-ot-sono">
          Games
        </h1>


        <div className="filterCta flex gap-3 justify-between items-center">
          {/* <InputField
    type="select"
    id="studio"
    value={filters?.studio}
    options={studios}
  />
  <InputField
    type="select"
    id="region"
    value={filters?.region}
    options={dropdowns.regionOption}
  /> */}

          {/* <div className="relative inline-block">
  <select
    id="category"
    name="category"
    className="appearance-none bg-[#F4F4F4] rounded-md p-2 px-4 pr-10 border-0"
  >
    <option value="">Release Date</option>
    <option value="animation">Option</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <svg
      className="w-4 h-4 text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div> */}


          <select
            id="category"
            name="category"
            className="bg-[#F4F4F4] rounded-md p-2 px-4 pr-10 border-0"
          >
            <option   value="">Release Date</option>
            <option value="animation">Option</option>
          </select>


          <select
            id="category"
            name="category"
            className=" bg-[#F4F4F4]  rounded-md p-2 px-4  border-0 "
          >
            <option value="">Status</option>
            <option value="animation">Option</option>

          </select>
        </div>

      </div>

      {/* Game List */}
      {/* <div className='grid grid-cols-4 gap-x-10 gap-y-16 p-4'>
                {games.map((item, index) => (
                    <GameCard key={index} game={item} />
                ))}
                {!loading && games.length === 0 && (
                    <p className='text-center col-span-4 text-gray-500 text-lg'>No games found.</p>
                )}
            </div> */}

      {/* Loading Indicator */}


      {/*game cards  */}


      <div className="grid grid-cols-4 gap-8  mt-10">

  <div className="max-w-[280px] rounded-xl overflow-hidden shadow  bg-white">
          <div className="relative">
            <img
              src={cardImg}
              alt="Game Poster"
              className="w-full h-[300px] object-cover rounded-t-xl"
            />
            <div className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded" style={{
              background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
            }}>
              01 December
            </div>
            <div className="absolute top-3 right-3 ">
              <button className='bg-[#F4405A] p-2 rounded-full shadow'>
              <img src={pencil} alt="" />

              </button>
              
            </div>
          </div>

          <div className="p-4  bg-[#F4F4F4]">
            <h3 className="font-bold text-lg leading-tight text-black">Fortune Tree Of Wealth</h3>
            <p className="text-sm   mt-1">By: Studio Name</p>

            <div className="flex justify-between gap-2 mt-4">
              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Edit
              </button>
              <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
         <div className="max-w-[280px] rounded-xl overflow-hidden shadow  bg-white">
          <div className="relative">
            <img
              src={cardImg}
              alt="Game Poster"
              className="w-full h-[300px] object-cover rounded-t-xl"
            />
            <div className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded" style={{
              background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
            }}>
              01 December
            </div>
            <div className="absolute top-3 right-3 ">
              <button className='bg-[#F4405A] p-2 rounded-full shadow'>
              <img src={pencil} alt="" />

              </button>
              
            </div>
          </div>

          <div className="p-4  bg-[#F4F4F4]">
            <h3 className="font-bold text-lg leading-tight text-black">Fortune Tree Of Wealth</h3>
            <p className="text-sm   mt-1">By: Studio Name</p>

            <div className="flex justify-between gap-2 mt-4">
              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Edit
              </button>
              <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
         <div className="max-w-[280px] rounded-xl overflow-hidden shadow  bg-white">
          <div className="relative">
            <img
              src={cardImg}
              alt="Game Poster"
              className="w-full h-[300px] object-cover rounded-t-xl"
            />
            <div className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded" style={{
              background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
            }}>
              01 December
            </div>
            <div className="absolute top-3 right-3 ">
              <button className='bg-[#F4405A] p-2 rounded-full shadow'>
              <img src={pencil} alt="" />

              </button>
              
            </div>
          </div>

          <div className="p-4  bg-[#F4F4F4]">
            <h3 className="font-bold text-lg leading-tight text-black">Fortune Tree Of Wealth</h3>
            <p className="text-sm   mt-1">By: Studio Name</p>

            <div className="flex justify-between gap-2 mt-4">
              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Edit
              </button>
              <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
         <div className="max-w-[280px] rounded-xl overflow-hidden shadow  bg-white">
          <div className="relative">
            <img
              src={cardImg}
              alt="Game Poster"
              className="w-full h-[300px] object-cover rounded-t-xl"
            />
            <div className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded" style={{
              background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
            }}>
              01 December
            </div>
            <div className="absolute top-3 right-3 ">
              <button className='bg-[#F4405A] p-2 rounded-full shadow'>
              <img src={pencil} alt="" />

              </button>
              
            </div>
          </div>

          <div className="p-4  bg-[#F4F4F4]">
            <h3 className="font-bold text-lg leading-tight text-black">Fortune Tree Of Wealth</h3>
            <p className="text-sm   mt-1">By: Studio Name</p>

            <div className="flex justify-between gap-2 mt-4">
              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Edit
              </button>
              <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
         <div className="max-w-[280px] rounded-xl overflow-hidden shadow  bg-white">
          <div className="relative">
            <img
              src={cardImg}
              alt="Game Poster"
              className="w-full h-[300px] object-cover rounded-t-xl"
            />
            <div className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded" style={{
              background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
            }}>
              01 December
            </div>
            <div className="absolute top-3 right-3 ">
              <button className='bg-[#F4405A] p-2 rounded-full shadow'>
              <img src={pencil} alt="" />

              </button>
              
            </div>
          </div>

          <div className="p-4  bg-[#F4F4F4]">
            <h3 className="font-bold text-lg leading-tight text-black">Fortune Tree Of Wealth</h3>
            <p className="text-sm   mt-1">By: Studio Name</p>

            <div className="flex justify-between gap-2 mt-4">
              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Edit
              </button>
              <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
         <div className="max-w-[280px] rounded-xl overflow-hidden shadow  bg-white">
          <div className="relative">
            <img
              src={cardImg}
              alt="Game Poster"
              className="w-full h-[300px] object-cover rounded-t-xl"
            />
            <div className="absolute top-3 left-3 text-black px-3 py-2 text-xs font-semibold rounded" style={{
              background: "linear-gradient(86.08deg, #66FFCC 0%, #94FF80 100%)",
            }}>
              01 December
            </div>
            <div className="absolute top-3 right-3 ">
              <button className='bg-[#F4405A] p-2 rounded-full shadow'>
              <img src={pencil} alt="" />

              </button>
              
            </div>
          </div>

          <div className="p-4  bg-[#F4F4F4]">
            <h3 className="font-bold text-lg leading-tight text-black">Fortune Tree Of Wealth</h3>
            <p className="text-sm   mt-1">By: Studio Name</p>

            <div className="flex justify-between gap-2 mt-4">
              <button className="bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Edit
              </button>
              <button className="bg-white hover:text-black hover:border-black border border-[#A8A8A8] text-gray-700 text-sm font-semibold py-1.5 px-6 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
        



    </div>
  

      <div className='mt-[50px] flex justify-center'>
        <button className='cursor-pointer bg-[#00B290] hover:bg-[black] text-white text-sm font-semibold py-1.5 px-6 rounded'>Load More Game</button>
      </div>


<div className="fixed bottom-2 right-30 z-50">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="cursor-pointer bg-[#00B290] hover:bg-[#00a07f] p-4 rounded-full"
  >
    <img src={arrow} alt="arrow" className="w-6 h-5" />
  </button>
</div>



    </div>
  );
}

export default GamePage;
