import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

const DialogButton = ({ label, variant = "save", onPress, loading = false, disabled = false }) => {
  const isSave = variant === "save";
  const buttonStyle = isSave ? styles.btnSave : styles.btnCancel;
  const textStyle = isSave ? styles.txtSave : styles.txtCancel;

  return (
    <Pressable
      onPress={onPress}
      style={[buttonStyle, (disabled || loading) && styles.btnDisabled]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnSave: {
    flex: 1,
    backgroundColor: "#ff9999",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnCancel: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  txtSave: {
    fontSize: 15,
    fontWeight: "400",
    color: "#ffffff",
  },
  txtCancel: {
    fontSize: 15,
    fontWeight: "400",
  },
});

export default DialogButton;
