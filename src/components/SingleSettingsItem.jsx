import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SingleSettingsItem = ({ item }) => {
  // TODO: Add the signup button, or if signed in, the email, and username
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fdf7f0",
        borderRadius: 16,
        paddingLeft: 5,
        paddingRight: 15,
        paddingVertical: 5,
        marginVertical: 5,
        gap: 12,
        elevation: 2,
        shadowColor: "#C4A882",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
    >
      {/* Icon */}
      <View
        style={{
          width: 55,
          height: 55,
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={item.icon} size={20} color={item.iconColor} />
      </View>

      {/* Setting option */}
      <View style={{ flex: 1, gap: 5 }}>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 16,
            color: "#000",
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
    </View>
  );
};

export default SingleSettingsItem;
