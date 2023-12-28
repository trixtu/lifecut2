import { CartContext } from "@/context/shopContext"
import { useContext } from "react"
import MiniCart from "../MiniCart"
import { Badge, Box, Link } from "@chakra-ui/react"
import { FaShoppingBag } from "react-icons/fa"

const Cart = () =>{
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <>
      <Box
        className="text-md font-bold cursor-pointer relative mr-5"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <FaShoppingBag size={24}/><Badge position={'absolute'} top={'-9px'} right={'-16px'} variant={'solid'} colorScheme={'red'}>{cartQuantity}</Badge> 
      </Box>
      <MiniCart cart={cart} />
    </>
  )
}
export default Cart