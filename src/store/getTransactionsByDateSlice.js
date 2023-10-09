import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = {
  transactions: [],
  status: "",
  error: "",
};

export const getTransactionsByDateThunk = createAsyncThunk(
  "getTransactionsByDateThunk",
  async (date) => {
    const username = localStorage.getItem("username");
    const response = await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions/${date}.json`
    );
    const data = await response.json();
    return Object.values(data);
  }
);

const getTransactionsByDateSlice = createSlice({
  name: "getTransactionsByDateSlice",
  initialState: data,
  reducers: {
    reset(state) {
      state.status = "idle";
      state.transactions = [];
      state.error = "";
    },
  },
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
        state.transactions = [];
        state.error = action.error.message;
      });
  },
});

export const getTransactionsByDateActions = getTransactionsByDateSlice.actions;
export default getTransactionsByDateSlice.reducer;
