import { Avatar, Box, Button, Text, Tooltip, useTheme } from "@chakra-ui/react";
import { FC } from "react";
import { IRetroCard } from "src/interfaces/IRetroCard";

const RetroCard: FC<IRetroCard> = ({
  color = "blue",
  question,
  cardOwnerDisplayName,
  isDisabled,
  isActive,
  handlePickCard,
  cardId,
  isUsed,
}) => {
  const theme = useTheme();
  return (
    <Box
      backgroundColor="transparent"
      width={"full"}
      maxWidth="250px"
      position={"relative"}
      transition="transform 0.4s ease-in-out"
      className={`${isActive ? "retroCard--isActive" : ""} ${
        isUsed ? "retroCard--isUsed" : ""
      }`}
      _hover={{
        transform: "scale(1.05)",
        zIndex: 1,
      }}
      sx={{
        perspective: "1000px",
        aspectRatio: "3/4",
        "&.retroCard--isActive": {
          zIndex: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.15)",

          "& > div": {
            transform: "rotateY(180deg)",
          },
        },
        "&.retroCard--isUsed": {
          filter: "grayscale(1)",
        },
      }}
    >
      <Box
        position="relative"
        width="full"
        height="full"
        transition="transform 0.6s"
        boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
        sx={{
          transformStyle: "preserve-3d",
        }}
      >
        <Box
          position="absolute"
          width="100%"
          height="100%"
          backgroundImage={`linear-gradient(45deg,${
            theme["colors"][color]["400"] ?? theme["colors"][color]
          } 50%,rgba(0,0,0,0.3) 100%)`}
          color="white"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            backfaceVisibility: "hidden",
          }}
          _before={{
            content: '""',
            position: "absolute",
            border: "5px solid rgba(255,255,255,.5)",
            top: "20px",
            left: "20px",
            right: "20px",
            bottom: "20px",
            zIndex: 2,
            transition: "ease all 2.3s",
            transformStyle: "preserve-3d",
            transform: "translateZ(0px)",
          }}
          _after={{
            content: '""',
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            zIndex: 2,
            transition: "ease all 1.3s",
            background: "rgba(0,0,0,.1)",
          }}
        >
          <Box zIndex={3}>
            {cardOwnerDisplayName ? (
              <Tooltip hasArrow label={cardOwnerDisplayName}>
                <Avatar
                  name={cardOwnerDisplayName}
                  size="sm"
                  userSelect={"none"}
                  background="rgba(0,0,0,0.1)"
                />
              </Tooltip>
            ) : !isDisabled ? (
              <Button
                colorScheme="blackAlpha"
                onClick={() => handlePickCard(cardId)}
              >
                Pick Card
              </Button>
            ) : null}
          </Box>
        </Box>
        <Box
          position="absolute"
          width="100%"
          height="100%"
          backgroundColor="black"
          color="white"
          transform="rotateY(180deg)"
          p="6"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          sx={{
            backfaceVisibility: "hidden",
          }}
          _before={{
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: 2,
            transition: "ease all 2.3s",
            transformStyle: "preserve-3d",
            transform: "translateZ(0px)",
            borderWidth: "5px",
            borderStyle: "solid",
            borderImage: `linear-gradient(to right, ${
              theme["colors"][color]["300"] ?? theme["colors"][color]
            }, ${theme["colors"][color]["600"] ?? theme["colors"][color]}) 1`,
          }}
        >
          {cardOwnerDisplayName && (
            <Tooltip hasArrow label={cardOwnerDisplayName}>
              <Avatar
                name={cardOwnerDisplayName}
                size="sm"
                userSelect={"none"}
                bgGradient={`linear(to-r, ${color}.300, ${color}.600)`}
                position="absolute"
                bottom="6"
                left="50%"
                transform="translateX(-50%)"
              />
            </Tooltip>
          )}
          <Text textAlign={"center"}>{question}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RetroCard;
