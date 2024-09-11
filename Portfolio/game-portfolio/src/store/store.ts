import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./player";
import cubeReducer from "./cubes";
import levelReducer from "./levels";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    cubes: cubeReducer,
    level: levelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
