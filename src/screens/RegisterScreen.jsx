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

export function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth();

  const navigator = useNavigation();

  const handleRegister = async (username, email, password) => {
    try {
      const { ok, data } = await registerAndLogin(username, email, password);
      if (ok) {
        setIsLoggedIn(true);
      } else {
        // probably need to show some error on the screen.
      }
    } catch (err) {
      // I dont know what kind of errors can occur here.
    }
  };

  return (
    <KeyboardAwareLayout>
      <Image
        source={require("../../assets/logo.png")}
        style={{ height: 200, width: 200 }}
      />
      <Text style={styles.tvRegister}>
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
        label="Register"
        onPress={() => {
          handleRegister(username, email, password);
        }}
      />

      <Text
        style={{
          marginTop: 0,
          fontFamily: "Poppins_400Regular",
        }}
      >
        Already have an account?{" "}
        <Text
          style={{ color: "#ff9999", fontWeight: "bold" }}
          onPress={() => navigator.replace("Login")}
        >
          {" "}
          Login{" "}
        </Text>
      </Text>
    </KeyboardAwareLayout>
  );
}

const styles = StyleSheet.create({
  tvRegister: {
    marginVertical: 15,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 28,
    textAlign: "center",
  },
  tvPockit: {
    color: "#ff9999",
  },
});
