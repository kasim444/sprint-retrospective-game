import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { useParams } from "react-router-dom";
import { REQUIRED_NUMBER_OF_PLAYERS } from "src/pages/Room/Room";
import { db } from "src/services/firebase";
import CreateRetroQuestionForm from "./CreateRetroQuestionForm";
import DeleteRetroQuestionModal from "./DeleteRetroQuestionModal";
import UpdateRetroQuestionForm from "./UpdateRetroQuestionForm";

const UpdateCards = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { roomId } = useParams();
  const theme = useTheme();

  const [cards] = useObject(ref(db, `rooms/${roomId}/cards`));

  return (
    <>
      <Flex justifyContent={"center"}>
        <Button rounded={"full"} onClick={onOpen}>
          Cards
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prepare Questions For Retro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateRetroQuestionForm />
            {cards?.val() && (
              <TableContainer mt="4">
                <Table>
                  <TableCaption>
                    In order for the retro meeting to start, you must create a
                    minimum of {REQUIRED_NUMBER_OF_PLAYERS} questions.
                  </TableCaption>

                  <Thead>
                    <Tr>
                      <Th />
                      <Th />
                      <Th>Color</Th>
                      <Th>Question</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(cards?.val()).map((cardKey: string) => (
                      <Tr key={cardKey}>
                        <Td>
                          <DeleteRetroQuestionModal cardId={cardKey} />
                        </Td>
                        <Td>
                          <UpdateRetroQuestionForm
                            cardId={cardKey}
                            {...cards?.val()[cardKey]}
                          />
                        </Td>
                        <Td>
                          <Box
                            title={cards?.val()[cardKey].color}
                            width={"20px"}
                            height={"20px"}
                            borderRadius={"50%"}
                            backgroundImage={`linear-gradient(45deg,${
                              theme["colors"][cards?.val()[cardKey].color][
                                "400"
                              ] ?? theme["colors"][cards?.val()[cardKey].color]
                            } 50%,rgba(0,0,0,0.3) 100%)`}
                          />
                        </Td>
                        <Td>{cards?.val()[cardKey].question}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateCards;
