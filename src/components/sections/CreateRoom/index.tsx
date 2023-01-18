import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import CreateRoomFormModal from "./CreateRoomFormModal";

const CreateRoom = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" alignItems={"center"} width="full">
        <Heading textAlign={"center"} mb="4">
          Set up your sprint retro game in seconds.
        </Heading>
        <Text mb="4">
          Create your planning room and invite others with a single click.
        </Text>
        <Button colorScheme="gray" onClick={onToggle}>
          CREATE INSTANT ROOM
        </Button>
      </Flex>
      {isOpen && <CreateRoomFormModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default CreateRoom;
