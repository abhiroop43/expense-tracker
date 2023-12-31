import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  removeExpense,
  updateExpense,
} from "../store/redux/expenses";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  storeExpense,
  updateExpenseService,
  deleteExpenseService,
} from "../util/expense";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState();

  const allExpenses = useSelector((state) => state.allExpenses.allExpenses);
  const dispatch = useDispatch();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = allExpenses.find(
    (expense) => expense.id === editedExpenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    try {
      dispatch(removeExpense({ id: editedExpenseId }));
      setIsSubmitting(true);
      await deleteExpenseService(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Unable to delete the expense. Please try again later.");
    }
    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (!editedExpenseId) {
      try {
        setIsSubmitting(true);
        const id = await storeExpense(expenseData);
        dispatch(addExpense({ ...expenseData, id: id }));
        navigation.goBack();
      } catch (error) {
        setError("Unable to update the expense. Please try again later.");
      }
      setIsSubmitting(false);
    } else {
      const currentExpense = allExpenses.find(
        (expense) => expense.id === editedExpenseId,
      );

      if (!currentExpense) {
        console.log(
          "ERR-01: Could not find the expense with id: ",
          editedExpenseId,
        );
        return;
      }

      try {
        dispatch(
          updateExpense({
            id: editedExpenseId,
            ...expenseData,
          }),
        );
        setIsSubmitting(true);
        await updateExpenseService(editedExpenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError("Unable to add the expense. Please try again later.");
      }
      setIsSubmitting(false);
    }
  }

  // function errorHandler() {
  //   setError(null);
  // }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
