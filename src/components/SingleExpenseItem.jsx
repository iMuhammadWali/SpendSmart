import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const categoryConfig = {
    food:     { icon: "fast-food-outline",     bg: "#FCEEF1", color: "#C95668"},
    travel:   { icon: "car-outline",           bg: "#EFF6FF", color: "#3B82F6" },
    clothing: { icon: "shirt-outline",         bg: "#F5F3FF", color: "#8B5CF6" },
    health:   { icon: "medkit-outline",        bg: "#EAF6F1", color: "#2A9D6E" },
    other:    { icon: "ellipsis-horizontal",   bg: "#F5F5F0", color: "#9B9488" },
};

const SingleExpenseItem = ({ item }) => {
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

            {/* Icon */}
            <View style={{
                width: 55,
                height: 55,
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Ionicons name={config.icon} size={20} color={config.color} />
            </View>

            {/* Title and Category */}
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

            {/* Amount and Time */}
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
                    {new Date(item.createdAt).toLocaleDateString()}
                </Text>
            </View>
        </View>
    );
};

export default SingleExpenseItem;