"use client"

import { Box,Flex, Link, SimpleGrid, Spacer, Text, Wrap } from "@chakra-ui/react";
import MaxWidthWrapper from "../ui/MaxWidthWrapper";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope} from "react-icons/fa6"

export default function TopNavBar(){
  return(
    <Box className="hidden sm:block" bg={'antracitGri.600'} color={'alb'} py={2}>
      <MaxWidthWrapper >
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Flex gap={10}>
            <Link href="#">
              <Flex alignItems={'center'} gap={2}>
                <FaPhone size={12}/>
                <Text fontSize={'xs'}>+49 (0) 7274 / 70 44 0</Text>
              </Flex>
            </Link>
            <Link href="#">
              <Flex alignItems={'center'} gap={2}>
                <FaEnvelope size={12}/>
                <Text fontSize={'xs'}>info@hoerner-gmbh.com</Text>
              </Flex>
            </Link>
          </Flex>
          <Spacer/>
          <Flex gap={2}>
            <Link _hover={{color:'rosuAprins.600'}} href="#"><FaFacebook size={20}/></Link>
            <Link _hover={{color:'rosuAprins.600'}} href="#"><FaInstagram size={20}/></Link>
          </Flex>
        </Flex> 
      </MaxWidthWrapper> 
    </Box>
  )
}