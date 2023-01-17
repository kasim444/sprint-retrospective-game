import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signInAnonymously } from "firebase/auth";
import { ref, set } from "firebase/database";
import { IUser } from "interfaces/IUser";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, db } from "services/firebase";
import { selectUser, updateUser } from "store/features/user/userSlice";
import { generateRoomId } from "utils/generateRoomId";
import { INITIAL_ROOM_STATE } from "utils/initialRoom";

interface ICreateRoomFormModal {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoomFormModal: FC<ICreateRoomFormModal> = ({ isOpen, onClose }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");

  useEffect(() => {
    if (!user) {
      signInAnonymously(auth);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const roomId = generateRoomId();
    try {
      // save user
      await set(ref(db, "users/" + user?.uId), {
        displayName,
        roomId,
      });

      // save room
      await set(ref(db, "rooms/" + roomId), INITIAL_ROOM_STATE);

      // update user in store
      const updatedUser = {
        ...(user as IUser),
        displayName,
        roomId,
      };
      dispatch(updateUser(updatedUser));

      toast({
        title: "Room created successfully.",
        status: "success",
        isClosable: true,
      });
      onClose();
      navigate(`/room/${roomId}`);
    } catch (error) {
      toast({
        title: `Something went wrong.`,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>Create your Instant Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Set-up in seconds. Use the instant room feature or sign-up to keep
            the same room number for sprint retro game - making the set-up even
            faster. All we need is a display name.
          </Text>
          {!user?.displayName && (
            <FormControl mt="6">
              <FormLabel htmlFor="displayName">Display Name</FormLabel>
              <Input
                id="displayName"
                placeholder="Your Display Name *"
                required
                minLength={3}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            CREATE ROOM
          </Button>
          <Button variant="ghost" onClick={onClose}>
            CANCEL
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomFormModal;
