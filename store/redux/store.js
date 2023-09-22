import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import authenticationReducer from "./authentication";

export const store = configureStore({
  reducer: {
    allExpenses: expensesReducer,
    auth: authenticationReducer,
  },
});
