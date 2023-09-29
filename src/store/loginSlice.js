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
    const password = userDetails.password;

    const response = await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users.json`
    );
    const users = await response.json();

    if (users[username]) {
      const user = users[username];

      if (user.password === password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username);
      } else {
        return { message: "Incorrect password!" };
      }
      return { user, message: "success" };
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
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const message = action.payload.message;
        const user = action.payload.user;
        if (message === "success") {
          state.status = "success";
          state.user = user;
        } else state.status = message;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
