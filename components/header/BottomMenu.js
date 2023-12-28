import { Box, Flex, Link } from "@chakra-ui/react";
import { FaHome, FaShoppingBag, FaUser } from "react-icons/fa";

const BottomMenu = () => {
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
      <Link href="/profile" color="gray.800" fontSize="xl">
        <Box as={FaShoppingBag} />
      </Link>
    </Flex>
  );
};

export default BottomMenu;