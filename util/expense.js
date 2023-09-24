import axios from "axios";
import { Config } from "../Config";
import { getFormattedDate } from "./date";

const BACKEND_URL = Config.FIREBASE_URL;

export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData,
  );
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

export function updateExpenseService(id, expenseData) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpenseService(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
