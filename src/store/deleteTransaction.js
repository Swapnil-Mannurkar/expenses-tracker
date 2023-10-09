import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = {
  status: "idle",
  error: "",
};

export const deleteTransactionThunk = createAsyncThunk(
  "deleteTransactionThunk",
  async ({ title, date }) => {
    const username = localStorage.getItem("username");
    await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions/${date}/${title}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }
);

const deleteTransaction = createSlice({
  name: "deleteTransaction",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTransactionThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTransactionThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteTransactionThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const deleteTransactionActions = deleteTransaction.actions;
export default deleteTransaction.reducer;
