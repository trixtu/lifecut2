import { useRef, useState } from 'react'
import React from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SlideNavButtons from './SlideNavButtons'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

const slideImages = [
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2019/09/terra_3-e1699091652815.jpg',
        title: 'Ganzjähriges Outdoor-Feeling.',
        subtitle: 'Terrassendächer',
    },
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2023/02/Slider-Werbemittel_CTA.jpg',
        title: 'DAMIT ES SIE NICHT EISKALT ERWISCHT:',
        subtitle:
            'Tauschen Sie jetzt Ihre Fenster. Sparen Sie bis zu 40% Energie. Und das beste: Sie erhalten 20% der Gesamtkosten als Steuervorteil zurück.',
        buttonLink: {
            href: '/contact',
            title: 'Hier mehr erfahren',
        },
    },
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2023/03/B150_Wit_Verlichting-2019-8-scaled-e1699090848755.jpg',
        title: 'Hält Sonne, Wind und Kälte ab.',
        subtitle: 'Lamellendach',
        buttonLink: {
            href: '#',
            title: 'Hier mehr erfahren',
        },
    },
    {
        url: 'https://www.hoerner-gmbh.com/wp-content/uploads/2019/09/markisen_beschattungen-e1699091258617.jpg',
        title: 'Für alle, die bei Wind und Wetter Großes vorhaben.',
        subtitle: 'Markisen & Beschattungen ',
        buttonLink: {
            href: '#',
            title: 'Hier mehr erfahren',
        },
    },
]

const SliderHomePage = () => {
    const [hover, setHover] = useState(false)
    const router = useRouter()
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
                            alt={image.title}
                        />
                    </div>
                    {image.title && (
                        <Box
                            className="w-[500px]"
                            display={{ base: 'none', sm: 'block' }}
                            p={2}
                            position={'absolute'}
                            top={{ base: '5%', md: '10%', lg: '30%' }}
                            left={'8%'}
                            w={{ base: '90%', md: '70%', lg: '70%' }}
                            textAlign={'initial'}
                            onMouseEnter={handleMouseEnter}
                        >
                            <Heading
                                color={'#fff'}
                                fontSize={{ base: 'md', md: 'xl', lg: '3xl' }}
                                textShadow={'3px 2px 2px black'}
                                mb={4}
                            >
                                {image.title}
                            </Heading>
                            {image.subtitle && (
                                <Text
                                    color={'#fff'}
                                    textShadow={'2px 2px 1px black'}
                                    mb={4}
                                    fontSize={{
                                        base: 'sm',
                                        md: 'md',
                                        lg: 'xl',
                                    }}
                                >
                                    {image.subtitle}
                                </Text>
                            )}
                            {image.buttonLink && (
                                <Button
                                    colorScheme={'rosuAprins'}
                                    onClick={() =>
                                        router.push(`${image.buttonLink.href}`)
                                    }
                                >
                                    {image.buttonLink.title}
                                </Button>
                            )}
                        </Box>
                    )}
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
