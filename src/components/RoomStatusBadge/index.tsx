import { Badge } from "@chakra-ui/react";
import { IRetroStatus } from "interfaces/IRoom";
import { FC } from "react";

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

  return (
    <Badge colorScheme={colorScheme} rounded="full" px="2" py="1">
      {status}
    </Badge>
  );
};

export default RoomStatusBadge;
