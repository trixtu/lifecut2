import { Box, Divider, Flex } from "@chakra-ui/react";
import { debounce } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBarLink = ({navigation}) => {
  const [colorMenu, setColorMenu] = useState(null);
  const toggleColorMenu = debounce((index) => {
    setColorMenu((prevIndex) => (prevIndex === index ? null : index));
  },0)
  const insertColorMenu = debounce((index) => {
    setColorMenu((prevIndex) => (prevIndex === index ? null : index));
  },0)
  return (
    <>
      {/* desktop */}
      <Flex 
        alignItems={'center'} 
        justifyContent={'center'} 
        fontSize={'md'} 
        fontWeight={'300'}
        position={'relative'}
       
      >
        {navigation && navigation.map((item,index)=>(
          <Flex 
            className="nav__menu-item"
            key={index} 
            alignItems={'center'} 
            justifyItems={'center'} 
              
          >
            <Box 
              _hover={{textDecoration:'none',bgColor:'#dad9d3'}}
              bgColor={colorMenu === index && '#dad9d3'}
              px={3}
              py={1}>
              <Link href={item.href}>
                <Flex alignItems={'center'} gap={1} textTransform={'uppercase'} fontSize={'sm'} py={1}>  
                  {item.name}
                  {item.submenu && <FaChevronDown size={10}/>}
                </Flex>
              </Link>
            </Box>
            {item.submenu && (
              <ul 
                className="
                  nav__submenu 
                  absolute 
                  border-l
                  border-r
                  border-b
                  border-[#d5d5d1]
                  w-[330px] 
                  px-2 
                  py-2 
                  shadow-lg 
                  rounded-sm 
                  bg-[#dad9d3] 
                  z-50 
                  top-[35px]
                "
                onMouseEnter={()=>toggleColorMenu(index)}
                onMouseLeave={()=>insertColorMenu(index)}
              >
                {item.submenu && item.submenu.map((submenu, index) => (
                  <Link 
                    key={index} 
                    href={submenu.href}
                    _hover={{textDecoration:'none'}}
                  >
                    <Box
                      className={classNames(
                        submenu.current
                          ? 'text-[#CC0000]'
                          : 'text-gray-900 font-semibold hover:text-[#CC0000]',
                        'nav__submenu-item'
                      )}
                      fontWeight={'300'}
                      px={1}
                      py={1}
                    >
                      {submenu.name}
                    </Box>
                  </Link>
              ))}
            </ul>
            )}
          </Flex>
        ))}
        
      </Flex>
      {/* mobile */}
    </>
  )
}

export default NavBarLink;