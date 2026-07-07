import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  View,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

export function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={{ flex: 1, backgroundColor: "#fdf7f0" }}
      >
        <ScrollView>
          <View style={styles.vContentContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={{ height: 200, width: 200 }}
            />
            <Text style={styles.tvSignup}>
              Register for <Text style={styles.tvPockit}>Pockit</Text>
            </Text>
            <InputField
              value={username}
              setValue={setUsername}
              placeholder={"Enter username"}
            />
            <InputField
              value={email}
              setValue={setEmail}
              placeholder={"Enter your email"}
            />
            <InputField
              value={password}
              setValue={setPassword}
              placeholder={"Enter your password"}
            />

            <PrimaryButton label="Sign up" onPress={() => {}} />

            <Text style={{
              marginTop: 0,
              fontFamily: "Poppins_400Regular"
            }}>Already have an account? <Text style={{color: "#ff9999", fontWeight: "bold"}}
            onPress={()=> navigator.replace('Login')}> Login </Text></Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  vContentContainer: {
    backgroundColor: "#fdf7f0",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: "20%",
  },
  tvSignup: {
    marginVertical: 15,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    textAlign: "center",
  },
  tvPockit: {
    color: "#ff9999",
  },
});
