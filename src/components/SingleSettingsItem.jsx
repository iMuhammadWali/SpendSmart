import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SingleSettingsItem = ({ item, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
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
      onPress={item.onPress}
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
    </Pressable>
  );
};

export default SingleSettingsItem;
