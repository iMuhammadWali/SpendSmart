import { Pressable, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ label, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressedButton,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
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
