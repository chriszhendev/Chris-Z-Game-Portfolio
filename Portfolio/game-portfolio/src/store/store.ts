import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import cubeReducer from "./cubes";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    cubes: cubeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
