import { createSlice } from '@reduxjs/toolkit';
import { getIsoDateString } from '../../util/date';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    allExpenses: [
      {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: getIsoDateString(new Date('2021-12-19')),
      },
      {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: getIsoDateString(new Date('2022-01-05')),
      },
      {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: getIsoDateString(new Date('2021-12-01')),
      },
      {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: getIsoDateString(new Date('2022-02-19')),
      },
      {
        id: 'e5',
        description: 'A pen',
        amount: 8.29,
        date: getIsoDateString(new Date('2022-02-18')),
      },
    ],
  },
  reducers: {
    addExpense: (state, action) => {
      state.allExpenses.push(action.payload.expense);
    },

    updateExpense: (state, action) => {
      state.allExpenses.map((expense) => {
        if (expense.id === action.payload.expense.id) {
          expense.description = action.payload.expense.description;
          expense.amount = action.payload.expense.amount;
          expense.description = action.payload.expense.date;
        }
        return expense;
      });
    },

    removeExpense: (state, action) => {
      state.allExpenses = state.allExpenses.filter((expense) => {
        return expense.id != action.payload.id;
      });
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export const removeExpense = expensesSlice.actions.removeExpense;

export default expensesSlice.reducer;
