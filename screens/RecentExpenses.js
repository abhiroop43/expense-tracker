import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';
import { getDateMinusDays } from '../util/date';

const RECENT_LIMIT = 7;

function RecentExpenses() {
  const allExpenses = useSelector((state) => state.allExpenses.allExpenses);

  const recentExpenses = allExpenses.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date);
    return expenseDate >= getDateMinusDays(today, RECENT_LIMIT) && expenseDate <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod={`Last ${RECENT_LIMIT} Days`}
      expenses={recentExpenses}
      fallbackText={`No expenses registered for the last ${RECENT_LIMIT} days`}
    />
  );
}

export default RecentExpenses;
