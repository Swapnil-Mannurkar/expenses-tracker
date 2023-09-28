import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const data = {
  status: "idle",
  error: null,
};

export const signupThunk = createAsyncThunk(
  "signupThunk",
  async (userDetails) => {
    const { ...userData } = userDetails;

    await fetch("", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }
);

const signupSlice = createSlice({
  name: "signupSlice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
