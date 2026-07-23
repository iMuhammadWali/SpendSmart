import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
} from "react-native";
import KeyboardAwareLayout from "../components/KeyboardAwareLayout";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { registerAndLogin } from "../api/auth";
import useAuth from "../hooks/useAuth";
import { getCredentialError } from "../utils/validation";
import ErrorBanner from "../components/ErrorBanner";

export function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useAuth();

  const navigator = useNavigation();

  const handleRegister = async (username, email, password) => {
    const validationError = getCredentialError(email, password, username);
    if (validationError){
      setError(validationError);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const { ok, data } = await registerAndLogin(username, email, password);
      if (ok) {
        setIsLoggedIn(true);
      } else {
        setError(data?.message ?? "Register failed. Please try again.");
      }
    } catch (err) {
      // Still need to see what kind of errors may occur here.
      setError("Something went wrong. Please try again.");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareLayout>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.imgLogo}
      />
      <Text style={styles.tvRegister}>
        Register for <Text style={styles.tvPockit}>Pockit</Text>
      </Text>
      <InputField
        value={username}
        setValue={setUsername}
        placeholder={"Enter username"}
        icon={"person-outline"}
      />
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
      <ErrorBanner message={error}/>
      <PrimaryButton
        label="Register"
        loading={isLoading}
        onPress={() => {
          handleRegister(username, email, password);
        }}
      />

      <Text style={styles.tvFooter}>
        Already have an account?{" "}
        <Text
          style={styles.tvFooterLink}
          onPress={() => navigator.replace("Login")}
        >
          Login
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
  tvRegister: {
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
