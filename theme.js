/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

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
      600:"#CC0000"
    },
    alb:"#fff",
    borderColor:"#d5d5d1",
  }
});