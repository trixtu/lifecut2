import { CartContext } from "@/context/shopContext";
import { Badge, Box, Flex, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { FaHome, FaShoppingBag, FaUser } from "react-icons/fa";

const BottomMenu = () => {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity)
  })
  return (
    <Flex
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      justifyContent="space-around"
      p={4}
      bg="white"
    >
      <Link href="/" color="gray.800" fontSize="xl">
        <Box as={FaHome} />
      </Link>
      <Link href="/search" color="gray.800" fontSize="xl">
        <Box as={FaUser} />
      </Link>
      <Link position={'relative'} color="gray.800" fontSize="xl" onClick={() => setCartOpen(!cartOpen)}>
        <Box as={FaShoppingBag} />
        <Badge position={'absolute'} top={'-9px'} right={'-16px'} variant={'solid'} colorScheme={'red'}>{cartQuantity}</Badge>
      </Link>
    </Flex>
  );
};

export default BottomMenu;