import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTransactionsThunk = createAsyncThunk(
  "transactionsThunk",
  async () => {
    const response = await fetch();
    const data = response.json();
    console.log(data);
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
      .addCase(transactionsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(transactionsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.transactions = action.payload;
      })
      .addCase(transactionsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getTransactionsActions = getTransactionsSlice.actions;
export default getTransactionsSlice.reducer;
