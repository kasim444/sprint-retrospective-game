import { Badge } from "@chakra-ui/react";
import { FC } from "react";
import { IRetroStatus } from "src/interfaces/IRoom";

interface IRoomStatusBadge {
  status: IRetroStatus;
}

const StatusColors = {
  [IRetroStatus.PENDING]: "red",
  [IRetroStatus.ACTIVE]: "yellow",
  [IRetroStatus.FINISHED]: "green",
};

const RoomStatusBadge: FC<IRoomStatusBadge> = ({ status }) => {
  const colorScheme = StatusColors[status];

  return <Badge colorScheme={colorScheme}>{status}</Badge>;
};

export default RoomStatusBadge;
