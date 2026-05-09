import { use, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: After completing the design, Ask AI to put all the styling in the styles object.

import {Ionicons} from "@expo/vector-icons"

const HomeSreen = () =>{
    const [month, setMonth] = useState("");
    const [totalSpent, setTotalSpent] = useState("18,450");
    const [remaining, setRemaining] = useState("6,550");

    useEffect(()=>{
        // Set the month here.
        const date = new Date();
        const monthName = date.toLocaleString('default', { month: 'short' });
        setMonth(monthName);

        const total = recentTransactions.reduce((sum, item) => sum + item.amount, 0);
        setTotalSpent(total);
    }, []);


    const recentTransactions = [
        {
            id: "1",
            title: "Bike petrol",
            category: "travel",
            description: "Put fuel in Wali's bike to go to Hussain Chowk and stuff",
            amount: 230,
            date: Date.now()
        },
        {
            id: "2",
            title: "Pathooray",
            category: "food",
            description: "We were hungry so ate Pathooray and jalebi from Sadar",
            amount: 270,
            date: Date.now()
        },
        {
            id: "3",
            title: "Bought Fry Pan",
            category: "other",
            description: "Bought Wali's chappal from Bata",
            amount: 3200,
            date: Date.now()
        },
        {
            id: "4",
            title: "Bought Medicine",
            category: "health",
            description: "Wali took 1000 from me and bougth medicine worth 600 Rs",
            amount: 600,
            date: Date.now()
        }
    ]


    const categoryConfig = {
        food:     { icon: "fast-food-outline",     bg: "#FCEEF1", color: "#C95668"},
        travel:   { icon: "car-outline",           bg: "#EFF6FF", color: "#3B82F6" },
        clothing: { icon: "shirt-outline",         bg: "#F5F3FF", color: "#8B5CF6" },
        health:   { icon: "medkit-outline",        bg: "#EAF6F1", color: "#2A9D6E" },
        other:    { icon: "ellipsis-horizontal",   bg: "#F5F5F0", color: "#9B9488" },
    };

    const TransactionItem = ({ item }) => {
        const config = categoryConfig[item.category] || categoryConfig.other;

        return (
            <View style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "#FFFFFF",
                // backgroundColor: "#F7F1EA",
                // backgroundColor: "#FDF0EE",
                backgroundColor: config.bg,
                borderRadius: 16,
                paddingLeft: 5,
                paddingRight: 15,
                paddingVertical: 5,
                marginVertical: 5,
                gap: 12,
                elevation: 2,
                shadowColor: "#C4A882",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.10,
                shadowRadius: 8,            
            }}>

                {/* Icon Box */}
                <View style={{
                    width: 55,
                    height: 55,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Ionicons name={config.icon} size={20} color={config.color} />
                </View>

                {/* Title + Category Pill */}
                <View style={{ flex: 1, gap: 5 }}>
                    <Text style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 16,
                        color: "#000",
                        letterSpacing: -0.2,
                    }} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={{
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 12,
                        color: config.color,
                        textTransform: "capitalize",
                    }}>
                        {item.category}
                    </Text>

                </View>

                {/* Amount + Time */}
                <View style={{gap: 3 }}>
                    <Text style={{
                        fontFamily: "Poppins_700Bold",
                        fontSize: 14,
                        color: "#d75d69",
                        letterSpacing: -0.3,
                    }}>
                        -Rs {item.amount ?? "0"}
                    </Text>
                    <Text style={{
                        fontFamily: "Poppins_500Medium",
                        fontSize: 10,
                        color: "#C4BDB7",
                    }}>
                        {new Date(item.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                </View>

            </View>
        );
    };

    return (

        <SafeAreaView style={styles.container} edges={["top"]}>

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
                <View style={{height:"100%", flex: 1, backgroundColor: "#f7e3e5", borderRadius: 20, elevation: 3}}>

                </View>

                {/* Popular Categories spending Card */}
                <View style={{height: "100%", flex: 1, flexDirection: "column", gap: 10}}>
                    <View style={{width: "100%", flex: 1, backgroundColor: "#e6e3ea", borderRadius: 20, elevation: 3}}>

                    </View>
                    <View style={{width: "100%", flex: 1, backgroundColor: "#e7f1f0", borderRadius: 20, elevation: 3}}>

                    </View>
                </View>
            </View>

            {/* Today's transactions card */}
            <View style={{width: "100%", flex: 1}}>
                <View style={{width: "100%", flexDirection: "row"}}>
                    <Text style={{flex: 1, color: "#000", fontFamily: "Poppins_600SemiBold", fontSize: 16}}>Recent Transactions</Text>
                    <Text style={{color: "#d75d69", fontFamily: "Poppins_500Medium", fontSize: 16}}>See all</Text>
                </View>
                <FlatList
                    data={recentTransactions}
                    renderItem={TransactionItem}
                    keyExtractor={(item)=>{return item.id}}
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
        gap: 20
    }
});


export default HomeSreen;