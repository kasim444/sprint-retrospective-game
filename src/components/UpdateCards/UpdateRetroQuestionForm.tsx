import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { CARD_COLORS, IRetroCard } from "interfaces/IRetroCard";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { db } from "src/services/firebase";
import { ref, runTransaction } from "firebase/database";

const UpdateRetroQuestionForm: FC<IRetroCard> = ({
  cardId,
  question,
  color,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const questionFieldRef = React.useRef<HTMLInputElement>(null);
  const { roomId } = useParams();
  const toast = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRetroCard>({
    defaultValues: {
      cardId,
      question,
      color,
    },
  });

  const onSubmit: SubmitHandler<IRetroCard> = async ({ cardId, ...rest }) => {
    const cardRef = ref(db, `rooms/${roomId}/cards/${cardId}`);
    await runTransaction(cardRef, (card) => {
      if (card) {
        card.question = rest.question;
        card.color = rest.color;
      }

      return card;
    });

    onClose();

    toast({
      title: "Card updated successfully.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={questionFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Edit Card Button"
          title="Edit Card"
          size="sm"
          icon={<EditIcon />}
          colorScheme="gray"
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <Flex
          as="form"
          flexDirection={"column"}
          onSubmit={handleSubmit(onSubmit)}
          gap="2"
          pt="4"
          px="1"
        >
          <FormControl isInvalid={Boolean(errors.question)}>
            <FormLabel htmlFor="question">Question</FormLabel>
            <Input
              id="question"
              placeholder="Something you want to ask"
              defaultValue={question}
              {...register("question", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.question && errors.question.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.color)}>
            <FormLabel>Card Color</FormLabel>
            <Select
              placeholder="Select card color"
              defaultValue={color}
              {...register("color", {
                required: "This is required",
              })}
            >
              {CARD_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color.toUpperCase()}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.color && errors.color.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit">Save Question</Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default UpdateRetroQuestionForm;
