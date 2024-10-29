import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    searchMailByText: "",
  },
  reducers: {
    setSearchMailByText: (state, action) => {
      state.searchMailByText = action.payload;
    },
  },
});
export const { setSearchMailByText } = emailSlice.actions;
export default emailSlice.reducer;
