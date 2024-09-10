import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Player = {
  x: number;
  y: number;
  facingLeft: boolean;
};

type PlayerState = {
  player: Player;
};

const initialState: PlayerState = {
  player: {
    x: 0,
    y: 0,
    facingLeft: true,
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerState: (
      state,
      action: PayloadAction<{ x: number; y: number; facingLeft: boolean }>
    ) => {
      state.player.x = action.payload.x;
      state.player.y = action.payload.y;
      state.player.facingLeft = action.payload.facingLeft;
    },
  },
});

export const { setPlayerState } = playerSlice.actions;
export default playerSlice.reducer;
