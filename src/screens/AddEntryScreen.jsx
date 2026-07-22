import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";

import Header from "../components/Header";
import InputField from "../components/InputField";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ExpenseSummary from "../components/ExpenseSummary";
import useExpenses from "../hooks/useExpenses";

const MEDIUMS = ["Manual", "Scan"];
const CATEGORIES = [
  "food",
  "transport",
  "health",
  "cloth",
  "education",
  "utilities",
  "rent",
  "groceries",
  "mobile/internet",
  "grooming",
  "gifts",
  "donation",
  "other",
];

function MediumToggle({ options, selectedIndex, onSelect }) {
  return (
    <View style={styles.vMediumToggle}>
      {options.map((option, index) => (
        <Pressable
          key={index}
          onPress={() => onSelect(index)}
          style={[
            styles.mediumOption,
            selectedIndex === index
              ? styles.mediumOptionActive
              : styles.mediumOptionInactive,
          ]}
        >
          <Text
            style={[
              styles.mediumOptionText,
              selectedIndex === index
                ? styles.mediumOptionTextActive
                : styles.mediumOptionTextInactive,
            ]}
          >
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function AmountInput({ amount, setAmount }) {
  return (
    <View style={styles.vFullWidth}>
      <Text style={styles.tvCurrency}>PKR</Text>
      <TextInput
        style={styles.tiAmount}
        value={amount}
        placeholder="0"
        placeholderTextColor={"#000"}
        cursorColor={"#000"}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
    </View>
  );
}

function CategoryPicker({ categories, selectedCategory, onSelect }) {
  return (
    <View style={styles.vFullWidth}>
      <Text style={styles.tvSectionLabel}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.vCategoryList}
        >
          {categories.map((category, index) => (
            <Pressable
              key={index}
              onPress={() => onSelect(index)}
              style={[
                styles.categoryPill,
                selectedCategory === category
                  ? styles.categoryActive
                  : styles.categoryInactive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category
                    ? styles.categoryTextActive
                    : styles.categoryTextInactive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
    </View>
  );
}

function ManualEntryForm({
  title,
  setTitle,
  description,
  setDescription,
  onSave,
}) {
  return (
    <View style={styles.vFullWidth}>
      <Text style={styles.tvFieldLabel}>Title</Text>
      <InputField
        value={title}
        setValue={setTitle}
        placeholder="Enter the title of your expense"
        multiline
      />

      <Text style={styles.tvFieldLabel}>Description</Text>
      <InputField
        value={description}
        setValue={setDescription}
        placeholder="Enter the description of your expense"
        multiline
      />

      <Pressable
        style={({ pressed }) => [
          styles.btnSave,
          pressed && styles.btnSavePressed,
        ]}
        onPress={onSave}
      >
        <Text style={styles.tvSaveLabel}>Save Expense</Text>
      </Pressable>
    </View>
  );
}

function validateExpense(title, amount) {
  if (!title) {
    ToastAndroid.show(
      "You must enter the title to save an expense.",
      ToastAndroid.SHORT,
    );
  }
  if (!amount) {
    ToastAndroid.show(
      "You must enter the amount to save an expense.",
      ToastAndroid.SHORT,
    );
  }
  return Boolean(title) && Boolean(amount);
}

const AddEntryScreen = () => {
  const [selectedMediumIndex, setSelectedMediumIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [expense, setExpense] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const { addExpense } = useExpenses();

  const isManualEntry = MEDIUMS[selectedMediumIndex] === "Manual";
  const selectedCategory = CATEGORIES[selectedCategoryIndex];

  const saveExpense = async (expense) => {
    await addExpense(expense);
    ToastAndroid.show("Expense Inserted", ToastAndroid.SHORT);
  };

  const resetForm = () => {
    setAmount(0);
    setTitle("");
    setDescription("");
  };

  const handleConfirmSave = () => {
    saveExpense(expense);
    resetForm();
    setIsDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!validateExpense(title, amount)) return;

    setExpense({ title, category: selectedCategory, amount, description });
    setIsDialogOpen(true);
  };

  return (
    <KeyboardAwareLayout
      header={<Header headerTitle="Add New Entry" />}
      contentContainerStyle={styles.vContentContainer}
    >
      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Are you sure you want to save the following expense?"
        body={<ExpenseSummary expense={expense} />}
        confirmLabel="Save"
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmSave}
      />

      <MediumToggle
        options={MEDIUMS}
        selectedIndex={selectedMediumIndex}
        onSelect={setSelectedMediumIndex}
      />

      {isManualEntry && <AmountInput amount={amount} setAmount={setAmount} />}

      <CategoryPicker
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategoryIndex}
      />

      {isManualEntry ? (
        <ManualEntryForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onSave={handleSubmit}
        />
      ) : (
        <Text style={styles.tvComingSoon}>Camera feature Coming soon</Text>
      )}
    </KeyboardAwareLayout>
  );
};

const styles = StyleSheet.create({
  vContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  vFullWidth: {
    width: "100%",
  },

  // Medium toggle (Manual / Scan)
  vMediumToggle: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    gap: 30,
  },
  mediumOption: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
  },
  mediumOptionActive: {
    backgroundColor: "#ff9999",
    shadowColor: "#fb4a4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  mediumOptionInactive: {
    backgroundColor: "#fff",
    shadowColor: "#d4d4d4",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mediumOptionText: {
    fontFamily: "Poppins_600SemiBold",
  },
  mediumOptionTextActive: {
    color: "#fff",
  },
  mediumOptionTextInactive: {
    color: "#595959",
  },

  // Amount input
  tvCurrency: {
    marginTop: 30,
    color: "#c0404a",
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    textAlign: "center",
  },
  tiAmount: {
    borderRadius: 10,
    width: "100%",
    fontSize: 50,
    fontFamily: "Poppins_600SemiBold",
    color: "#000",
    textAlign: "center",
    paddingVertical: 0,
  },

  // Shared section label
  tvSectionLabel: {
    marginTop: 30,
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },

  // Category picker
  vCategoryList: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryActive: {
    backgroundColor: "#ff9999",
    shadowColor: "#ff9999",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryInactive: {
    backgroundColor: "#fff",
    shadowColor: "#d4d4d4",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
  categoryTextActive: {
    color: "#fff",
  },
  categoryTextInactive: {
    color: "#595959",
  },

  // Manual entry form
  tvFieldLabel: {
    marginTop: 20,
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  btnSave: {
    marginTop: 20,
    backgroundColor: "#ff9999",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnSavePressed: {
    backgroundColor: "#ff7e7e",
  },
  tvSaveLabel: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
  },
  tvComingSoon: {
    marginTop: 30,
  },
});

export default AddEntryScreen;
