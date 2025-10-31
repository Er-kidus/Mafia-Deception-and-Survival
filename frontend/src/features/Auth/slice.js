import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload.data.user;
      state.accessToken = action.payload.token;
    },
  },
});

export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
