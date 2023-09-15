import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useDispatch, useSelector } from 'react-redux';
import { getDateMinusDays } from '../util/date';
import { useEffect, useState } from 'react';
import { fetchExpenses } from '../util/http';
import { setExpenses } from '../store/redux/expenses';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const RECENT_LIMIT = 7;

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const allExpenses = useSelector((state) => state.allExpenses.allExpenses);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      dispatch(setExpenses(expenses));
    }

    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
