import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getAllExpenses } from "../database/db";
import SingleExpenseItem from "../components/SingleExpenseItem";


const HistoryScreen = () =>{
    const [expenses, setExpenses] = useState([]);
    useEffect(()=>{
        const load = async () => {
            try {

                const result = await getAllExpenses();
                setExpenses(result);
            }
            catch (e){
                console.log(e);
            }

        }
        load();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header headerTitle={"History"}/>
            {/* <Text>{expenses}</Text> */}
            <View style={{width: "100%", flex: 1}}>
                <FlatList
                    data={expenses}
                    renderItem={SingleExpenseItem}
                    keyExtractor={(item)=>{return item.id.toString()}}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 10, marginTop: 5}}>
                </FlatList>
            </View>
        </SafeAreaView>    
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdf7f0",
        paddingHorizontal: 20,
    }
});

export default HistoryScreen;