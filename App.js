import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useAppFonts from './src/hooks/useAppFonts';

import {Ionicons} from "@expo/vector-icons"

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeSreen from './src/screens/HomeScreen';
import AddEntryScreen from './src/screens/AddEntryScreen';
import { useEffect, useState } from 'react';
import { initDatabase, loadDummyExpenses } from './src/database/db';

// For now I will code the navigation in the app.js and will export it later to a different file or maybe create a different folder for it later.
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#f8a4a4', 
        tabBarInactiveTintColor: '#8e8e8e',
        tabBarStyle:{
          paddingTop: 5,
          elevation: 10, 
          backgroundColor: '#fffbf7',
          borderTopWidth: 1,
          borderTopColor: '#EDE5DA',
        },
      }}>
      <Tab.Screen 
        name='Home' 
        component={HomeSreen} 
        options={{
          tabBarIcon: ({color, size}) => (<Ionicons name="home-outline" size={size} color={color} />)
        }}/>
        <Tab.Screen 
        name='History' 
        component={HomeSreen} 
        options={{
          tabBarIcon: ({color, size}) => (<Ionicons name="time-outline" size={size} color={color} />)
        }}/>   
      <Tab.Screen 
        name='AddEntry' 
        component={AddEntryScreen} 
          options={{
          tabBarIcon: ({color, size}) => (<Ionicons name="add-outline" size={size} color={color} />)
        }}/>      
        <Tab.Screen 
        name='Analytics' 
        component={HomeSreen} 
        options={{
          tabBarIcon: ({color, size}) => (<Ionicons name="bar-chart-outline" size={size} color={color} />)
        }}/>        
        <Tab.Screen 
        name='Settings' 
        component={HomeSreen} 
        options={{
          tabBarIcon: ({color, size}) => (<Ionicons name="settings-outline" size={size} color={color} />)
        }}/>   
    </Tab.Navigator>
  );
}

const RootStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen}></Stack.Screen>
      <Stack.Screen name="HomeTabs" component={HomeTabs}></Stack.Screen>
    </Stack.Navigator>
  )
}
export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const load = async () => {
      setIsLoading(true);
      await initDatabase();
      await loadDummyExpenses();
      setIsLoading(false);
    }
    load();
  }, []);

  const fontsLoaded = useAppFonts();
  if (!fontsLoaded) 
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}
