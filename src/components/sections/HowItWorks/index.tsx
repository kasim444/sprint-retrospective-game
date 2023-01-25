import { Box } from "@chakra-ui/react";
import CreateRoom from "./CreateRoom";
import FinishSession from "./FinishSession";
import Heading from "./Heading";
import InviteOthers from "./InviteOthers";
import PrepareCards from "./PrepareCards";
import StartSession from "./StartSession";

const HowItWorks = () => {
  return (
    <Box as="main" mt={{ base: "10", lg: "20" }}>
      <Heading />
      <CreateRoom />
      <PrepareCards />
      <InviteOthers />
      <StartSession />
      <FinishSession />
    </Box>
  );
};

export default HowItWorks;
