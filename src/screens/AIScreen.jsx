import { use, useEffect, useReducer, useRef, useState } from "react";
import {
  StyleSheet,
  Button,
  Pressable,
  TextInput,
  View,
  Text,
  Platform,
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


const OPEN_ROUTER_API_KEY = process.env.EXPO_PUBLIC_OPEN_ROUTER_API_KEY;

const AIScreen = () => {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(
    "This is where your AI response will be shown.",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

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

  const handleButtonPress = async () => {
    console.log(OPEN_ROUTER_API_KEY);
    if (isLoading) return;
    setHistory((prev) => [...prev, { role: "user", content: prompt }]);
    setIsLoading(true);
    setAiResponse("Model is responding...");
    setPrompt("");
    console.log("Button pressed");
    const recent = history.slice(-12);
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${OPEN_ROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-OpenRouter-Title": "SpendSmart",
          },
          body: JSON.stringify({
            // model: "openai/gpt-5.2",
            model: "deepseek/deepseek-v4-flash",
            // model: "google/gemma-4-31b-it",
            // model: "nvidia/nemotron-3-super-120b-a12b",
            // model: "inclusionai/ring-2.6-1t",
            max_tokens: 3000,
            messages: [
              {
                role: "system",
                // content: "You are being used in an app called as SpendSmart and I will later use you as the AI assitant that gives financial advice. Never use emojis in this chat."
                content: `You are Muffin, the AI financial advisor integrated into the SpendSmart application.

                                Your role is to help users make smarter financial decisions using their spending habits, budgets, financial goals, transaction history, and behavioral patterns.

                                Core Responsibilities:
                                - Analyze user spending behavior.
                                - Detect unhealthy financial patterns.
                                - Suggest realistic budgeting strategies.
                                - Help users reduce unnecessary expenses.
                                - Encourage sustainable financial habits.
                                - Explain financial concepts in simple language.
                                - Provide practical and actionable recommendations.
                                - Help users improve saving consistency.
                                - Detect recurring subscriptions or wasteful spending trends.
                                - Offer spending breakdown insights when transaction data is available.
                                - Help users understand where their money is going.

                                Behavior Rules:
                                - Never use emojis.
                                - Never act overly cheerful, childish, or theatrical.
                                - Maintain a calm, intelligent, professional tone.
                                - Avoid sounding robotic or overly corporate.
                                - Be concise when possible, detailed when necessary.
                                - Do not use excessive formatting.
                                - Use markdown cleanly for readability.
                                - Prefer bullet points over long paragraphs when giving advice.

                                Financial Philosophy:
                                - Prioritize long-term financial stability over impulsive optimization.
                                - Encourage discipline without sounding judgmental.
                                - Adapt advice to the user's apparent income and spending behavior.
                                - Recommend realistic savings strategies instead of extreme austerity.
                                - Emphasize consistency over perfection.

                                When Analyzing Expenses:
                                - Identify patterns and trends.
                                - Mention high-spending categories.
                                - Detect unusual spikes in spending.
                                - Mention recurring charges when relevant.
                                - Provide concrete improvement suggestions.
                                - Suggest achievable budget allocations if enough data exists.

                                Constraints:
                                - Do not fabricate financial data.
                                - Do not pretend to have access to transactions that were not provided.
                                - Do not provide legal, tax, or investment guarantees.
                                - Clearly state uncertainty when information is insufficient.
                                - Avoid generic motivational language.

                                Formatting Preferences:
                                - Use markdown headings when useful.
                                - Use concise bullet points for recommendations.
                                - Use tables only when necessary.
                                - Keep responses easy to scan in a mobile chat interface.

                                The app you are operating inside is called SpendSmart.`,
              },
              ...recent,
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        },
      );

      const data = await response.json();
      const reply = data.choices[0].message.content;
      setAiResponse(reply);
      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);

      console.log(aiResponse);
      setIsLoading(false);
    } catch (err) {
      //TODO: Handle error gracefully.
      console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fdf7f0" }}
      edges={["top"]}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header headerTitle={"Analytics"}/>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            width: "100%",
            padding: 13,
            marginBottom: 10,
          }}
        >
          {history.map((message, index) => (
            <View
              key={index}
              style={[
                {
                  minHeight: 50,
                  borderRadius: 10,
                  elevation: 5,
                  padding: 10,
                  marginBottom: 10,
                },
                message.role === "assistant"
                  ? {
                      marginRight: 30,
                      backgroundColor: "#e6e3ea",
                      marginBottom: 20,
                    }
                  : { marginLeft: 30, backgroundColor: "#f7bcc2" },
              ]}
            >
              {message.role === "assistant" ? (
                <Markdown
                  style={{
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
                  }}
                >
                  {message.content}
                </Markdown>
              ) : (
                <Text
                  style={{
                    color: "#7a2a35",
                    fontFamily: "Poppins_400Regular",
                    fontSize: 14,
                  }}
                >
                  {message.content}
                </Text>
              )}

              {message.role === "assistant" && (
                <Pressable
                  onPress={() => handleCopy(message.content, index)}
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
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
                    style={{
                      fontSize: 11,
                      fontFamily: "Poppins_400Regular",
                      color: copiedIndex === index ? "#2A9D6E" : "#9B9488",
                    }}
                  >
                    {copiedIndex === index ? "Copied" : "Copy"}
                  </Text>
                </Pressable>
              )}
            </View>
          ))}
          {isLoading ? (
            <View
              style={{
                borderWidth: 0,
                minHeight: 10,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "#c9a0a8" }}>Model is thinking...</Text>
            </View>
          ) : null}
        </ScrollView>

        {/* This it the text sending option */}
        <View
          style={{ flexDirection: "row", width: "100%", padding: 10, gap: 5 }}
        >
          <TextInput
            multiline={true}
            style={{
              borderRadius: 10,
              paddingHorizontal: 12,
              flex: 1,
              backgroundColor: "#f7e3e5",
              elevation: 1,
              borderWidth: 0,
              color: "#c0404a",
            }}
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
            style={({ pressed }) => ({
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: pressed ? "#e07080" : "#ff8090",
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
              alignSelf: "flex-end",
            })}
            onPress={handleButtonPress}
          >
            {isLoading ? (
              <ActivityIndicator size={20} color={"#fff"} />
            ) : (
              <Text style={{ color: "#fff", marginTop: -5, fontSize: 20 }}>
                {">"}
              </Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIScreen;
