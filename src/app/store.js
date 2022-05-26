import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import foodItemsReducer from "./foodItemsSlice";

export const store = configureStore({
  reducer: { user: userReducer, foodItems: foodItemsReducer },
});
