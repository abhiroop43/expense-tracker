import axios from 'axios';
import { AppConfig } from '../App.config';
import { getFormattedDate } from './date';

const BACKEND_URL = AppConfig.FIREBASE_URL;

export async function storeExpense(expenseData) {
  const response = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      ...response.data[key],
    };

    expenseObj.date = getFormattedDate(expenseObj.date);

    // console.log(expenseObj);
    expenses.push(expenseObj);
  }

  return expenses;
}
