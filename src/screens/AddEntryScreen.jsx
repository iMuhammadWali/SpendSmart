// The first task of today is to make a confirmation dialog.
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
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../components/Header";
import useExpenses from "../hooks/useExpenses";

import ConfirmationDialog from "../components/ConfirmationDialog";

const AddEntryScreen = () => {
  // Global immutable necesary information.
  const options = ["Manual", "Scan"];
  const categories = ["food", "fransport", "health", "cloth", "other"];

  const [selectedMediumIndex, setSelectedMediumIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [expense, setExpense] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const { addExpense } = useExpenses();

  const saveExpense = async (expense) => {
    // TODO: Need to add a check if all entries are filled or not.
    return;

    await addExpense(expense);
    ToastAndroid.show("Expense Inserted", ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fdf7f0", paddingHorizontal: 20 }}
      edges={["top"]}
    >
      <ConfirmationDialog
        isDialogOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        expense={expense}
      />

      <Header headerTitle="Add New Entry" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              height: 50,
              gap: 30,
              marginTop: 20,
            }}
          >
            {options.map((option, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedMediumIndex(index);
                }}
                style={
                  selectedMediumIndex === index
                    ? {
                        flex: 1,
                        backgroundColor: "#ff9999",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#fb4a4a",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 4,
                      }
                    : {
                        flex: 1,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        shadowColor: "#d4d4d4",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                        elevation: 2,
                      }
                }
              >
                <Text
                  style={
                    selectedMediumIndex === index
                      ? { color: "#fff", fontFamily: "Poppins_600SemiBold" }
                      : { color: "#595959", fontFamily: "Poppins_600SemiBold" }
                  }
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>

          {options[selectedMediumIndex] == "Manual" && (
            <View>
              <Text
                style={{
                  marginTop: 30,
                  color: "#c0404a",
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                PKR
              </Text>

              <TextInput
                style={{
                  borderRadius: 10,
                  width: "100%",
                  fontSize: 50,
                  fontFamily: "Poppins_600SemiBold",
                  color: "#000",
                  textAlign: "center",
                  paddingVertical: 0,
                }}
                value={amount}
                placeholder="0"
                placeholderTextColor={"#000"}
                cursorColor={"#000"}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
          )}

          {/* Selecting Categories */}
          <Text
            style={{
              marginTop: 30,
              color: "#000",
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
            }}
          >
            Category
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: 10,
              marginTop: 10,
            }}
          >
            {categories.map((category, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedCategoryIndex(index)}
                style={
                  categories[selectedCategoryIndex] === category
                    ? styles.categoryActive
                    : styles.categoryInactive
                }
              >
                <Text
                  style={
                    categories[selectedCategoryIndex] === category
                      ? styles.categoryTextActive
                      : styles.categoryTextInactive
                  }
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>

          {options[selectedMediumIndex] == "Manual" ? (
            <View>
              <Text
                style={{
                  marginTop: 20,
                  color: "#000",
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                }}
              >
                Title
              </Text>

              <TextInput
                multiline={true}
                style={{
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  height: 50,
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "#f7e3e5",
                  elevation: 1,
                  borderWidth: 0,
                  color: "#c0404a",
                }}
                value={title}
                placeholder="Enter the title of your expense"
                placeholderTextColor={"#e8909a"}
                cursorColor={"#ff6b7a"}
                onChangeText={setTitle}
              />

              <Text
                style={{
                  marginTop: 20,
                  color: "#000",
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 16,
                }}
              >
                Description
              </Text>
              <TextInput
                multiline={true}
                style={{
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  // flex: 1,
                  height: 50,
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "#f7e3e5",
                  elevation: 1,
                  borderWidth: 0,
                  color: "#c0404a",
                }}
                value={description}
                placeholder="Enter the description of your expense"
                placeholderTextColor={"#e8909a"}
                cursorColor={"#ff6b7a"}
                onChangeText={setDescription}
              />
              <Pressable
                style={({ pressed }) => {
                  return [
                    {
                      marginTop: 50,
                      backgroundColor: "#ff9999",
                      width: "100%",
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                    },
                    pressed && { backgroundColor: "#ff7e7e" },
                  ];
                }}
                onPress={() => {
                  const category = categories[selectedCategoryIndex];
                  setExpense({title, description, category});
                  setIsDialogOpen(true);
                  // saveExpense({ title, category: selectedCategory, description, amount });
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Save Expense
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text style={{ marginTop: 30 }}>Camera feature Coming soon</Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf7f0",
  },
  categoryActive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#ff9999",
    shadowColor: "#ff9999",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryInactive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#d4d4d4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 0,
  },
  categoryTextActive: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
  categoryTextInactive: {
    color: "#595959",
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
});

export default AddEntryScreen;
