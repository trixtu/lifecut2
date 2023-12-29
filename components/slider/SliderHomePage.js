import { useState } from 'react'
import React from 'react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SlideNavButtons from './SlideNavButtons'

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

    const handleMouseEnter = () => {
        // Anulează timeout-ul existent (dacă există)
        clearTimeout(hoverTimeout)

        // Setează starea de hover
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
                modules={[Navigation, Pagination]}
                className="mySwiper relative"
            >
                {slideImages.map((image, index) => (
                    <div key={index} >
                        <SwiperSlide>
                            <img
                            className='max-h-[280px] md:max-h-[400px] lg:max-h-[640px]'
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                src={image.url}
                                alt={image.caption}
                                
                            />
                        </SwiperSlide>
                    </div>
                ))}
                <SlideNavButtons setHover={setHover} hover={hover} />
            </Swiper>
        </div>
    )
}

export default SliderHomePage
