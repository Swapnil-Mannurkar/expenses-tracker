import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const data = {
  status: "idle",
  error: null,
};

export const signupThunk = createAsyncThunk(
  "signupThunk",
  async (userDetails) => {
    const username = userDetails.username;
    const { ...userdata } = userDetails;

    const response = await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users.json`
    );
    const users = await response.json();
    if (users[username]) {
      return { message: "User already exists!" };
    }

    await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}.json`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userdata),
      }
    );
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", true);
    return { message: "success" };
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
      .addCase(signupThunk.fulfilled, (state, action) => {
        const message = action.payload.message;
        if (message === "success") state.status = "success";
        else state.status = message;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
