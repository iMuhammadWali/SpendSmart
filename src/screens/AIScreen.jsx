import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Pressable,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";

// Third party stuff.
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import Header from "../components/Header";

// custom hooks
import { useAiChat } from "../hooks/useAiChat";

const AIScreen = () => {
  const [prompt, setPrompt] = useState("");

  const { history, isLoading, send } = useAiChat();

  const [copiedIndex, setCopiedIndex] = useState(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [history, isLoading]);

  const handleCopy = (text, index) => {
    Clipboard.setStringAsync(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <SafeAreaView style={styles.vSafeArea} edges={["top"]}>
      <Header headerTitle={"Analytics"} />
      <KeyboardAvoidingView style={styles.vKeyboardAvoiding} behavior="padding">
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.vMessageList}
        >
          {history.map((message, index) => (
            <View
              key={index}
              style={[
                styles.vMessageBubble,
                message.role === "assistant"
                  ? styles.vMessageBubbleAssistant
                  : styles.vMessageBubbleUser,
              ]}
            >
              {message.role === "assistant" ? (
                <Markdown style={markdownStyles}>{message.content}</Markdown>
              ) : (
                <Text style={styles.tvUserMessage}>{message.content}</Text>
              )}

              {message.role === "assistant" && (
                <Pressable
                  onPress={() => handleCopy(message.content, index)}
                  style={styles.btnCopy}
                >
                  <Ionicons
                    name={
                      copiedIndex === index
                        ? "checkmark-outline"
                        : "copy-outline"
                    }
                    size={13}
                    color={copiedIndex === index ? "#2A9D6E" : "#9B9488"}
                  />
                  <Text
                    style={[
                      styles.tvCopyLabel,
                      copiedIndex === index && styles.tvCopyLabelCopied,
                    ]}
                  >
                    {copiedIndex === index ? "Copied" : "Copy"}
                  </Text>
                </Pressable>
              )}
            </View>
          ))}
          {isLoading ? (
            <View style={styles.vThinking}>
              <Text style={styles.tvThinking}>Muffin is thinking...</Text>
            </View>
          ) : null}
        </ScrollView>

        {/* This it the text sending option */}
        <View style={styles.vInputRow}>
          <TextInput
            multiline={true}
            style={styles.tiPrompt}
            value={prompt}
            placeholder="What's on your mind financially?"
            placeholderTextColor={"#e8909a"}
            cursorColor={"#ff6b7a"}
            onFocus={() =>
              setTimeout(
                () => scrollViewRef.current?.scrollToEnd({ animated: true }),
                150,
              )
            }
            onChangeText={(text) => setPrompt(text)}
          />

          <Pressable
            style={({ pressed }) => [
              styles.btnSend,
              pressed && styles.btnSendPressed,
            ]}
            onPress={() => {
              send(prompt);
              setPrompt("");
            }}
          >
            {isLoading ? (
              <ActivityIndicator size={20} color={"#fff"} />
            ) : (
              <Text style={styles.tvSendArrow}>{">"}</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  vSafeArea: {
    flex: 1,
    backgroundColor: "#fdf7f0",
  },
  vKeyboardAvoiding: {
    flex: 1,
  },
  vMessageList: {
    width: "100%",
    padding: 13,
    marginBottom: 10,
  },
  vMessageBubble: {
    minHeight: 50,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
  },
  vMessageBubbleAssistant: {
    marginRight: 30,
    backgroundColor: "#e6e3ea",
    marginBottom: 20,
  },
  vMessageBubbleUser: {
    marginLeft: 30,
    backgroundColor: "#f7bcc2",
  },
  tvUserMessage: {
    color: "#7a2a35",
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  btnCopy: {
    alignSelf: "flex-end",
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tvCopyLabel: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: "#9B9488",
  },
  tvCopyLabelCopied: {
    color: "#2A9D6E",
  },
  vThinking: {
    borderWidth: 0,
    minHeight: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  tvThinking: {
    color: "#c9a0a8",
  },
  vInputRow: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    gap: 5,
  },
  tiPrompt: {
    borderRadius: 10,
    paddingHorizontal: 12,
    flex: 1,
    backgroundColor: "#f7e3e5",
    elevation: 1,
    borderWidth: 0,
    color: "#c0404a",
  },
  btnSend: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ff8090",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    alignSelf: "flex-end",
  },
  btnSendPressed: {
    backgroundColor: "#e07080",
  },
  tvSendArrow: {
    color: "#fff",
    marginTop: -5,
    fontSize: 20,
  },
});

const markdownStyles = {
  body: {
    color: "#4a4458",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  heading1: {
    fontSize: 19,
    fontFamily: "Poppins_600SemiBold",
  },
  heading2: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  heading3: {
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
  },
  heading4: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  heading5: { fontSize: 15, fontFamily: "Poppins_500Medium" },
  heading6: { fontSize: 14, fontFamily: "Popping_500Medium" },
  strong: {
    fontFamily: "Poppins_600SemiBold",
    color: "#4a4458",
  },
  bullet_list_icon: { color: "#d75d69" },
  code_inline: {
    backgroundColor: "#d9d4e0",
    color: "#4a4458",
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  fence: {
    backgroundColor: "#d9d4e0",
    borderRadius: 8,
    padding: 10,
  },
  code_block: {
    color: "#4a4458",
    fontFamily: "Poppins_400Regular",
  },
};

export default AIScreen;
