import { createSlice } from "@reduxjs/toolkit";

const initialState = { foodItems: null };

const itemsSlice = createSlice({
  name: "foodItems",
  initialState,
  reducers: {
    save(state, action) {
      state.foodItems = action.payload;
    },
  },
});

export const foodItemActions = itemsSlice.actions;
const foodItemsReducer = itemsSlice.reducer;

export default foodItemsReducer;
