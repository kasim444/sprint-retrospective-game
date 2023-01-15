import { IRetroCards } from "./IRetroCard";
import { IUser } from "./IUser";

export interface IPlayerOfRoom extends Omit<IUser, "roomId"> {
  onlineStatus: boolean;
}

export interface IPlayersOfRoom {
  [uId: IUser["uId"]]: IPlayerOfRoom;
}

export enum IRetroStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

export interface IRoom {
  cards?: IRetroCards;
  players?: IPlayersOfRoom;
  activeCardId?: string;
  retroStatus: IRetroStatus;
}
