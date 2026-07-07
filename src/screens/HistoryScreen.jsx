import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SingleExpenseItem from "../components/SingleExpenseItem";

import useExpenses from "../hooks/useExpenses";

const HistoryScreen = () => {
  const { expenses, isLoading, addExpense } = useExpenses();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header headerTitle={"History"} />
      {/* <Text>{expenses}</Text> */}
      <View style={{ width: "100%", flex: 1, backgroundColor: "#fdf7f0", paddingHorizontal: 20 }}>
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
    backgroundColor: "#ffffff",
  },
});

export default HistoryScreen;
