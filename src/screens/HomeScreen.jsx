import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: After completing the design, Ask AI to put all the styling in the styles object.

import { Ionicons } from "@expo/vector-icons";
import SingleExpenseItem from "../components/SingleExpenseItem";

import PinkBarChart from "../components/PinkBarChart";
import useExpenses from "../hooks/useExpenses";

const HomeSreen = () => {
  const [month, setMonth] = useState("");
  const [totalSpent, setTotalSpent] = useState(0);
  const [remaining, setRemaining] = useState("6,550");

  const data = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 90 },
  ];

  // TODO: Fetch previous 7 days transaction totals and then use for the bar chart.
  const { expenses, isLoading, addExpense } = useExpenses();

  useEffect(() => {
    const date = new Date();
    const monthName = date.toLocaleString("default", { month: "short" });
    setMonth(monthName);

    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    setTotalSpent(total);
  }, [expenses]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Spent and remaining card */}
      <View
        style={{ width: "100%", height: 76, flexDirection: "row", gap: 10 }}
      >
        <View
          style={{
            height: "100%",
            flex: 1,
            backgroundColor: "",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#d75d69", fontFamily: "" }}>
            Total Spent - {month}
          </Text>
          <Text
            style={{
              color: "#000",
              fontFamily: "Poppins_700Bold",
              fontSize: 25,
            }}
          >
            PKR {totalSpent}
          </Text>
        </View>

        <View
          style={{
            height: "100%",
            flex: 1,
            backgroundColor: "",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#d75d69", fontFamily: "" }}>Remaining</Text>
          <Text
            style={{
              color: "#05ae40",
              fontFamily: "Poppins_700Bold",
              fontSize: 22,
            }}
          >
            PKR {remaining}
          </Text>
        </View>
      </View>

      <View
        style={{ width: "100%", flexDirection: "row", height: 300, gap: 10 }}
      >
        {/* Weekly Activity Card */}
        <View
          style={{
            flex: 1,
            backgroundColor: "#f7e3e5",
            borderRadius: 20,
            elevation: 3,
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          {/* Fetch the last week data and  */}
          <PinkBarChart data={data} />
          <View style={{ flex: 1 }}></View>
          <Text
            style={{
              fontSize: 13,
              color: "#7a2a35",
              fontFamily: "Poppins_400Regular",
              alignSelf: "flex-end",
            }}
          >
            Activity of Current Week
          </Text>
        </View>

        {/* Popular Categories spending Card */}
        <View
          style={{ height: "100%", flex: 1, flexDirection: "column", gap: 10 }}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "#e6e3ea",
              borderRadius: 20,
              elevation: 3,
            }}
          ></View>
          <View
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "#e7f1f0",
              borderRadius: 20,
              elevation: 3,
            }}
          ></View>
        </View>
      </View>

      {/* Recent Expenses */}
      <View style={{ width: "100%", flex: 1 }}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Text
            style={{
              flex: 1,
              color: "#000",
              fontFamily: "Poppins_600SemiBold",
              fontSize: 16,
            }}
          >
            Recent Expenses
          </Text>
          <Text
            style={{
              color: "#d75d69",
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
            }}
          >
            See all
          </Text>
        </View>
        <FlatList
          data={expenses}
          renderItem={SingleExpenseItem}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10, marginTop: 5 }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf7f0",
    paddingHorizontal: 20,
    gap: 20,
  },
});

export default HomeSreen;
