import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Obhai I am super tired. Why is this so hard.
const AddEntryScreen = () =>{
    return (
        <SafeAreaView style={styles.container}>
            <Text>I am Wali and this is the Add entry screen</Text>
        </SafeAreaView>    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdf7f0"
    }
});

export default AddEntryScreen;