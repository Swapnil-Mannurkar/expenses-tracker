import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = {
  transactions: "",
  status: "",
  error: "",
};

export const getTransactionsByDateThunk = createAsyncThunk(
  "getTransactionsByDateThunk",
  async (date) => {
    `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions.json`;
  }
);

const getTransactionsByDateSlice = createSlice({
  name: "getTransactionsByDateSlice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsByDateThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTransactionsByDateThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = action.payload;
      })
      .addCase(getTransactionsByDateThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getTransactionsByDateActions = getTransactionsByDateSlice.actions;
export default getTransactionsByDateSlice.reducer;
