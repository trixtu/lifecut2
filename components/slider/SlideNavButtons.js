import { useSwiper } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SlideNavButtons = ({ hover, handleMouseEnter }) => {
    const swiper = useSwiper()
    const buttonsRefLeft = useRef(null)
    const buttonsRefRight = useRef(null)

    useEffect(() => {
        if (hover) {
            gsap.to(buttonsRefLeft.current, {
                x: 30,
                duration: 1,
                opacity: 2,
                duration: 0.5,
                ease: 'power2.inOut',
            })
            gsap.to(buttonsRefRight.current, {
                x: -30,
                duration: 1,
                opacity: 2,
                duration: 0.5,
                ease: 'power2.inOut',
            })
        } else {
            gsap.to(buttonsRefLeft.current, {
                x: 0,
                duration: 0.5,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
            })
            gsap.to(buttonsRefRight.current, {
                x: 0,
                duration: 0.5,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
            })
        }
    }, [hover])

    return (
        <div>
            <button
                className={
                    hover
                        ? 'absolute z-40 top-[48%] bg-slate-50 p-3 shadow-lg border'
                        : 'hidden'
                }
                onClick={() => swiper.slidePrev()}
                onMouseEnter={handleMouseEnter}
                ref={buttonsRefLeft}
            >
                <FaChevronLeft />
            </button>
            <button
                className={
                    hover
                        ? 'absolute z-40 top-[48%] bg-slate-50 p-3 shadow-lg border right-0'
                        : 'hidden'
                }
                onClick={() => swiper.slideNext()}
                onMouseEnter={handleMouseEnter}
                ref={buttonsRefRight}
            >
                <FaChevronRight />
            </button>
        </div>
    )
}

export default SlideNavButtons
