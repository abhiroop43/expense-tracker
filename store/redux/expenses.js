import { createSlice } from '@reduxjs/toolkit';
import { getIsoDateString } from '../../util/date';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    allExpenses: [],
  },
  reducers: {
    setExpenses: (state, action) => {
      // sort expenses based on date
      const orderedExpenses = action.payload.sort((p1, p2) => (p1.date < p2.date ? 1 : p1.date > p2.date ? -1 : 0));
      return { ...state, allExpenses: orderedExpenses };
    },
    addExpense: (state, action) => {
      const newExpense = { ...action.payload };
      newExpense.date = getIsoDateString(new Date(action.payload.date));
      state.allExpenses.push(newExpense);
    },

    updateExpense: (state, action) => {
      state.allExpenses = state.allExpenses.map((expense) => {
        if (expense.id === action.payload.id) {
          expense.description = action.payload.description;
          expense.amount = action.payload.amount;
          expense.date = action.payload.date;
        }
        return expense;
      });
    },

    removeExpense: (state, action) => {
      state.allExpenses = state.allExpenses.filter((expense) => {
        return expense.id !== action.payload.id;
      });
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export const removeExpense = expensesSlice.actions.removeExpense;
export const setExpenses = expensesSlice.actions.setExpenses;

export default expensesSlice.reducer;
