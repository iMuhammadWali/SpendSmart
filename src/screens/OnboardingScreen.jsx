import { useState } from "react";
import { View, Image, StyleSheet, Text, Pressable, ToastAndroid } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () =>{
    const navigator = useNavigation();

    const handleButtonPress = () =>{
        ToastAndroid.show("Button Pressed", ToastAndroid.SHORT);
        navigator.replace("Home");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Image
                    source={require("../../assets/logo.png")} 
                    style={styles.logo}></Image>
            
                <Text style={styles.tagLine}>The World Comes for <Text style={styles.financialText}>Financial</Text> Advice</Text>

                <Pressable 
                    style={({ pressed }) => {
                        return [
                        styles.getStartedButton,
                        pressed && styles.pressedGetStartedButton] // Automatically applies when touched
                    }}
                    onPress={handleButtonPress}>
                    <Text style={styles.getStartedButtonText}>Get Started</Text></Pressable>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdf7f0",
        padding: 20,
    },
    contentContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo:{
        height: 300,
        width: 350
    },
    tagLine:{
        marginTop: 20,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 28,
        textAlign: "center"
    },
    financialText: {
        color: "#ff9999"
    },
    getStartedButton:{
        marginTop: 50,
        backgroundColor: "#ff9999",
        width: 300,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    pressedGetStartedButton:{
        backgroundColor: "#ff7e7e",
    },
    getStartedButtonText:{
        color: "#fff",
        fontFamily: "Poppins_600SemiBold"    
    }
});

export default OnboardingScreen;