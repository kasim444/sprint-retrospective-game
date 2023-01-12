import { Avatar, Container, Flex, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as ChakraLink, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/features/user/userSlice";

const Header = () => {
  const user = useSelector(selectUser);
  return (
    <header>
      <Container maxWidth={"container.lg"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
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
          {user?.displayName && (
            <Tooltip hasArrow label={user?.displayName}>
              <Avatar
                name={user?.displayName}
                size="sm"
                userSelect={"none"}
                bg="green.400"
              />
            </Tooltip>
          )}
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
