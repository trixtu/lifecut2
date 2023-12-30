import { useRef, useState } from 'react'
import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SlideNavButtons from './SlideNavButtons'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


const slideImages = [
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2019/09/terra_3-e1699091652815.jpg',
        caption: 'Slide 1',
    },
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2023/02/Slider-Werbemittel_CTA.jpg',
        caption: 'Slide 2',
    },
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2023/03/B150_Wit_Verlichting-2019-8-scaled-e1699090848755.jpg',
        caption: 'Slide 3',
    },
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2019/09/markisen_beschattungen-e1699091258617.jpg',
        caption: 'Slide 4',
    },
]

const SliderHomePage = () => {
    const [hover, setHover] = useState(false)
    let hoverTimeout
   
    const progressCircle = useRef(null)
    const progressContent = useRef(null)
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress)
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }

    

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout)
        setHover(true)
    }

    const handleMouseLeave = () => {
        // Setează un timeout pentru a reseta starea de hover după 10 secunde
        hoverTimeout = setTimeout(() => {
            setHover(false)
        }, 500)
    }
    return (
        <Swiper
            rewind={true}
            spaceBetween={50}
            slidesPerView={1}
            pagination={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper relative"
        >
            {slideImages.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="slider-image-container">
                        <img
                            className=" max-h-[280px] md:max-h-[400px] lg:max-h-[640px]"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            src={image.url}
                            alt={image.caption}
                        />
                    </div>
                </SwiperSlide>
            ))}
            <div className="slide-nav-buttons">
                <SlideNavButtons
                    hover={hover}
                    handleMouseEnter={handleMouseEnter}
                />
            </div>
            <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </Swiper>
    )
}

export default SliderHomePage
