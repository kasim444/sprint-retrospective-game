import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <ChakraLink
      as={Link}
      to={`/`}
      _hover={{
        textDecoration: "none",
        "& > span": {
          bgGradient: "linear(to-l, #56ca28, #28ca35)",
        },
      }}
    >
      <Text
        bgGradient="linear(to-l, #56ca28, #0080ff)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
        as="span"
      >
        Retro
      </Text>
    </ChakraLink>
  );
};

export default Brand;
