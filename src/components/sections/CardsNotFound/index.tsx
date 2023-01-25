import { Alert, AlertDescription, AlertTitle, Image } from "@chakra-ui/react";

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
        No cards were found
      </AlertTitle>
      <AlertDescription maxWidth="sm" mb="4">
        The cards are expected to be prepared.
      </AlertDescription>
    </Alert>
  );
};

export default CardsNotFound;
