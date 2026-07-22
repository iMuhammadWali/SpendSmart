import { useState } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import DialogButton from "./DialogButton";

export default function ConfirmationDialog({
  isOpen,
  title = "Are you sure?",
  body,
  confirmLabel = "Confirm",
  onCancel,
  onConfirm,
}) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <Modal animationType="fade" visible={isOpen} transparent={true}>
      {/* The outer view, that covers the whole screen */}
      <View style={styles.vOverlay}>
        {/* The inner view, that has the content of the dialog. */}
        <View style={styles.vDialog}>
          <Text style={styles.txtConfirmation}>{title}</Text>

          {body}

          <View style={styles.vButtons}>
            <DialogButton
              label="Cancel"
              variant="cancel"
              onPress={onCancel}
              disabled={loading}
            />
            <DialogButton
              label={confirmLabel}
              variant="save"
              onPress={handleConfirm}
              loading={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  vOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  vDialog: {
    width: "80%",
    backgroundColor: "#fdf7f0",
    padding: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  txtConfirmation: {
    fontSize: 16,
    fontFamily: "Poppins_300Light",
    marginBottom: 15,
  },
  vButtons: {
    marginTop: 40,
    flexDirection: "row",
    gap: 15,
  },
});
