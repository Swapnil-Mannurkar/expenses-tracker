import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = {
  user: {},
  status: "idle",
  error: null,
};

export const loginThunk = createAsyncThunk(
  "loginThunk",
  async (userDetails) => {
    const username = userDetails.username;

    const response = await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users.json`
    );
    const users = await response.json();

    if (users[username]) {
    } else {
      return { message: "User not found!" };
    }
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: data,
  reducers: {
    logout(state) {
      localStorage.setItem("isLoggedIn", false);
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
