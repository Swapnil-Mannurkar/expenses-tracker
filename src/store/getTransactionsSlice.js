import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTransactionsThunk = createAsyncThunk(
  "transactionsThunk",
  async () => {
    const username = localStorage.getItem("username");
    const response = await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions.json`
    );
    const data = await response.json();
    console.log(...data);
  }
);

const data = {
  error: null,
  status: "idle",
  transactions: {},
};

const getTransactionsSlice = createSlice({
  name: "getTransactionsSlice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTransactionsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = action.payload;
      })
      .addCase(getTransactionsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getTransactionsActions = getTransactionsSlice.actions;
export default getTransactionsSlice.reducer;
