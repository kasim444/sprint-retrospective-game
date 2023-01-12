import { IGameState } from "src/interfaces/IGameState";

export const INITIAL_GAME_STATE: IGameState = {
  isStart: false,
  completedPlayers: [],
};

export const INITIAL_ROOM_STATE = {
  players: {},
  gameState: INITIAL_GAME_STATE,
};
