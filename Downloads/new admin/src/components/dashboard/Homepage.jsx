import React, { useEffect, useRef, useState } from 'react';
import Buttons from '../utils/buttons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import GameCard from '../utils/GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DashBoardHeader from '../header-footer/dashBoardHeader';
import { Link } from 'react-router-dom';
import apiHandler from '../../functions/apiHandler';

import AdminDashCard from '../../components/utils/adminDashCard'

import gamesIcon from '../../assets/adminAssets/play-list-4--screen-television-display-player-movies-players-tv-media-video-entertainment.png'
import assetsIcon from '../../assets/adminAssets/Group 737.png'
import userIcon from '../../assets/adminAssets/user-check-validate--actions-close-checkmark-check-geometric-human-person-single-success-up-user.png'

function Homepage() {






    const cardData = [
    {
      icon: gamesIcon,
      title: "Games",
      description: "Games Manager",
      link: "/dashboard/games"
    },
    {
      icon: assetsIcon,
      title: "Assets",
      description: "Assets Manager",
      link: "/dashboard/assets"
    },
    {
      icon: userIcon,
      title: "Users",
      description: "User Manager",
      link: "/dashboard/users"
    }
  ];
  return (
   <>
      <div className='flex  bg-background'>
        
        
        <div className='  flex-grow' >

            <div className='container mt-[100px]'>
              
              <h1 className="font-medium text-[30px] leading-[100%] tracking-[0] font-ot-sono text-center">Hi Kami Scerri, Welcome Back!</h1>
              <p className="font-ot-sono font-normal text-[20px] leading-[100%] tracking-[0] text-center mt-5 text-[#6F6F6F]">Choose one of the following options to manage the content you need.</p>

            </div>
              
<div className="container mx-auto mt-20 flex flex-wrap justify-center gap-8">
  {cardData.map((card, index) => (
    <AdminDashCard
      key={index}
      icon={card.icon}
      title={card.title}
      description={card.description}
      link={card.link}
    />
  ))}
</div>


        </div>
      </div>

    </>
  );
}

export default Homepage;
