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
} from "react-native";

export default function InputField({value, setValue, placeholder}) {
  return (
    <TextInput
      multiline={true}
      style={{
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
        width: "100%",
        marginVertical: 7,
        backgroundColor: "#f7e3e5",
        elevation: 1,
        borderWidth: 0,
        color: "#c0404a",
      }}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={"#e8909a"}
      cursorColor={"#ff6b7a"}
      onChangeText={setValue}
    />
  );
}
