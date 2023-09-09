import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';

function AllExpenses() {
  const allExpenses = useSelector((state) => state.allExpenses.allExpenses);
  return <ExpensesOutput expensesPeriod="Total" expenses={allExpenses} />;
}

export default AllExpenses;
