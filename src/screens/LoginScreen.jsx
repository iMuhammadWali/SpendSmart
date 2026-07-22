// TODO: Add symbols on Email and password placeholders.
import { useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
} from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
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
    <KeyboardAwareLayout>
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
      {error ? <Text style={styles.tvError}>{error}</Text> : null}
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
    </KeyboardAwareLayout>
  );
}

const styles = StyleSheet.create({
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
