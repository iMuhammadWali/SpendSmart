import { use, useEffect, useReducer, useRef, useState } from "react"
import { Button, Pressable, TextInput, View, Text, Platform, ActivityIndicator, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAvoidingView } from "react-native"

// Third party stuff.
import * as Clipboard from 'expo-clipboard';
import {Ionicons} from "@expo/vector-icons"

const AIScreen = () => {
    const [prompt, setPrompt] = useState("");
    const [aiResponse, setAiResponse] = useState("This is where your AI response will be shown.")
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
    }

    const handleButtonPress = async () => {
        if (isLoading) return;
        setHistory(prev => [
            ...prev,
            { role: "user", content: prompt },
            ]);
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
                        Authorization: "Bearer sk-or-v1-",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost",
                        "X-OpenRouter-Title": "SpendSmart"
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
                                content: "You are being used in an app called as SpendSmart and I will later use you as the AI assitant that gives financial advice. Never use emojis in this chat."
                            },
                            ...recent,
                            {
                                role: "user",
                                content: prompt
                            }
                        ]
                    }),
                }
            );

            const data = await response.json();
            const reply = data.choices[0].message.content;
            setAiResponse(reply);
            setHistory(prev => [
                ...prev, { role: "assistant", content: reply }
            ]);

            console.log(aiResponse);
            setIsLoading(false);

        } catch (err) {
            console.log(err);
        }   
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fdf7f0"}} edges={["top"]}>
            <KeyboardAvoidingView 
            style={{flex: 1}}
            behavior="padding">
            <ScrollView 
                ref={scrollViewRef}
                contentContainerStyle={{width: "100%", padding: 13, marginBottom: 10}}>
                {history.map((message, index)=>(
                    <View key={index}style={[{minHeight: 50, borderRadius: 10, elevation: 5, padding: 10, marginBottom: 10}, message.role === "assistant"? {marginRight: 30, backgroundColor: "#e6e3ea"} : {marginLeft: 30, backgroundColor: "#f7bcc2"}]}>
                        <Text style={message.role === "assistant"? {color: "#4a4458"}:{color: "#7a2a35"}}>{message.content}</Text>
                        {message.role === "assistant" && (
                        <Pressable
                            onPress={() => handleCopy(message.content, index)}
                            style={{ marginTop: 10, alignSelf: "flex-end", flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Ionicons
                                name={copiedIndex === index ? "checkmark-outline" : "copy-outline"}
                                size={13}
                                color={copiedIndex === index ? "#2A9D6E" : "#9B9488"}
                            />
                            <Text style={{
                                fontSize: 11,
                                fontFamily: "Poppins_400Regular",
                                color: copiedIndex === index ? "#2A9D6E" : "#9B9488"
                            }}>
                                {copiedIndex === index ? "Copied" : "Copy"}
                            </Text>
                        </Pressable>
                )}
                    </View>
                ))}
                {isLoading?( <View style={{ borderWidth: 0, minHeight: 10, borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{color: "#c9a0a8"}}>Model is thinking...</Text>
                </View>): null}

            </ScrollView>
            
            {/* This it the text sending option */}
            <View style={{flexDirection: "row", width: "100%", padding: 10, gap: 5}}>
                <TextInput
                    style={{borderRadius: 10, paddingHorizontal: 12, flex: 1, backgroundColor: "#f7e3e5", elevation: 1, borderWidth: 0, color: "#c0404a"}}
                    value={prompt}
                    placeholder="What's on your mind financially?"
                    placeholderTextColor={"#e8909a"}
                    cursorColor={"#ff6b7a"}
                    onFocus={() => setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 150)}
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
                            })} onPress={handleButtonPress}> 
                    {
                        isLoading? 
                        <ActivityIndicator size={20} color={"#fff"}/>
                        : 
                        <Text style={{color: "#fff", marginTop: -5, fontSize: 20}}>{">"}</Text>
                    }
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}
export default AIScreen;