import { useRef, useState } from 'react'
import React from 'react'
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SlideNavButtons from './SlideNavButtons'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 1',
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        caption: 'Slide 2',
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 3',
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
        }, 1500)
    }
    return (
        <div>
            <Swiper
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
                        <img
                            className="max-h-[280px] md:max-h-[400px] lg:max-h-[640px]"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            src={image.url}
                            alt={image.caption}
                        />
                    </SwiperSlide>
                ))}
                <SlideNavButtons setHover={setHover} hover={hover} />
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    )
}

export default SliderHomePage
