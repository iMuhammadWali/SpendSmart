import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useAppFonts from './src/hooks/useAppFonts';

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeSreen from './src/screens/HomeScreen';

// For now I will code the navigation in the app.js and will export it later to a different file or maybe create a different folder for it later.
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen}></Stack.Screen>
      <Stack.Screen name="Home" component={HomeSreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default function App() {
  const fontsLoaded = useAppFonts();

  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}
