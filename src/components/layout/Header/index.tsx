import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Brand from "components/Brand";
import NavLinks from "components/NavLinks";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "services/firebase";
import { selectUser } from "store/features/user/userSlice";

const Header = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      toast({
        title: `Something went wrong.`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <header>
      <Container maxWidth={"container.lg"}>
        <Box px={4}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Brand />
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <NavLinks />
              </HStack>
            </HStack>
            <Flex alignItems={"center"} gap="4">
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {user?.displayName && (
                <>
                  <Menu placement="bottom">
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
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                <NavLinks />
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Container>
    </header>
  );
};

export default Header;
