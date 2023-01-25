import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import MotionBox from "components/MotionBox";
import MotionText from "components/MotionText";
import { fadeIn } from "utils/motionAnimations";
import Blob from "./Blog";

const InviteOthers = () => {
  return (
    <MotionBox
      as="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={fadeIn.animationContainer}
    >
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: "10", lg: "20" }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <MotionText
            as="h3"
            variants={fadeIn.up}
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "green.400",
                zIndex: -1,
              }}
            >
              Invite
            </Text>
            <br />
            <Text as={"span"} color={"green.400"}>
              others
            </Text>
          </MotionText>
          <MotionText color={"gray.500"} variants={fadeIn.up}>
            Invite your colleagues to your planning retro by sharing the room
            id, just send them the link.
          </MotionText>
        </Stack>
        <MotionBox variants={fadeIn.left} flex={1}>
          <Flex
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
              color={useColorModeValue("red.50", "red.400")}
            />
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={"/images/illustration3.png"}
              />
            </Box>
          </Flex>
        </MotionBox>
      </Stack>
    </MotionBox>
  );
};

export default InviteOthers;
