import { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ToastAndroid,
  Modal,
  Button,
} from "react-native";
import DialogButton from "./DialogButton";

function Expense({ expense }) {
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

      {expense.description ?? (
        <Text style={styles.txtExpenseInfo}>
          <Text style={styles.txtExpenseInfoBold}>Description: </Text>
          {expense.description}
        </Text>
      )}
    </View>
  );
}

export default function ConfirmationDialog({ isDialogOpen, expense, onCancel, onSave }) {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSave();
    }, 2000);
  };

  return (
    <Modal animationType="slide" visible={isDialogOpen} transparent={true}>
      {/* The outer view, that covers the whole screen */}
      <View style={styles.vOverlay}>
        {/* The inner view, that has the content of the dialog. */}
        <View style={styles.vDialog}>
          <Text style={styles.txtConfirmation}>
            Are you sure you want to save the following expense?
          </Text>

          <Expense expense={expense}></Expense>

          <View style={styles.vButtons}>
            <DialogButton
              label="Cancel"
              variant="cancel"
              onPress={onCancel}
              disabled={loading}
            />
            <DialogButton
              label="Save"
              variant="save"
              onPress={handleSave}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  vOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  vDialog: {
    width: "80%",
    backgroundColor: "#fdf7f0",
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtConfirmation: {
    fontSize: 16,
    fontFamily: "Poppins_300Light",
    marginBottom: 15,
  },
  vExpense: {
    marginLeft: 10,
  },
  txtExpenseInfo: {
    fontFamily: "Poppins_300Light",
  },
  txtExpenseInfoBold: {
    fontFamily: "Poppins_500Medium",
  },
  vButtons: {
    marginTop: 40,
    flexDirection: "row",
    gap: 15,
  },
});
