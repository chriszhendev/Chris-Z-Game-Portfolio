import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Block = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type BlocksState = {
  blocks: Block[];
};

const initialState: BlocksState = {
  blocks: [],
};

export const blockSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<Block>) => {
      state.blocks.push(action.payload);
    },
  },
});

export const { addBlock } = blockSlice.actions;
export default blockSlice.reducer;
