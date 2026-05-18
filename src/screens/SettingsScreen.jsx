import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState } from "react";

const SettingsScreen = () =>{

    // I can add icons here as well but I wont do it myself. I will let GPT do it.
    const options = ["Sync Online", "Logout"]

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header headerTitle="Settings"/>
            <View style={styles.contentContainer}>
                <Text>This is the settings screen.</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffbf7",
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#fdf7f0",
        paddingHorizontal: 20,
    }
});

export default SettingsScreen;