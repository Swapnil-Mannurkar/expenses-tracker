import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const data = {
  status: "idle",
  error: "error",
};

export const updateExpenseThunk = createAsyncThunk(
  "updateExpenseThunk",
  async ({ previousExpenseDetails, updatedExpenseDetails }) => {
    const username = localStorage.getItem("username");
 
      await fetch(
        `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions/${previousExpenseDetails.editDate}/${previousExpenseDetails.editTitle}.json`,
        {
          method: "DELETE",
        }
      );
    
    const { ...userDetails } = updatedExpenseDetails;

    await fetch(
      `https://expense-tracker-b7155-default-rtdb.firebaseio.com/users/${username}/transactions/${updatedExpenseDetails.date}/${updatedExpenseDetails.title}.json`,
      {
        method: "PUT",
        body: JSON.stringify(userDetails),
        headers: { "content-type": "application/json" },
      }
    );
  }
);

const updatedExpenseSlice = createSlice({
  name: "updatedExpenseSlice",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateExpenseThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExpenseThunk.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(updateExpenseThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const updatedExpenseActions = updatedExpenseSlice.actions;
export default updatedExpenseSlice.reducer;
