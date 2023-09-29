import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const data = {
  status: "idle",
  error: null,
};

export const signupThunk = createAsyncThunk(
  "signupThunk",
  async (userDetails) => {
    const username = userDetails.username;
    const email = userDetails.email;
    const { ...userdata } = userDetails;

    const response = await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users.json`
    );
    let users = Object.values(await response.json());

    const userExists = users.find((user) => user.username === username);
    const emailExists = users.find((user) => user.email === email);

    if (emailExists) {
      return { message: "Email already exists!" };
    } else if (userExists) {
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
        state.error = action.payload.message;
      });
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
