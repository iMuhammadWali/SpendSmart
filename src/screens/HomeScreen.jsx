import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeSreen = () =>{
    return (
        <SafeAreaView style={styles.container}>
            <Text>I am Wali and this is the home screen</Text>
        </SafeAreaView>    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default HomeSreen;