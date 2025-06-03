import type { CustomNodeType } from "@/components/Workflow/CustomNodes";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DndState {
  type: CustomNodeType;
}

const initialState: DndState = {
  type: "start",
};

export const dragNodeSlice = createSlice({
  name: "dragNode",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<CustomNodeType>) => {
      state.type = action.payload;
    },
  },
});

export const { setType } = dragNodeSlice.actions;
export default dragNodeSlice.reducer;
