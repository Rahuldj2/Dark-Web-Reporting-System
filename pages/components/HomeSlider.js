// HomeSlider.js
import React from 'react';
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade,Navigation,Pagination,Autoplay } from 'swiper/modules';
import styles from '../../styles/HomeSlider.module.css';
import Image from 'next/image';

const HomeSlider = ({ imageArray }) => {
    return (
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            loop={true}
            modules={[EffectFade,Navigation,Pagination,Autoplay]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            className="mySwiper"
        >
            {imageArray.map((imageName,index) => (
                <SwiperSlide key={index}>
                    <div className={styles.slideWrapper}>
                        <Image
                            src={`/${imageName}`}
                            alt={`Slide ${index + 1}`}
                            width={1000}
                            height={600}
                        // fill
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default HomeSlider;
