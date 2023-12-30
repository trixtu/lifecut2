/* theme.ts */
import { defineStyle, defineStyleConfig, extendTheme } from "@chakra-ui/react";

const brandPrimary = defineStyle({
  background: 'orange.500',
  color: 'white',
  fontFamily: 'serif',
  fontWeight: 'normal',

  // let's also provide dark mode alternatives
  _dark: {
    background: 'orange.300',
    color: 'orange.800',
  }
})

export const buttonTheme = defineStyleConfig({
  variants: { brandPrimary },
})

export const theme = extendTheme({
  fonts:{
    heading: `'Montserrat', sans-serif;`,
    body: `'Montserrat', sans-serif;`,
  },
  colors: {
    antracitGri: {
      600: "#505050",
    },
    rosuAprins:{
      500:"#CC0000",
      600:"#CC0000",
      900: '#171923',
    },
    alb:"#fff",
    borderColor:"#d5d5d1",
  }
});