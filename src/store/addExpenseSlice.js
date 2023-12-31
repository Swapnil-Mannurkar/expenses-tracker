import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = {
  status: "idle",
};

export const addExpenseThunk = createAsyncThunk(
  "addExpenseThunk",
  async (expenseDetails) => {
    const title = expenseDetails.title;
    const date = expenseDetails.date;
    const amount = expenseDetails.amount;
    const username = localStorage.getItem("username");
    const { ...expenses } = expenseDetails;

    const response = await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions/${date}/${title}.json`
    );

    let data = await response.json();

    if (data) {
      data.amount = String(Number(data.amount) + Number(amount));
      await fetch(
        `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions/${date}/${title}.json`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } else {
      await fetch(
        `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions/${date}/${title}.json`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(expenses),
        }
      );
    }
  }
);

const addExpenseSlice = createSlice({
  name: "addExpenseSlice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addExpenseThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExpenseThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addExpenseThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const addExpenseActions = addExpenseSlice.actions;
export default addExpenseSlice.reducer;
