import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import useAppFonts from "./src/hooks/useAppFonts";

import { Ionicons } from "@expo/vector-icons";

import { LoginScreen } from "./src/screens/LoginScreen";

import OnboardingScreen from "./src/screens/OnboardingScreen";
import HomeSreen from "./src/screens/HomeScreen";
import AddEntryScreen from "./src/screens/AddEntryScreen";
import { useEffect, useState } from "react";
import { loadDummyExpenses } from "./src/database/expenses";
import AIScreen from "./src/screens/AIScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { ExpenseProvider } from "./src/context/ExpenseContext";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { AuthProvider } from "./src/context/AuthContext";
import useAuth from "./src/hooks/useAuth";

// For now I will code the navigation in the app.js and will export it later to a different file or maybe create a different folder for it later.
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f8a4a4",
        tabBarInactiveTintColor: "#8e8e8e",
        headerShown: false,
        tabBarStyle: {
          paddingTop: 5,
          elevation: 10,
          backgroundColor: "#fffbf7",
          borderTopWidth: 1,
          borderTopColor: "#EDE5DA",
        },
      }}
    >
      {/* Have to see how to add a back button here. */}
      <Tab.Screen
        name="Home"
        component={HomeSreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddEntry"
        component={AddEntryScreen}
        options={{
          title: "Add New Entry",
          tabBarLabel: "Add Entry",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AIScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
};
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await loadDummyExpenses();
      setIsLoading(false);
    };
    load();
  }, []);

  const fontsLoaded = useAppFonts();
  if (!fontsLoaded || isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }
  return (
    <ExpenseProvider>
      <NavigationContainer>
        {isLoggedIn ? <RootStack /> : <AuthStack />}
      </NavigationContainer>
    </ExpenseProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
