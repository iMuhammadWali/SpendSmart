import { useContext, useRef, useState } from "react";
import {
  Pressable,
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
  return (
    <Modal animationType="slide" visible={isDialogOpen} transparent={true}>
      {/* The outer view, that covers the whole screen */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* The inner view, that has the content of the dialog. */}
        <View
          style={{
            width: "80%",
            backgroundColor: "#fdf7f0",
            padding: 30,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={styles.txtConfirmation}>
            Are you sure you want to save the following expense?
          </Text>

          <Expense expense={expense}></Expense>

          <View style={styles.vButtons}>
            <Pressable onPress={onCancel} style={styles.btnCancel}>
              <Text>Cancel</Text>
            </Pressable>

            <Pressable onPress={onSave} style={styles.btnSave}>
              <Text style={styles.txtSave}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  btnCancel: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  txtCancel: {
    fontSize: 15,
    fontWeight: "400",
  },
  btnSave: {
    flex: 1,
    backgroundColor: "#ff9999",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  txtSave: {
    // fontWeight: "Bold",
    fontSize: 15,
    fontWeight: "400",
  },
});
