import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ProfileShell from "components/ProfileShell";
import { ref, set } from "firebase/database";
import { IUser } from "interfaces/IUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { db } from "services/firebase";
import { selectUser } from "store/features/user/userSlice";

type UpdateProfileFormProps = Pick<IUser, "displayName">;

const UpdateProfileForm = () => {
  const user = useSelector(selectUser);

  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateProfileFormProps>({
    defaultValues: {
      displayName: user?.displayName,
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileFormProps> = async (
    { displayName },
    e
  ) => {
    e?.preventDefault();
    try {
      await set(ref(db, "users/" + user?.uId), {
        displayName,
      });
      toast({
        title: "Profile updated successfully.",
        status: "success",
        isClosable: true,
      });
      onToggle();
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
      <Collapse in={!isOpen} animateOpacity>
        <ProfileShell title="Personal info">
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td borderBottom={"none"}>Display Name</Td>
                  <Td borderBottom={"none"}>{user?.displayName}</Td>
                  <Td borderBottom={"none"}>
                    <IconButton
                      aria-label="Update Display Name Button"
                      icon={<EditIcon />}
                      onClick={onToggle}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ProfileShell>
      </Collapse>

      <Collapse in={isOpen} animateOpacity>
        <ProfileShell title="Personal info">
          <Box as="form" onSubmit={handleSubmit(onSubmit)} px="2">
            <FormControl isInvalid={Boolean(errors.displayName)}>
              <FormLabel htmlFor="displayName">Display Name</FormLabel>
              <Input
                id="displayName"
                placeholder="displayName"
                minLength={3}
                {...register("displayName", {
                  required: "This is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length should be 3",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.displayName && errors.displayName.message}
              </FormErrorMessage>
            </FormControl>
            <Button mt={4} type="submit">
              Update
            </Button>
          </Box>
        </ProfileShell>
      </Collapse>
    </>
  );
};

export default UpdateProfileForm;
