import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddEntryScreen = () => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const options = ["Manual", "Scan"];
  const categories = ["Food", "Transport", "Health", "Cloth"];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          height: 50,
          gap: 30,
          paddingHorizontal: 30,
          marginTop: 20,
        }}
      >
        {options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setSelectedOptionIndex(index);
            }}
            style={
              selectedOptionIndex === index
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
                selectedOptionIndex === index
                  ? { color: "#fff", fontFamily: "Poppins_600SemiBold" }
                  : { color: "#595959", fontFamily: "Poppins_600SemiBold" }
              }
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          gap: 10,
          paddingHorizontal: 30,
          marginTop: 30,
        }}
      >
        {categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={
              selectedCategory === category
                ? styles.categoryActive
                : styles.categoryInactive
            }
          >
            <Text
              style={
                selectedCategory === category
                  ? styles.categoryTextActive
                  : styles.categoryTextInactive
              }
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
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
