import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { ref, set } from "firebase/database";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { CARD_COLORS, IRetroCard } from "src/interfaces/IRetroCard";
import { db } from "src/services/firebase";
import { generateRoomId } from "src/utils/generateRoomId";

const CreateRetroQuestionForm = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { roomId } = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IRetroCard>({
    defaultValues: {
      cardId: generateRoomId(6),
    },
  });

  useEffect(() => {
    setValue("cardId", generateRoomId(6));
  }, [isOpen]);

  const onSubmit: SubmitHandler<IRetroCard> = async ({ cardId, ...rest }) => {
    await set(ref(db, `rooms/${roomId}/cards/${cardId}`), {
      ...rest,
    });
    reset();
    onToggle();
  };

  return (
    <>
      <Flex justifyContent={"flex-end"}>
        <Button onClick={onToggle}>Create a new question</Button>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
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
              {...register("question", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
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
          <Button type="submit" colorScheme={"green"}>
            Save Question
          </Button>
        </Flex>
      </Collapse>
    </>
  );
};

export default CreateRetroQuestionForm;
