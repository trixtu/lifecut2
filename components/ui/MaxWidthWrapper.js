import { Container } from "@chakra-ui/react";

export default function MaxWidthWrapper({children}){
  return(
    <Container maxW={'7xl'} >
      {children}
    </Container>
  )
}