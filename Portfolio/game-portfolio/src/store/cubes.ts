// cubesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Cube = {
  label: string;
  x: number;
  y: number;
  angle: number;
};

type CubeState = {
  cubes: Cube[];
};

const initialState: CubeState = {
  cubes: [],
};

export const cubesSlice = createSlice({
  name: "cubes",
  initialState,
  reducers: {
    setCubes: (state, action: PayloadAction<Cube[]>) => {
      state.cubes = action.payload;
    },
  },
});

export const { setCubes } = cubesSlice.actions;
export default cubesSlice.reducer;
