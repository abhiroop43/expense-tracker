import axios from 'axios';
import Config from 'react-native-config';

export function storeExpense(expenseData) {
  axios.post(`${Config.FIREBASE_URL}/expenses.json`, expenseData);
}
