import { Box, Flex, Heading } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IProfileShell {
  title: string;
  children: ReactNode;
}

const ProfileShell: FC<IProfileShell> = ({ title, children }) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      border="1px solid rgb(218,220,224)"
      borderRadius="8px"
      p="4"
      mb="4"
    >
      <Box mb="4">
        <Heading as="h1" fontSize={"3xl"}>
          {title}
        </Heading>
      </Box>
      {children}
    </Flex>
  );
};

export default ProfileShell;
