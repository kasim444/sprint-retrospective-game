import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <>
      <ChakraLink as={Link} to={`/about`}>
        About
      </ChakraLink>
      <ChakraLink as={Link} to={`/feedback`}>
        Feedback
      </ChakraLink>
    </>
  );
};

export default NavLinks;
