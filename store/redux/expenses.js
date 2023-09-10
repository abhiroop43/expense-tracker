import { createSlice } from '@reduxjs/toolkit';
import { getIsoDateString } from '../../util/date';
import uuid from 'react-native-uuid';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    allExpenses: [
      {
        id: uuid.v4(),
        description: 'A pair of shoes',
        amount: 59.99,
        date: getIsoDateString(new Date('2021-12-19')),
      },
      {
        id: uuid.v4(),
        description: 'A pair of trousers',
        amount: 89.29,
        date: getIsoDateString(new Date('2022-01-05')),
      },
      {
        id: uuid.v4(),
        description: 'Some bananas',
        amount: 5.99,
        date: getIsoDateString(new Date('2021-12-01')),
      },
      {
        id: uuid.v4(),
        description: 'A book',
        amount: 14.99,
        date: getIsoDateString(new Date('2023-09-08')),
      },
      {
        id: uuid.v4(),
        description: 'A pen',
        amount: 8.29,
        date: getIsoDateString(new Date('2023-09-02')),
      },
    ],
  },
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        id: uuid.v4(),
        description: action.payload.description,
        amount: action.payload.amount,
        date: getIsoDateString(new Date(action.payload.date)),
      };
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

export default expensesSlice.reducer;
