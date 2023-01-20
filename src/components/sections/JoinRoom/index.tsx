import { LinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface IJoinRoom {
  roomId: string;
}

const JoinRoom: FC<IJoinRoom> = ({ roomId }) => {
  const { onCopy, hasCopied } = useClipboard(`/room/${roomId}`);

  return (
    <Container maxW={"5xl"}>
      <Stack textAlign={"center"} align={"center"} spacing="4" py="20">
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          lineHeight={"110%"}
        >
          A personal{" "}
          <Text as={"span"} color={"green.400"}>
            retro room
          </Text>{" "}
          has been assigned to you.
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Share the room id with your teammates so they can join the sprint
          retro.
        </Text>
        <Text mb="1">YOUR ROOM ID: {roomId}</Text>
        <Stack direction={"row"} spacing="2" mt="4">
          <ChakraLink
            as={Link}
            to={`/room/${roomId}`}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"green"}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
            >
              Join Room
            </Button>
          </ChakraLink>
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            onClick={onCopy}
            leftIcon={<LinkIcon />}
          >
            {hasCopied ? "Copied!" : "Share Room"}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default JoinRoom;
