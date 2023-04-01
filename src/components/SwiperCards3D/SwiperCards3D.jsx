import React from 'react'
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper'
import { Swiper } from 'swiper/react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import './swiper__cards-3D.css'

const SwiperCards3D = ({ className, children }) => {

    return (
        <Swiper
            className={`swiper__cards-3D ${className ? className : ''}`}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            effect={"coverflow"}
            grabCursor={true}
            loop={true}
            pagination={{ clickable: true }}
            slidesPerView={'auto'}
            autoplay={{
                delay: 10000,
                disableOnInteraction: true,
            }}
            navigation={{
                prevEl: `.${className}-left`,
                nextEl: `.${className}-right`,
            }}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 50,
                modifier: 5,
                slideShadows: false,
            }}
        >
            <div className={'side-blur'} style={{ left: 0 }} >
                <ArrowCircleLeftIcon className={`icon-button ${className}-left`} fontSize='large' color='primary' />
            </div>

            {children}

            <div className={'side-blur'} style={{ transform: 'rotate(180deg)' }} >
                <ArrowCircleLeftIcon className={`icon-button ${className}-right`} fontSize='large' color='primary' />
            </div>
        </Swiper>
    )
}

export default SwiperCards3D