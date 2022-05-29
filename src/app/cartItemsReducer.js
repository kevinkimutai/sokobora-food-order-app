import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, fetchQty } from "../utils/fetchLocalStorageData";

const initialState = {
  cartItems: fetchCart(),
  quantity: fetchQty(),
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems = fetchCart();
      state.quantity = fetchQty();
    },
  },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
