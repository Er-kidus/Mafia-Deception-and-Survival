import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Toggle_Mobile_Profile: false,
};

export const userSlice = createSlice({
  name: "UIState",
  initialState,
  reducers: {
    toggleMoblieProfile: (state) => {
      state.Toggle_Mobile_Profile = !state.Toggle_Mobile_Profile;
    },
  },
});

export const { toggleMoblieProfile } = userSlice.actions;
export default userSlice.reducer;
