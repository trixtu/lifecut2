import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Link, useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import { FaBars } from "react-icons/fa6"

const Bars = ({navigation}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  
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
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody overflowY={'scroll'}>
            {navigation && navigation.map((item,index)=>(
              <div key={index}>{item.name}</div>
            ))}
            
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default Bars