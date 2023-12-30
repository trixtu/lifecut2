import { useSwiper } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const SlideNavButtons = ({hover}) => {
    const swiper = useSwiper()

    return (
        <div>
            <button className={hover ? 'absolute z-40 top-[48%] bg-slate-50 p-2 ml-4 shadow-sm border' : 'hidden'} onClick={() => swiper.slidePrev()} >
                <FaChevronLeft />
            </button>
            <button className={hover ? 'absolute z-40 top-[48%] bg-slate-50 p-2 mr-4 shadow-sm border right-0' : 'hidden'} onClick={() => swiper.slideNext()}>
                <FaChevronRight />
            </button>
        </div>
    )
}

export default SlideNavButtons
