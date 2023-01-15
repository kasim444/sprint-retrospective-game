import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/index";
import { IUser } from "interfaces/IUser";

export type UserState = {
  user: IUser | null;
  isFetchingUser: boolean;
};

const initialState: UserState = {
  user: null,
  isFetchingUser: true,
};

export const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    updateUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setIsFetchingUser: (state, action: PayloadAction<boolean>) => {
      state.isFetchingUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, logout, setIsFetchingUser } = userInfoSlice.actions;

// selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectIsFetchingUser = (state: RootState) =>
  state.user.isFetchingUser;
export const isOwnRoom = (state: RootState, activeRoomId: string) =>
  state.user.user?.roomId === activeRoomId;

export default userInfoSlice.reducer;
