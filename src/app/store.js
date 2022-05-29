import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import foodItemsReducer from "./foodItemsSlice";
import showCartReducer from "./showCartSlice";
import cartReducer from "./cartItemsReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    foodItems: foodItemsReducer,
    showCart: showCartReducer,
    cartItems: cartReducer,
  },
});
