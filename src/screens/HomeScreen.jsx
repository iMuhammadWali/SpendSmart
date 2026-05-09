import { use, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: After completing the design, Ask AI to put all the styling in the styles object.

// TODO: Complete
const HomeSreen = () =>{
    const [month, setMonth] = useState("");
    const [totalSpent, setTotalSpent] = useState("18,450");
    const [remaining, setRemaining] = useState("6,550");

    useEffect(()=>{
        // Set the month here.
        const date = new Date();
        const monthName = date.toLocaleString('default', { month: 'short' });
        setMonth(monthName);

    }, []);


    const recentTransactions = [
        {
            id: "1",
            title: "Bike petrol",
            category: "travel",
            description: "Put fuel in Wali's bike to go to Hussain Chowk and stuff",
            date: Date.now()
        },
        {
            id: "2",
            title: "Pathooray",
            category: "food",
            description: "We were hungry so ate Pathooray and jalebi from Sadar",
            date: Date.now()
        },
        {
            id: "3",
            title: "Bought Chappal",
            category: "clothing",
            description: "Bought Wali's chappal from Bata",
            date: Date.now()
        },
        {
            id: "4",
            title: "Bought Medicine",
            category: "health",
            description: "Wali took 1000 from me and bougth medicine worth 600 Rs",
            date: Date.now()
        }
    ]

    const TransactionItem = ({item, index}) =>{
        // This should be a reusable component
        return (
            <View style={{width: "100%", height: 50, backgroundColor: "#ffe7cb", marginBottom: 10}}>
                <Text>{item.title}</Text>
            </View>
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            {/* How to give weights in react native? */}

            {/* Spent and remaining card */}
            <View style={{width: "100%", height: 76, flexDirection: "row", gap: 10 }}>
                <View style={{height: "100%", flex: 1, backgroundColor: "", justifyContent: "center", alignItems: "center"}}> 
                    <Text style={{color: "#d75d69", fontFamily: ""}}>Total Spent - {month}</Text>
                    <Text style={{color: "#000", fontFamily: "Poppins_700Bold", fontSize: 25}}>PKR {totalSpent}</Text>
                </View>
                
                <View style={{height: "100%", flex: 1, backgroundColor: "", justifyContent: "center", alignItems: "center"}}> 
                     <Text style={{color: "#d75d69", fontFamily: ""}}>Remaining</Text>
                    <Text style={{color: "#05ae40", fontFamily: "Poppins_700Bold", fontSize: 22}}>PKR {remaining}</Text>
                </View>
            </View>

            <View style={{width: "100%", flexDirection: "row", height: 300, gap: 10}}>
                {/* Weekly Activity Card */}
                <View style={{height:"100%", flex: 1, backgroundColor: "#f7e3e5", borderRadius: 20}}>

                </View>

                {/* Popular Categories spending Card */}
                <View style={{height: "100%", flex: 1, flexDirection: "column", gap: 10}}>
                    <View style={{width: "100%", flex: 1, backgroundColor: "#e6e3ea", borderRadius: 20}}>

                    </View>
                    <View style={{width: "100%", flex: 1, backgroundColor: "#e7f1f0", borderRadius: 20}}>

                    </View>
                </View>
            </View>

            {/* Today's transactions card */}
            <View style={{width: "100%"}}>
                <View style={{width: "100%", flexDirection: "row"}}>
                    <Text style={{flex: 1, color: "#000", fontFamily: "Poppins_600SemiBold", fontSize: 16}}>Recent Transactions</Text>
                    <Text style={{flex: 1, color: "#d75d69", fontFamily: "Poppins_500Medium", fontSize: 16}}>See all</Text>
                </View>
                <FlatList
                    data={recentTransactions}
                    renderItem={TransactionItem}
                    keyExtractor={(item)=>{return item.id}}>
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
        gap: 20
    }
});


export default HomeSreen;