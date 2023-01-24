import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Brand from "components/Brand";
import NavLinks from "components/NavLinks";
import GitHubRepoLink from "src/components/GitHubRepoLink";
import packageJson from "../../../../package.json";

const Footer = () => {
  return (
    <Box as="footer">
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxWidth={"container.lg"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Stack direction={"row"} alignItems="center" spacing={6}>
            <Brand />
            <GitHubRepoLink />
            <NavLinks />
          </Stack>
          <Stack direction={"row"} alignItems="center" spacing={6}>
            <Text color="gray.500" fontSize={"xs"}>
              <Text as="span">Version: </Text> {packageJson.version}
            </Text>
            <Text>© {new Date().getFullYear()} Retro. All rights reserved</Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
