import { Flex, Container, Heading, Text } from "@chakra-ui/react";
import CreateUserForm from "./CreateUserForm";

const EnterRoom = () => {
  return (
    <Container maxWidth={"container.xl"}>
      <Flex flexDirection={"column"} alignItems="center">
        <Heading mb="2">Enter Room</Heading>
        <Text textAlign={"center"}>
          Provide your name or any pseudonym to enter the sprint retro room.
        </Text>
      </Flex>
      <CreateUserForm />
    </Container>
  );
};

export default EnterRoom;
