import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Pressable,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InputField({value, setValue, placeholder, icon, secureTextEntry}) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={"#e8909a"}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#e8909a"}
        cursorColor={"#ff6b7a"}
        onChangeText={setValue}
        secureTextEntry={isSecure}
      />
      {secureTextEntry && (
        <Pressable onPress={()=> setIsSecure(!isSecure)} hitSlop={8}>
          <Ionicons
          name={isSecure? 'eye-off-outline': 'eye-outline'}
          size={20}
          color={"#e8909a"}
          style={styles.eyeIcon}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    width: "100%",
    marginVertical: 7,
    backgroundColor: "#f7e3e5",
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#c0404a",
  },
  eyeIcon: {
    marginLeft: 8,
  },
});
