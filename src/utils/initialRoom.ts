import { IRetroStatus, IRoom } from "interfaces/IRoom";

export const REQUIRED_NUMBER_OF_PLAYERS = 2;

export const INITIAL_ROOM_STATE: IRoom = {
  retroStatus: IRetroStatus.PENDING,
  requiredNumberOfPlayers: REQUIRED_NUMBER_OF_PLAYERS,
  roomName: `Sprint Retrospective Meeting - ${new Date().toLocaleDateString()}`,
};
