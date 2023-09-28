import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const data = {
  status: "idle",
  error: null,
};

export const signupThunk = createAsyncThunk(
  "signupThunk",
  async (userDetails) => {
    const username = userDetails.username;
    console.log(username);
    const { ...userdata } = userDetails;
    console.log(userdata);

    await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userdata),
      }
    );
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
