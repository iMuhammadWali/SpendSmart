import { StyleSheet, Text, View } from "react-native";

export default function ExpenseSummary({ expense }) {
  return (
    <View style={styles.vExpense}>
      <Text style={styles.txtExpenseInfo}>
        <Text style={styles.txtExpenseInfoBold}>Title: </Text>
        {expense.title ? expense.title : "No title entered!"}
      </Text>

      {/* In case someone asks why I have not added any check for category, it is because there is no way for category to be empty. */}
      <Text style={styles.txtExpenseInfo}>
        <Text style={styles.txtExpenseInfoBold}>Category: </Text>
        {expense.category}
      </Text>

      <Text style={styles.txtExpenseInfo}>
        <Text style={styles.txtExpenseInfoBold}>Amount: </Text>
        {expense.amount ? expense.amount : "No amount entered!"}
      </Text>

      {expense.description && (
        <Text style={styles.txtExpenseInfo}>
          <Text style={styles.txtExpenseInfoBold}>Description: </Text>
          {expense.description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  vExpense: {
    marginLeft: 10,
  },
  txtExpenseInfo: {
    fontFamily: "Poppins_300Light",
  },
  txtExpenseInfoBold: {
    fontFamily: "Poppins_500Medium",
  },
});
