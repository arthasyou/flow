import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DndState {
  type: string | null;
}

const initialState: DndState = {
  type: null,
};

export const dragNodeSlice = createSlice({
  name: "dragNode",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string | null>) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = dragNodeSlice.actions;
export default dragNodeSlice.reducer;
