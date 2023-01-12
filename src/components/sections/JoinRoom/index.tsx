import { FC } from "react";
import {
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LinkIcon } from "@chakra-ui/icons";

interface IJoinRoom {
  roomId: string;
}

const JoinRoom: FC<IJoinRoom> = ({ roomId }) => {
  const { onCopy, hasCopied } = useClipboard(`/room/${roomId}`);

  return (
    <Flex flexDirection="column" alignItems={"center"}>
      <Heading mb="4" textAlign={"center"}>
        A personal retro room has been assigned to you.
      </Heading>
      <Text mb="4">
        Share the room id with your teammates so they can join the sprint retro.
      </Text>
      <Text mb="1">YOUR ROOM ID: {roomId}</Text>
      <Flex gap="2" mt="4">
        <ChakraLink
          as={Link}
          to={`/room/${roomId}`}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button colorScheme="blue">Join Room</Button>
        </ChakraLink>
        <Button colorScheme="gray" onClick={onCopy} leftIcon={<LinkIcon />}>
          {hasCopied ? "Copied!" : "Share Room"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default JoinRoom;
