import { Box, Container } from "@chakra-ui/react";

const FeedbackPage = () => {
  return (
    <Container maxWidth={"container.lg"} mt={"5vh"}>
      <Box
        as="iframe"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfbaeUXgia55OUoe-XI30kSmLUjnTpLz_BXMR1dZR67WdXDrg/viewform?embedded=true"
        width="full"
        height="full"
        minHeight={{ base: "700px", lg: "625px" }}
      />
    </Container>
  );
};

export default FeedbackPage;
