import { Container } from "@chakra-ui/react";
import Hero from "components/sections/Hero";
import HowItWorks from "components/sections/HowItWorks";

const LandingPage = () => {
  return (
    <Container maxWidth={"container.lg"}>
      <Hero />
      <HowItWorks />
    </Container>
  );
};

export default LandingPage;
