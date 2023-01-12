import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ref, remove } from "firebase/database";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { IRetroCard } from "src/interfaces/IRetroCard";
import { db } from "src/services/firebase";

type IDeleteRetroQuestionModal = Pick<IRetroCard, "cardId">;

const DeleteRetroQuestionModal: FC<IDeleteRetroQuestionModal> = ({
  cardId,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { roomId } = useParams();
  const toast = useToast();

  const handleDeleteCard = async () => {
    const cardRef = ref(db, `rooms/${roomId}/cards/${cardId}`);
    await remove(cardRef);
    onClose();

    toast({
      title: "Card deleted successfully.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <>
      <IconButton
        aria-label="Delete Card Button"
        title="Delete Card"
        size="sm"
        icon={<DeleteIcon />}
        onClick={onOpen}
        colorScheme="red"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Card
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteCard} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteRetroQuestionModal;
