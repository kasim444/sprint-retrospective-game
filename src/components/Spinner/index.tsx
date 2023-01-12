import {
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner as ChakraSpinner,
} from "@chakra-ui/react";
import { FC } from "react";

interface ISpinner {
  isOpen: boolean;
}

const Spinner: FC<ISpinner> = ({ isOpen }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent
        background="transparent"
        boxShadow={"none"}
        alignItems="center"
      >
        <ChakraSpinner size="xl" />
      </ModalContent>
    </Modal>
  );
};

export default Spinner;
