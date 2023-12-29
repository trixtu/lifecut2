'use client'
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"


const Header = ({children}) => {
  const [header, setHeader] = useState(false)

  const scollHeader = () => {
    if(window.scrollY >= 20){
      setHeader(true)
    }else{
      setHeader(false)
    }
  }
  useEffect(()=>{
    window.addEventListener('scroll',scollHeader)

    return ()=>{
      window.addEventListener('scroll',scollHeader)
    }
  },[])
  //border-b shadow-sm border-borderColor sticky top-0 z-50 inset-x-0 h-15 header
  return (
    <>
      <Box className={header ? "fixed w-full z-50":"bg-[transparent]"} transition={'ease-in '} >
        <header className="relative bg-white">
          {children}
        </header>
      </Box>
    </>
  )
}

export default Header;