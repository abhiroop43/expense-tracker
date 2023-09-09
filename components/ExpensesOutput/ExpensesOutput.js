import { StyleSheet, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';
import { useSelector } from 'react-redux';

function ExpensesOutput({ expenses, expensesPeriod }) {
  const allExpenses = useSelector((state) => state.allExpenses.allExpenses);
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={allExpenses} periodName={expensesPeriod} />
      <ExpensesList expenses={allExpenses} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
