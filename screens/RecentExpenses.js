import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';

function RecentExpenses() {
  const recentExpenses = useSelector((state) => state.allExpenses.allExpenses);
  return <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />;
}

export default RecentExpenses;
