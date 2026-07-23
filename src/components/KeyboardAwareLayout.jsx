import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KeyboardAwareLayout({
  children,
  header,
  contentContainerStyle,
  edges = ["top"],
}) {
  return (
    <SafeAreaView style={styles.vSafeArea} edges={edges}>
      <StatusBar style="dark" />
      {header}
      <KeyboardAwareScrollView
        style={styles.vScroll}
        contentContainerStyle={[styles.vContentContainer, contentContainerStyle]}
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={120}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  vSafeArea: {
    flex: 1,
    backgroundColor: "#fdf7f0",
  },
  vScroll: {
    flex: 1,
    backgroundColor: "#fdf7f0",
  },
  vContentContainer: {
    backgroundColor: "#fdf7f0",
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: "center",
  },
});
