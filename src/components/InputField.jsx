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
import { Ionicons } from "@expo/vector-icons";

export default function InputField({value, setValue, placeholder, icon, secureTextEntry}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
        width: "100%",
        marginVertical: 7,
        backgroundColor: "#f7e3e5",
        elevation: 1,
      }}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={"#e8909a"}
          style={{ marginRight: 8 }}
        />
      )}
      <TextInput
        style={{
          flex: 1,
          height: "100%",
          color: "#c0404a",
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#e8909a"}
        cursorColor={"#ff6b7a"}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
