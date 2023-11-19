import { useState } from 'react'

export const handleScroll = ({
  container,
  setShowScrollLeftButton,
  setShowScrollRightButton,
}) => {
  if (container) {
    setShowScrollLeftButton(container.scrollLeft > 0)
    setShowScrollRightButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    )
    container.addEventListener('scroll', handleScroll)
    // Asigură-te că te dezabonezi de la eveniment la dezmontarea componentei
    return () => container.removeEventListener('scroll', handleScroll)
  }
}
