import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Obhai I am super tired. Why is this so hard.
const HistoryScreen = () =>{
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fdf7f0"}} edges={["top"]}>
            <Text>I am Wali and this is the history Screen</Text>

        </SafeAreaView>    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdf7f0"
    }
});

export default HistoryScreen;