import {
  Container,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Container maxWidth={"container.lg"}>
      <Stack spacing="4" py="20">
        <Heading
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="extrabold"
          lineHeight={"tall"}
        >
          <Text
            as="span"
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            About
          </Text>{" "}
          Sprint Retrospective Game
        </Heading>

        <Heading
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="extrabold"
          lineHeight={"tall"}
        >
          <Text
            as="span"
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            What
          </Text>{" "}
          is a Sprint Retrospective?
        </Heading>

        <Text>
          The sprint retrospective meeting is held at the end of a sprint — a
          project management approach where teams complete specific tasks within
          a timeframe.
        </Text>

        <Text>
          A sprint retrospective is a recurring meeting dedicated to discussing
          what went well in a sprint and what can be improved.
        </Text>

        <Heading
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="extrabold"
          lineHeight={"tall"}
        >
          <Text
            as="span"
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Why
          </Text>{" "}
          do we do this?
        </Heading>

        <Text>
          This retro game is a project developed to make the sprint
          retrospective meeting more effective and fun.
        </Text>

        <Heading
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="extrabold"
          lineHeight={"tall"}
        >
          <Text
            as="span"
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            How
          </Text>{" "}
          it works?
        </Heading>

        <OrderedList textAlign={"left"}>
          <ListItem>Scrum Master creates the room for the team.</ListItem>
          <ListItem>
            Creates cards for team members to answer before the meeting.
          </ListItem>
          <ListItem>Team members are invited to the room.</ListItem>
          <ListItem>
            The participation of all team members, the game is started.
          </ListItem>
          <ListItem>
            Each team member chooses a card in a colour of his/her choice.
          </ListItem>
          <ListItem>
            After all team members choose their cards, the Scrum Master starts
            the game.
          </ListItem>
          <ListItem>
            The game starts with the activation of the card chosen by a random
            team member.
          </ListItem>
          <ListItem>This cycle ends with the opening of all cards.</ListItem>
        </OrderedList>
      </Stack>
    </Container>
  );
};

export default AboutPage;
