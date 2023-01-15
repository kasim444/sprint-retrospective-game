import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { signInAnonymously } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "src/interfaces/IUser";
import { auth, db } from "src/services/firebase";
import { selectUser, updateUser } from "src/store/features/user/userSlice";

const CreateUserForm = () => {
  const [displayName, setDisplayName] = useState("");

  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      signInAnonymously(auth);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...(user as IUser),
      displayName,
    };

    try {
      await set(ref(db, `users/${user?.uId}`), {
        displayName,
      });

      dispatch(updateUser(updatedUser));
      toast({
        title: "Room created successfully.",
        status: "success",
        isClosable: true,
        duration: 500,
      });
    } catch (error) {
      toast({
        title: `Something went wrong.`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" mt="4" maxWidth={"sm"} mx="auto" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="displayName">Display Name</FormLabel>
        <Input
          id="displayName"
          placeholder="Your Display Name *"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </FormControl>
      <Flex flexDirection={"column"} mt="4" gap="4">
        <Button type="submit" colorScheme={"blue"}>
          ENTER ROOM
        </Button>
        <ChakraLink as={Link} to={`/`}>
          <Button width={"full"}>CANCEL</Button>
        </ChakraLink>
      </Flex>
    </Box>
  );
};

export default CreateUserForm;
