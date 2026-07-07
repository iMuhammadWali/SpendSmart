import { useState } from "react";
import { View, Image, StyleSheet, Text, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";

const OnboardingScreen = () => {
  const navigator = useNavigation();

  const handleButtonPress = () => {
    ToastAndroid.show("Button Pressed", ToastAndroid.SHORT);
    navigator.navigate("HomeTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
        ></Image>

        <Text style={styles.tagLine}>
          The World Comes for{" "}
          <Text style={styles.financialText}>Financial</Text> Advice
        </Text>

        <PrimaryButton label="Get Started" onPress={handleButtonPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf7f0",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 300,
    width: 350,
  },
  tagLine: {
    marginTop: 20,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    textAlign: "center",
  },
  financialText: {
    color: "#ff9999",
  },
});

export default OnboardingScreen;
