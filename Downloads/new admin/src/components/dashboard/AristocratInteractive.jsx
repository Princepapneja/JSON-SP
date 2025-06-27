import React, { useState } from "react";
import { Plus } from "lucide-react";
import Studio from '../utils/studio'
import { Download } from "lucide-react";
const countries = ["United Kingdom", "United States", "Canada", "Germany", "Australia"];
const GameUploadForm = () => {
    const [variations, setVariations] = useState([{ variation: "", rtp: "" }]);


  
 const [dates, setDates] = useState([
    { country: "United Kingdom", date: "2025-01-10" },
    { country: "", date: "2025-01-10" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
  };

  const handleAdd = () => {
    setDates([...dates, { country: "", date: "2025-01-10" }]);
  };

  const handleRemove = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

    
    return (
        <div className=" mt-6 bg-white min-h-screen text-gray-800 font-sans">

            <div className="border-b pb-4">
                <div className="">
                    <div className="flex gap-6 justify-between items-center">
                        <div className="w-3/4">
                            <label className="block text-sm font-semibold mb-2">Game Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md px-4 py-2"
                                placeholder="Enter game name"
                            />
                        </div>

                        <div className="w-1/4 mt-5">
                            <Studio className="w-full" label='Studio' />
                        </div>
                    </div>


                    <div className="flex gap-2 justify-between items-start">

                        <div className="w-2/4">
                            <label className="block text-sm font-semibold mt-6 mb-2">Game Description Here</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[200px]"
                                placeholder="Game Key Here"
                            />
                        </div>


                        <div className="grid grid-cols-2 gap-6 mt-12">
                            {[
                                "Upload Thumbnail Game Page",
                                "Upload Thumbnail Portrait",
                                "Upload Logo Icon",
                                "Upload Screenshots",
                                "Upload Character Images",
                                "Choose Platform Icon",
                            ].map((text, idx) => (
                                <button
                                    key={idx}
                                    className="bg-[#94FF80] hover:bg-black  hover:text-white text-black text-sm font-medium py-2 px-4 rounded flex items-center justify-between cursor-pointer"
                                >
                                    {text}
                                    <span className="ml-2"><Download size={20} /></span>
                                </button>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="mt-8">
                    <label className="block text-sm font-semibold mb-2">Game Demo Link</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        placeholder="Enter demo link"
                    />
                </div>


               <div className="mt-10">
  <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-center text-sm font-semibold mb-2">
    {[...Array(8)].map((_, index) => {
      const labelIndex = (index % 4) + 1;
      const isUSA = index >= 4;
      return (
        <div className="mt-8" key={index}>
          <label className="block text-sm font-semibold mb-2"> {`Variation ${labelIndex} ${isUSA ? 'USA' : ''}`}</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm text-center"
          />
        </div>
      );
    })}
  </div>
</div>

               <div className="mt-2">
  <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-center text-sm font-semibold mb-2">
    {[...Array(8)].map((_, index) => {
      const labelIndex = (index % 4) + 1;
      const isUSA = index >= 4;
      return (
        <div className="mt-8" key={index}>
          <label className="block text-sm font-semibold mb-2"> {`RTP ${labelIndex} ${isUSA ? 'USA' : ''}`}</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm text-center"
          />
        </div>
      );
    })}
  </div>
</div>


                <div className="mt-10  flex justify-center">
                    <button className="flex items-center space-x-2 text-black text-sm font-medium">
                        <span>Add More</span>
                        <Plus size={35} className="border  rounded-[5px]" />

                    </button>
                </div>
            </div>

<div className="flex justify-between gap-2 mt-10">
                            <Studio className="w-full" label='Features' />
                            <Studio className="w-full" label='Game Type' />
                            <Studio className="w-full" label='Theme' />
                            <Studio className="w-full" label='Family' />

</div>

<div className="flex justify-between gap-2 mt-10">
                            <Studio className="w-full" label='Volatility' />
                            <Studio className="w-full" label='Jackpots' />
                     

</div>

<div className="w-full bg-[#F4F4F4] p-5 rounded-[10px] mt-10">

     <div className="w-full">
                            <label className="block text-sm font-semibold mt-6 mb-2 font-semibold">Game Key</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md bg-white px-4 py-2 min-h-[200px]"
                                placeholder="Game Key Here"
                            />
                        </div>

</div>

 {/* <div className="bg-white p-6 rounded-md shadow-md border border-blue-400">
      <h2 className="text-lg font-semibold mb-4">Release Date</h2>

      <div className="flex items-center justify-between mb-4">
        <label className="text-gray-700 font-medium">General</label>
        <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
          10 Jan, 2025
        </button>
      </div>

      {dates.map((item, index) => (
        <div key={index} className="flex items-center space-x-4 mb-3">
          <select
            className="w-1/3 border border-gray-300 rounded px-2 py-1"
            value={item.country}
            onChange={(e) => handleChange(index, "country", e.target.value)}
          >
            <option value="">Choose Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border border-gray-300 rounded px-2 py-1"
            value={item.date}
            onChange={(e) => handleChange(index, "date", e.target.value)}
          />

          <button
            className="text-red-500 font-bold text-xl"
            onClick={() => handleRemove(index)}
          >
            &times;
          </button>
        </div>
      ))}

      <div className="flex items-center mt-4">
        <button
          className="flex items-center text-sm text-gray-700 hover:text-black"
          onClick={handleAdd}
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add More
        </button>
      </div>
    </div> */}

        </div>
    );
};

export default GameUploadForm;
