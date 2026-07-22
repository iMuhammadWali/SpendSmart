import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function KeyboardAwareLayout({
  children,
  contentContainerStyle,
  edges = ["top"],
}) {
  return (
    <SafeAreaView style={styles.vSafeArea} edges={edges}>
      <KeyboardAwareScrollView
        style={styles.vScroll}
        contentContainerStyle={[styles.vContentContainer, contentContainerStyle]}
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={20}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  vSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
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
