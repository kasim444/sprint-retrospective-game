import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CreateRoomFormModal from "./CreateRoomFormModal";

const CreateRoom = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Container maxW={"3xl"}>
      <Stack as={Box} textAlign={"center"} spacing="4" py="20">
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Set up your sprint retro game
          <br />
          <Text as={"span"} color={"green.400"}>
            in seconds.
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Create your planning room and invite others with a single click.
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button
            colorScheme={"green"}
            bg={"green.400"}
            rounded={"full"}
            px={6}
            _hover={{
              bg: "green.500",
            }}
            onClick={onToggle}
          >
            CREATE INSTANT ROOM
          </Button>
          {isOpen && <CreateRoomFormModal isOpen={isOpen} onClose={onClose} />}
        </Stack>
      </Stack>
    </Container>
  );
};

export default CreateRoom;
