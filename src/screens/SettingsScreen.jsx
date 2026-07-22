import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import SingleSettingsItem from "../components/SingleSettingsItem";
import ConfirmationDialog from "../components/ConfirmationDialog";
import useAuth from "../hooks/useAuth";

const SettingsScreen = () => {
  const { setIsLoggedIn } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // I can add icons here as well but I wont do it myself. I will let GPT do it.
  const options = [
    {
      title: "Sync Online",
      icon: "cloud-upload-outline",
      iconColor: "#4CAF50",
    },
    {
      title: "Logout",
      icon: "log-out-outline",
      iconColor: "#E53935",
      onPress: () => {
        setIsLogoutDialogOpen(true);
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header headerTitle="Settings" />
      <View style={styles.contentContainer}>
        {options.map((item, index) => (
          <SingleSettingsItem key={index} item={item}></SingleSettingsItem>
        ))}
      </View>

      <ConfirmationDialog
        isOpen={isLogoutDialogOpen}
        title="Are you sure you want to logout?"
        confirmLabel="Logout"
        onCancel={() => setIsLogoutDialogOpen(false)}
        onConfirm={() => {
          setIsLogoutDialogOpen(false);
          setIsLoggedIn(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffbf7",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fdf7f0",
    paddingHorizontal: 20,
  },
});

export default SettingsScreen;
