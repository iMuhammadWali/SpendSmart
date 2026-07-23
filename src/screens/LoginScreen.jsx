import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
} from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import InputField from "../components/InputField";
import ErrorBanner from "../components/ErrorBanner";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import useAuth from "../hooks/useAuth";
import { loginRequest } from "../api/auth";
import { getCredentialError } from "../utils/validation";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useAuth();
  const navigator = useNavigation();

  const handleLogin = async () => {
    const validationError = getCredentialError(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { ok, data } = await loginRequest(email.trim(), password);
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
        style={styles.imgLogo}
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
      <ErrorBanner message={error} />
      <PrimaryButton
        label="Log In"
        loading={loading}
        onPress={handleLogin}
      />
      <Text style={styles.tvFooter}>
        Don't have an account?{" "}
        <Text
          style={styles.tvFooterLink}
          onPress={() => navigator.replace("Register")}
        >
          Register
        </Text>
      </Text>
    </KeyboardAwareLayout>
  );
}

const styles = StyleSheet.create({
  imgLogo: {
    height: 200,
    width: 200,
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
  tvFooter: {
    marginTop: 0,
    fontFamily: "Poppins_400Regular",
  },
  tvFooterLink: {
    color: "#ff9999",
    fontWeight: "bold",
  },
});
