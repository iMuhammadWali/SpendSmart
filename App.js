import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useAppFonts from './src/hooks/useAppFonts';

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeSreen from './src/screens/HomeScreen';
import AddEntryScreen from './src/screens/AddEntryScreen';

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
          borderTopWidth: 0,
          elevation: 10, 
        }
      }}>
      <Tab.Screen name='Home' component={HomeSreen} />    
      <Tab.Screen name='AddEntry' component={AddEntryScreen} />
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
