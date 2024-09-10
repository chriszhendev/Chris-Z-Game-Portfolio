import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Level = {
  currentLevel: number;
};

type LevelState = {
  level: Level;
};

const initLevel: Level = { currentLevel: 0 };

const initialState: LevelState = {
  level: initLevel,
};

export const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    setLevel: (state, action: PayloadAction<number>) => {
      state.level.currentLevel = action.payload; // Set currentLevel directly from the payload
    },
  },
});

export const { setLevel } = levelSlice.actions;
export default levelSlice.reducer;
