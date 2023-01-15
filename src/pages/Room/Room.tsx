import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import RetroCard from "components/RetroCard";
import RoomStatusBadge from "components/RoomStatusBadge";
import Spinner from "components/Spinner";
import UpdateCards from "components/UpdateCards";
import { ref, runTransaction } from "firebase/database";
import CircleIcon from "icons/CircleIcon";
import { useRef } from "react";
import Confetti from "react-confetti";
import { useObject } from "react-firebase-hooks/database";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db } from "services/firebase";
import CardsNotFound from "src/components/sections/CardsNotFound";
import { IRetroStatus } from "src/interfaces/IRoom";
import { isOwnRoom, selectUser } from "src/store/features/user/userSlice";
import { RootState } from "store/index";

export const REQUIRED_NUMBER_OF_PLAYERS = 2;

const Room = () => {
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const { roomId } = useParams();
  const toast = useToast();

  const user = useSelector(selectUser);
  const isAdmin = useSelector((state: RootState) =>
    isOwnRoom(state, roomId as string)
  );

  const [roomDetail, roomDetailLoading] = useObject(ref(db, `rooms/${roomId}`));
  const [users, usersLoading] = useObject(ref(db, "users"));

  if (roomDetailLoading || usersLoading) {
    return <Spinner isOpen={true} />;
  }

  if (!roomDetail?.val()) {
    return (
      <Container maxWidth={"container.lg"} mt="1vw">
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Error
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Room not found. Please check the room id.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  const checkValidMinNumberOfPickedCards = () =>
    !roomDetail?.val()?.cards ||
    Object.keys(roomDetail?.val().cards).filter(
      (cardId) => roomDetail?.val().cards[cardId].uId
    ).length >= REQUIRED_NUMBER_OF_PLAYERS;

  // update isVisible value of unowned cards
  const updateUnownedCards = async () => {
    const cardsRef = ref(db, `rooms/${roomId}/cards`);
    await runTransaction(cardsRef, (cards) => {
      if (cards) {
        Object.keys(cards).forEach((cardId) => {
          if (!cards[cardId].uId) {
            cards[cardId].isVisible = false;
          }
        });
      }
      return cards;
    });
  };

  // get next unused random card id
  const getNextUnusedCardId = () => {
    const cards = roomDetail?.val().cards;
    const unusedCards = Object.keys(cards).filter(
      (cardId) =>
        !cards[cardId].isUsed && cards[cardId].isVisible && cards[cardId].uId
    );
    const randomUnusedCardId =
      unusedCards[Math.floor(Math.random() * unusedCards.length)];
    return randomUnusedCardId;
  };

  // update active card and room status and isUsed value
  const updateActiveCard = async (cardId: string) => {
    // set activeCardId and room status
    const activeCardIdRef = ref(db, `rooms/${roomId}`);
    await runTransaction(activeCardIdRef, (room) => {
      if (room) {
        room.activeCardId = cardId;
        room.retroStatus = IRetroStatus.ACTIVE;
      }
      return room;
    });

    // update card isUsed value
    const activeCardRef = ref(db, `rooms/${roomId}/cards/${cardId}`);
    await runTransaction(activeCardRef, (activeCard) => {
      if (activeCard) {
        activeCard.isUsed = true;
      }
      return activeCard;
    });
  };

  const handleStartRetro = async () => {
    // check minumum number of players
    const isValidMinNumberOfPickedCards = checkValidMinNumberOfPickedCards();
    if (!isValidMinNumberOfPickedCards) {
      toast({
        title: "Not enough players.",
        description: `Please wait for at least ${REQUIRED_NUMBER_OF_PLAYERS} players to join the room.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // update isVisible value of unowned cards
    await updateUnownedCards();

    // get first random visible card
    const nextCardId = getNextUnusedCardId();

    // update active card
    await updateActiveCard(nextCardId);
  };

  const handlePickCard = async (cardId: string) => {
    // check if room is ready
    if (roomDetail?.val().isReady) {
      return;
    }

    // check if card already picked
    if (roomDetail?.val().cards[cardId].uId) {
      toast({
        title: "Card already picked.",
        description: "Please pick another card.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // update card owner
    const cardsRef = ref(db, `rooms/${roomId}/cards`);
    await runTransaction(cardsRef, (cards) => {
      if (cards) {
        Object.keys(cards).forEach((cardId) => {
          if (cards[cardId].uId === user?.uId) {
            cards[cardId].uId = null;
          }
        });

        cards[cardId].uId = user?.uId;
      }
      return cards;
    });
  };

  const handleNextRandomMember = async () => {
    // get next card id
    const nextCardId = getNextUnusedCardId();

    if (!nextCardId) {
      finishRetro();
      return;
    }

    await updateActiveCard(nextCardId);
  };

  const getVisibleCards = () => {
    const visibleCards = Object.keys(roomDetail?.val().cards).filter(
      (cardId) => roomDetail?.val().cards[cardId].isVisible
    );

    return visibleCards;
  };

  const getCardOwnerDisplayName = (cardId: string) => {
    const cardOwnerId = roomDetail?.val().cards[cardId].uId;
    return users?.val()[cardOwnerId]?.displayName;
  };

  const resetRoom = async () => {
    const cardsRef = ref(db, `rooms/${roomId}/cards`);
    await runTransaction(cardsRef, (cards) => {
      if (cards) {
        Object.keys(cards).forEach((cardId) => {
          cards[cardId].isVisible = true;
          cards[cardId].isUsed = false;
        });
      }
      return cards;
    });

    const activeCardIdRef = ref(db, `rooms/${roomId}`);
    await runTransaction(activeCardIdRef, (room) => {
      if (room) {
        room.activeCardId = null;
      }
      return room;
    });
  };

  const updateRetroStatus = async (status: IRetroStatus) => {
    const roomRef = ref(db, `rooms/${roomId}`);
    await runTransaction(roomRef, (room) => {
      if (room) {
        room.retroStatus = status;
      }
      return room;
    });
  };

  const finishRetro = async () => {
    await updateRetroStatus(IRetroStatus.FINISHED);

    await resetRoom();

    toast({
      title: "Retro finished.",
      description: "Please wait for the host to start a new retro.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleResetRetro = async () => {
    await updateRetroStatus(IRetroStatus.PENDING);
    await resetRoom();
  };

  return (
    <>
      <Container maxWidth={"container.lg"}>
        <Flex justifyContent={"center"} gap="4" mb="1vw">
          {isAdmin &&
            roomDetail?.val().retroStatus === IRetroStatus.PENDING && (
              <UpdateCards />
            )}

          {isAdmin &&
            roomDetail?.val().retroStatus === IRetroStatus.PENDING && (
              <Button colorScheme={"green"} onClick={handleStartRetro}>
                Start
              </Button>
            )}

          {isAdmin && roomDetail?.val().retroStatus === IRetroStatus.ACTIVE && (
            <Button colorScheme={"green"} onClick={handleNextRandomMember}>
              Next Member
            </Button>
          )}

          {isAdmin && (
            <Button colorScheme={"red"} onClick={handleResetRetro}>
              Reset
            </Button>
          )}
        </Flex>
        <Flex justifyContent={"space-between"} mb="3vw">
          <Box>
            {roomDetail?.val().retroStatus && (
              <Flex alignItems={"flex-end"}>
                <Heading fontSize={"lg"} mr="1">
                  <b>STATUS: </b>
                </Heading>
                <RoomStatusBadge status={roomDetail?.val().retroStatus} />
              </Flex>
            )}
          </Box>
          <Box>
            {roomDetail
              ?.val()
              .gameState?.onlinePlayers?.map((onlinePlayer: string) => (
                <Flex gap="1" alignItems={"center"}>
                  <CircleIcon color="green.500" mt="2px" />
                  <Text key={onlinePlayer}>{onlinePlayer}</Text>
                </Flex>
              ))}
          </Box>
        </Flex>
        <Flex
          ref={cardContainerRef}
          position={"relative"}
          flexWrap="wrap"
          justifyContent={"center"}
          gap="4"
        >
          {!roomDetail?.val().cards ? (
            <CardsNotFound />
          ) : (
            getVisibleCards().map((cardId) => (
              <RetroCard
                key={cardId}
                cardId={cardId}
                color={roomDetail?.val().cards[cardId].color}
                question={roomDetail?.val().cards[cardId].question}
                handlePickCard={handlePickCard}
                cardOwnerDisplayName={getCardOwnerDisplayName(cardId)}
                isActive={cardId === roomDetail?.val().activeCardId}
                isDisabled={
                  roomDetail?.val().retroStatus !== IRetroStatus.PENDING
                }
                isUsed={
                  cardId !== roomDetail?.val().activeCardId &&
                  roomDetail?.val().cards[cardId].isUsed
                }
              />
            ))
          )}
        </Flex>
      </Container>
      {roomDetail?.val().retroStatus === IRetroStatus.FINISHED && <Confetti />}
    </>
  );
};

export default Room;
