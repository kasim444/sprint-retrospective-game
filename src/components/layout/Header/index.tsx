import {
  Avatar,
  Button,
  Center,
  Container,
  Flex,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "store/features/user/userSlice";

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
          <Flex alignItems={"center"} gap="4">
            {user?.displayName && (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      name={user?.displayName}
                      size="sm"
                      userSelect={"none"}
                      bg="green.400"
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <Center>
                      <Avatar
                        name={user?.displayName}
                        size="md"
                        userSelect={"none"}
                        bg="green.400"
                      />
                    </Center>
                    <Center>
                      <p>{user?.displayName}</p>
                    </Center>
                    <MenuDivider mt="3" />
                    <MenuItem as={Link} to={`/profile`}>
                      My Account
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
