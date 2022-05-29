import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false };

const showCartSlice = createSlice({
  name: "showCart",
  initialState,
  reducers: {
    show(state, action) {
      state.showCart = !state.showCart;
    },
  },
});

export const showCartActions = showCartSlice.actions;
const showCartReducer = showCartSlice.reducer;

export default showCartReducer;
