// TODO: Add symbols on Email and password placeholders.
import { useCallback, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/InputField";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import useAuth from "../hooks/useAuth";
import { loginRequest } from "../api/auth";

// I need to make a context of this logged in thingy.
export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigator = useNavigation();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const { ok, data } = await loginRequest(email, password);
      if (ok) {
        setIsLoggedIn(true);
      } else {
        setError(data?.message ?? "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <Text style={styles.tvLogin}>
              Log in to use <Text style={styles.tvPockit}>Pockit</Text>
            </Text>
            <InputField
              value={email}
              setValue={setEmail}
              placeholder={"Enter your email"}
              icon={"mail-outline"}
            />
            <InputField
              value={password}
              setValue={setPassword}
              placeholder={"Enter your password"}
              icon={"lock-closed-outline"}
              secureTextEntry
            />
            <PrimaryButton
              label="Log In"
              loading={loading}
              onPress={() => {
                handleLogin(email, password);
              }}
            />
            {error ? (
              <Text style={styles.tvError}>{error}</Text>
            ) : null}
            <Text
              style={{
                marginTop: 0,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Don't have an account?{" "}
              <Text
                style={{ color: "#ff9999", fontWeight: "bold" }}
                onPress={() => navigator.replace("Register")}
              >
                {" "}
                Register{" "}
              </Text>
            </Text>
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
  tvLogin: {
    marginVertical: 15,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    textAlign: "center",
  },
  tvPockit: {
    color: "#ff9999",
  },
  tvError: {
    marginTop: 10,
    color: "#E53935",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
