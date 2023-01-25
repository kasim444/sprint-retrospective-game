import { SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ref, runTransaction } from "firebase/database";
import { IRoom } from "interfaces/IRoom";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "services/firebase";
import { REQUIRED_NUMBER_OF_PLAYERS } from "utils/initialRoom";

type RoomSettingsFormProps = Pick<
  IRoom,
  "requiredNumberOfPlayers" | "roomName"
>;

interface IRoomSettings extends RoomSettingsFormProps {
  roomId: string;
}

const RoomSettings: FC<IRoomSettings> = ({
  roomId,
  roomName,
  requiredNumberOfPlayers,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RoomSettingsFormProps>({
    defaultValues: {
      roomName,
      requiredNumberOfPlayers,
    },
  });

  const onSubmit: SubmitHandler<RoomSettingsFormProps> = async (
    { roomName, requiredNumberOfPlayers },
    e
  ) => {
    e?.preventDefault();
    try {
      const roomDetailRef = ref(db, `rooms/${roomId}`);
      await runTransaction(roomDetailRef, (roomDetail) => {
        if (roomDetail) {
          roomDetail.roomName = roomName;
          roomDetail.requiredNumberOfPlayers = requiredNumberOfPlayers;
        }
        return roomDetail;
      });

      toast({
        title: "Room settings updated successfully.",
        status: "success",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: `Something went wrong.`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Tooltip label="Open room settings" fontSize="md">
        <IconButton
          rounded={"full"}
          aria-label="Room Settings"
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Room Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={"4"} px="2">
              <FormControl isInvalid={Boolean(errors.roomName)}>
                <FormLabel htmlFor="roomName">Room Name</FormLabel>
                <Input
                  id="roomName"
                  placeholder="roomName"
                  minLength={3}
                  {...register("roomName", {
                    required: "This is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length should be 3",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.roomName && errors.roomName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.requiredNumberOfPlayers)}>
                <FormLabel htmlFor="requiredNumberOfPlayers">
                  Required Number Of Players
                </FormLabel>
                <Input
                  id="requiredNumberOfPlayers"
                  placeholder="requiredNumberOfPlayers"
                  min={REQUIRED_NUMBER_OF_PLAYERS}
                  {...register("requiredNumberOfPlayers", {
                    required: "This is required",
                    min: {
                      value: REQUIRED_NUMBER_OF_PLAYERS,
                      message: `The minimum number of players required must be ${REQUIRED_NUMBER_OF_PLAYERS}.`,
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.requiredNumberOfPlayers &&
                    errors.requiredNumberOfPlayers.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" type="submit">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoomSettings;
