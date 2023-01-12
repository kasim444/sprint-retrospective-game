import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import RetroCard from "components/RetroCard";
import Spinner from "components/Spinner";
import UpdateCards from "components/UpdateCards";
import { child, get, ref, runTransaction, set } from "firebase/database";
import CircleIcon from "icons/CircleIcon";
import { IRetroCard } from "interfaces/IRetroCard";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { useObject } from "react-firebase-hooks/database";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { db } from "services/firebase";
import CardsNotFound from "src/components/sections/CardsNotFound";
import { isOwnRoom, selectUser } from "src/store/features/user/userSlice";
import { RootState } from "store/index";

export const REQUIRED_NUMBER_OF_PLAYERS = 3;

const Room = () => {
  const { roomId } = useParams();
  const toast = useToast();

  const user = useSelector(selectUser);
  const isAdmin = useSelector((state: RootState) =>
    isOwnRoom(state, roomId as string)
  );

  const [roomDetail, roomDetailLoading] = useObject(ref(db, `rooms/${roomId}`));

  useEffect(() => {
    const saveOnlinePlayer = async () => {
      const roomDetail = await get(child(ref(db), `rooms/${roomId}`));

      if (roomDetail.exists()) {
        // set online players when user join the room
        const onlinePlayersRef = ref(
          db,
          `rooms/${roomId}/gameState/onlinePlayers`
        );

        runTransaction(onlinePlayersRef, (onlinePlayers) => {
          if (onlinePlayers && Array.isArray(onlinePlayers)) {
            !onlinePlayers.includes(user?.displayName) &&
              onlinePlayers.push(user?.displayName);
          } else {
            onlinePlayers = [user?.displayName];
          }

          return onlinePlayers;
        });
      }
    };

    saveOnlinePlayer();

    return () => {
      // remove online player when user leave the room
      const onlinePlayersRef = ref(
        db,
        `rooms/${roomId}/gameState/onlinePlayers`
      );
      runTransaction(onlinePlayersRef, (onlinePlayers) => {
        if (onlinePlayers && Array.isArray(onlinePlayers)) {
          const index = onlinePlayers.indexOf(user?.displayName);
          console.log({ index });
          if (index > -1) {
            onlinePlayers.splice(index, 1);
          }
        }
        return onlinePlayers;
      });
    };
  }, [roomId]);

  const handlePickCard = (cardId: string) => {
    const playersRef = ref(db, `rooms/${roomId}/players`);

    runTransaction(playersRef, (players) => {
      if (players && Array.isArray(players)) {
        const isExistPlayer = players.includes(user?.uId);
        if (isExistPlayer) {
          toast({
            title: "You cannot choose another card.",
            status: "error",
            isClosable: true,
          });
          return;
        }

        players.push(user?.uId);
      } else {
        players = [user?.uId];
      }

      const cardRef = ref(db, `rooms/${roomId}/cards/${cardId}`);
      runTransaction(cardRef, (card) => {
        if (card) {
          card.uId = user?.uId;
          card.cardOwnerDisplayName = user?.displayName;
          card.isActive = false;
        }
        return card;
      });

      return players;
    });
  };

  const handleStartRetro = async () => {
    // pick first random player
    const players = roomDetail?.val().players || [];

    if (players.length < REQUIRED_NUMBER_OF_PLAYERS) {
      toast({
        title: `You need at least ${REQUIRED_NUMBER_OF_PLAYERS} players to start the retro.`,
        status: "error",
        isClosable: true,
      });
      return;
    }

    // delete cards with no uId value
    const cardsRef = ref(db, `rooms/${roomId}/cards`);
    await runTransaction(cardsRef, (cards) => {
      if (cards) {
        Object.keys(cards).forEach((cardId) => {
          if (!cards[cardId].uId) {
            delete cards[cardId];
          }
        });
      }
      return cards;
    });

    const randomPlayerIndex = Math.floor(Math.random() * players.length);
    const currentPlayer = players[randomPlayerIndex];

    // set active player
    const cRef = ref(db, `rooms/${roomId}/cards`);
    await runTransaction(cRef, (cards) => {
      if (cards) {
        Object.keys(cards).forEach((cardId) => {
          if (cards[cardId].uId === currentPlayer) {
            cards[cardId].isActive = true;
          }
        });
      }
      return cards;
    });

    // set game state
    const gameStateRef = ref(db, `rooms/${roomId}/gameState`);
    runTransaction(gameStateRef, (gameState) => {
      if (gameState) {
        gameState.isStart = true;
      }
      return gameState;
    });
  };

  const handleResetRetro = async () => {
    const gameStateRef = ref(db, `rooms/${roomId}/gameState`);
    await runTransaction(gameStateRef, (gameState) => {
      if (gameState) {
        gameState.isStart = false;
        gameState.completedPlayers = [];
      }
      return gameState;
    });

    const cardsRef = ref(db, `rooms/${roomId}/cards`);
    await runTransaction(cardsRef, (cards) => {
      if (cards) {
        Object.keys(cards).forEach((cardId) => {
          cards[cardId] = {
            color: cards[cardId].color,
            question: cards[cardId].question,
            isActive: false,
            uId: "",
            cardOwnerDisplayName: "",
          };
        });
      }
      return cards;
    });

    const playersRef = ref(db, `rooms/${roomId}/players`);
    set(playersRef, []);
  };

  // handle random next player
  const handleNextMember = async () => {
    const isCompletedRetro = checkCompletedRetro();

    if (isCompletedRetro) {
      handleEndRetro();
      return;
    }

    const players = roomDetail?.val().players;
    const cards: IRetroCard[] = roomDetail?.val().cards;

    const activePlayerId = Object.values(cards).find(
      (card: IRetroCard) => card.isActive
    )?.uId;

    if (!activePlayerId) {
      return;
    }

    // set completed player
    const completedPlayersRef = ref(
      db,
      `rooms/${roomId}/gameState/completedPlayers`
    );
    await runTransaction(completedPlayersRef, (completedPlayers) => {
      if (completedPlayers && Array.isArray(completedPlayers)) {
        !completedPlayers.includes(activePlayerId) &&
          completedPlayers.push(activePlayerId);
      } else {
        completedPlayers = [activePlayerId];
      }

      return completedPlayers;
    });

    const completedPlayersSnapshot = await get(
      child(ref(db), `rooms/${roomId}/gameState/completedPlayers`)
    );

    if (completedPlayersSnapshot.exists()) {
      // set next random active player
      const completedPlayers = completedPlayersSnapshot.val() || [];
      const remainingPlayers = players.filter(
        (c: string) => !completedPlayers.includes(c)
      );
      const randomPlayerIndex = Math.floor(
        Math.random() * remainingPlayers.length
      );
      const currentPlayer = remainingPlayers[randomPlayerIndex];

      const cardsRef = ref(db, `rooms/${roomId}/cards`);
      runTransaction(cardsRef, (cards) => {
        if (cards) {
          Object.keys(cards).forEach((cardId) => {
            if (cards[cardId].uId === currentPlayer) {
              cards[cardId].isActive = true;
            } else {
              cards[cardId].isActive = false;
            }
          });
        }
        return cards;
      });
    }
  };

  // handle end retro
  const handleEndRetro = () => {
    handleResetRetro();
    handleRetroEndAlert();
  };

  const checkCompletedRetro = () => {
    const players = roomDetail?.val().players;
    const completedPlayers = roomDetail?.val().gameState.completedPlayers;

    if (players && completedPlayers) {
      if (players.length === completedPlayers.length) {
        return true;
      }
    }

    return false;
  };

  const handleRetroEndAlert = () => {
    toast({
      title: "Retro ended.",
      description: "See you at the next sprint retro meeting.",
      status: "success",
      isClosable: true,
    });
  };

  if (roomDetailLoading) {
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

  console.log({ cards: roomDetail?.val().cards });

  return (
    <>
      <Container maxWidth={"container.lg"}>
        <Flex justifyContent={"center"} gap="4" mb="1vw">
          {isAdmin && !roomDetail?.val().gameState.isStart && <UpdateCards />}

          {isAdmin &&
            roomDetail?.val()?.cards &&
            Object.keys(roomDetail?.val().cards).length >=
              REQUIRED_NUMBER_OF_PLAYERS &&
            !roomDetail?.val().gameState.isStart && (
              <Button colorScheme={"green"} onClick={handleStartRetro}>
                Start
              </Button>
            )}

          {isAdmin && (
            <Button colorScheme={"red"} onClick={handleResetRetro}>
              Reset
            </Button>
          )}

          {isAdmin && roomDetail?.val().gameState.isStart && (
            <Button colorScheme={"green"} onClick={handleNextMember}>
              Next Member
            </Button>
          )}

          {isAdmin &&
            roomDetail?.val().gameState.isStart &&
            Array.isArray(roomDetail?.val().gameState.completedPlayers) &&
            roomDetail?.val().gameState.completedPlayers.length ===
              roomDetail?.val().players.length && (
              <Button colorScheme={"green"} onClick={handleEndRetro}>
                End
              </Button>
            )}
        </Flex>
        <Flex justifyContent={"space-between"} mb="3vw">
          <Box>
            <Flex alignItems={"flex-end"}>
              <Heading fontSize={"lg"} mr="1">
                <b>STATUS: </b>
              </Heading>
              <Box>
                {!roomDetail?.val().gameState.isStart ? (
                  <Badge colorScheme="red">Pending</Badge>
                ) : Array.isArray(
                    roomDetail?.val().gameState.completedPlayers
                  ) &&
                  roomDetail?.val().gameState.completedPlayers.length ===
                    roomDetail?.val().players.length ? (
                  <Badge colorScheme="green">Completed</Badge>
                ) : (
                  <Badge colorScheme="yellow">Started</Badge>
                )}
              </Box>
            </Flex>
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
          position={"relative"}
          flexWrap="wrap"
          justifyContent={"center"}
          gap="4"
        >
          {!roomDetail?.val().cards ? (
            <CardsNotFound />
          ) : (
            roomDetail?.val().cards &&
            Object.keys(roomDetail?.val().cards).map((key) => (
              <RetroCard
                key={key}
                cardId={key}
                color={roomDetail?.val().cards[key].color}
                question={roomDetail?.val().cards[key].question}
                handlePickCard={handlePickCard}
                cardOwnerDisplayName={
                  roomDetail?.val().cards[key].cardOwnerDisplayName
                }
                isActive={roomDetail?.val().cards[key].isActive}
                isDisabled={roomDetail?.val().gameState.isStart}
              />
            ))
          )}
        </Flex>
      </Container>
      {roomDetail?.val().gameState.isStart &&
        Array.isArray(roomDetail?.val().gameState.completedPlayers) &&
        roomDetail?.val().gameState.completedPlayers.length ===
          roomDetail?.val().players.length && <Confetti />}
    </>
  );
};

export default Room;
