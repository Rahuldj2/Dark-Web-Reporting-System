// components/HomeSlider.js
import React,{ useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomeSlider = () => {
    useEffect(() => {
        // Initialize Swiper
        const swiper = new Swiper('.swiper-container',{
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    },[]);

    return (
        <div className="swiper-container">
            {/* Additional required wrapper */}
            <div className="swiper-wrapper">
                {/* Slides */}
                <div className="swiper-slide">Slide 1</div>
                <div className="swiper-slide">Slide 2</div>
                <div className="swiper-slide">Slide 3</div>
                {/* Add more slides as needed */}
            </div>
            {/* If we need pagination */}
            <div className="swiper-pagination"></div>

            {/* If we need navigation buttons */}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>

            {/* If we need scrollbar */}
            <div className="swiper-scrollbar"></div>
        </div>
    );
};

export default HomeSlider;
