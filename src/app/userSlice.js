import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../utils/fetchLocalStorageData";

const initialState = {
  user: fetchData(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state, action) {
      state.user = null;
    },
  },
});

export const userSliceActions = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
