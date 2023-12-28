import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"


const Header = ({children}) => {

  return (
    <>
      <Box className={"border-b shadow-sm border-borderColor sticky top-0 z-50 inset-x-0 h-15 header "} transition={'background 0.3s'} >
        <header className="relative bg-white">
          {children}
        </header>
      </Box>
    </>
  )
}

export default Header;