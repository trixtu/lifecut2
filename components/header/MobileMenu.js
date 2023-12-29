import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Input, Link, useDisclosure } from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import React, { useRef, useState } from "react"
import { FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa6"
import Logo from "./Logo"

const MobileMenu = ({navigation}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setOpenSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log(navigation)
  return(
    <>
      <Link ref={btnRef} onClick={onOpen} bg={'rosuAprins.600'} borderRadius={5} p={1}>
        <FaBars size={36} color="#fff"/>
      </Link>

      <Drawer 
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={{base:'full', md:'xs'}}
        blockScrollOnMount
        allowPinchZoom
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size={'lg'}/>
          <DrawerHeader><Logo /></DrawerHeader>
          <Divider/>
          <DrawerBody overflowY={'scroll'}>
            <Flex direction="column" align="left" >
            {navigation && navigation.map((item,index)=>(
              <React.Fragment key={index}>
                {item.submenu ? (
                  <Flex
                    textTransform={'uppercase'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    px={'4'}
                    py={'2'}
                    cursor="pointer"
                    _hover={{ textDecoration: "none", bg: "antracitGri.600", textColor:"#fff" }}
                    onClick={()=> toggleSubMenu(index)}
                  >
                    {item.name} {openSubmenuIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </Flex>
                ) : (
                  <Link px={4} py={2} textTransform={'uppercase'}  href="/"   _hover={{ textDecoration: "none" }}>
                    {item.name}
                  </Link>
                )}
                {openSubmenuIndex === index  && item.submenu && (
                  <Flex direction="column" pl={6} >
                    {item.submenu.map((subMenuItem, subIndex) => (
                      <Link
                        textTransform={'uppercase'}
                        key={subIndex}
                        href={subMenuItem.link}
                        p={2}
                        _hover={{ textDecoration: "none", bg: "antracitGri.600", textColor:"#fff" }}
                      >
                        {subMenuItem.name}
                      </Link>
                    ))}
                  </Flex>
                )}
              </React.Fragment>
            ))}
            
            </Flex>
          </DrawerBody>
          <Divider/>
          <DrawerFooter>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default MobileMenu