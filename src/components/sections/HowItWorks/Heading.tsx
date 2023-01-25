import { Center } from "@chakra-ui/react";
import MotionBox from "components/MotionBox";
import MotionText from "components/MotionText";
import { fadeIn } from "utils/motionAnimations";

const Heading = () => {
  return (
    <MotionBox
      as="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={fadeIn.animationContainer}
    >
      <Center>
        <MotionText
          as="h2"
          variants={fadeIn.dynamicUp({ delay: 1 })}
          display={"inline-block"}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          textAlign="center"
          position={"relative"}
          fontWeight={600}
          _after={{
            content: "''",
            width: "full",
            height: "30%",
            position: "absolute",
            bottom: -1,
            left: 0,
            bg: "green.400",
            zIndex: -1,
          }}
        >
          How It Works
        </MotionText>
      </Center>
    </MotionBox>
  );
};

export default Heading;
