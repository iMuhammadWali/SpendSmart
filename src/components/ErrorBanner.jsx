import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Inline error banner. Renders nothing when message is empty/falsy.
export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <View style={styles.vBanner}>
      <Ionicons name="warning" size={18} color="#c0392b" />
      <Text style={styles.tvMessage}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  vBanner: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#fdecea",
    borderWidth: 1,
    borderColor: "#f5b7b1",
  },
  tvMessage: {
    flex: 1,
    marginLeft: 8,
    color: "#c0392b",
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
  },
});
