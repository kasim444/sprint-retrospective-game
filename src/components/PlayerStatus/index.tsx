import { Flex, Text } from "@chakra-ui/react";
import { IRetroCard } from "interfaces/IRetroCard";
import { FC } from "react";
import CircleIcon from "../icons/CircleIcon";

type IPlayerStatus = Pick<
  IRetroCard,
  "cardOwnerDisplayName" | "isUsed" | "isActive"
>;

const PlayerStatusIconColors = {
  isUnUsed: "yellow.500",
  isUsed: "gray.500",
  isActive: "green.500",
};

const PlayerStatus: FC<IPlayerStatus> = ({
  isActive,
  isUsed,
  cardOwnerDisplayName,
}) => {
  const PLAYER_STATUS_ICON_COLOR =
    PlayerStatusIconColors[
      isActive ? "isActive" : isUsed ? "isUsed" : "isUnUsed"
    ];

  return (
    <Flex gap="1" alignItems={"center"}>
      <CircleIcon color={PLAYER_STATUS_ICON_COLOR} mt="2px" />
      <Text>{cardOwnerDisplayName}</Text>
    </Flex>
  );
};

export default PlayerStatus;
