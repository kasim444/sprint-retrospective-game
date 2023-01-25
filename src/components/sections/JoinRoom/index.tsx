import {
  Button,
  Container,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import MotionBox from "components/MotionBox";
import MotionText from "components/MotionText";
import ShareRoomLink from "components/ShareRoomLink";
import { FC } from "react";
import { Link } from "react-router-dom";
import { fadeIn } from "utils/motionAnimations";

interface IJoinRoom {
  roomId: string;
}

const JoinRoom: FC<IJoinRoom> = ({ roomId }) => {
  return (
    <MotionBox
      as="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={fadeIn.animationContainer}
    >
      <Container maxW={"5xl"}>
        <Stack textAlign={"center"} align={"center"} spacing="4" py="20">
          <MotionText
            as="h1"
            variants={fadeIn.up}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            lineHeight={"110%"}
          >
            A personal{" "}
            <Text as={"span"} color={"green.400"}>
              retro room
            </Text>{" "}
            has been assigned to you.
          </MotionText>
          <MotionText variants={fadeIn.up} color={"gray.500"} maxW={"3xl"}>
            Share the room id with your teammates so they can join the sprint
            retro.
          </MotionText>
          <MotionText variants={fadeIn.up} mb="1">
            YOUR ROOM ID: {roomId}
          </MotionText>
          <MotionBox variants={fadeIn.up}>
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
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"green"}
                  bg={"green.400"}
                  _hover={{ bg: "green.500" }}
                >
                  Join Room
                </Button>
              </ChakraLink>
              {roomId && <ShareRoomLink roomId={roomId} />}
            </Stack>
          </MotionBox>
        </Stack>
      </Container>
    </MotionBox>
  );
};

export default JoinRoom;
