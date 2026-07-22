import { ActivityIndicator, Pressable, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ label, onPress, loading = false }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !loading && styles.pressedButton,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 30,
    backgroundColor: "#ff9999",
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  pressedButton: {
    backgroundColor: "#ff7e7e",
  },
  buttonText: {
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16
  },
});

export default PrimaryButton;
