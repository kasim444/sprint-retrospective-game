import { Alert, AlertDescription, AlertTitle, Image } from "@chakra-ui/react";
import UpdateCards from "src/components/UpdateCards";

const CardsNotFound = () => {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      backgroundColor={"transparent"}
    >
      <Image src="/images/not-found.png" alt="Not found" maxWidth={"300px"} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Not Found
      </AlertTitle>
      <AlertDescription maxWidth="sm" mb="4">
        No cards found. Please update your cards.
      </AlertDescription>
      <UpdateCards />
    </Alert>
  );
};

export default CardsNotFound;
