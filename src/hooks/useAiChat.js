import { useState } from "react";
import { sendMessage } from "../services/aiService";

const OPEN_ROUTER_API_KEY = process.env.EXPO_PUBLIC_OPEN_ROUTER_API_KEY;

export function useAiChat() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const send = async (prompt) => {
    // Basic validation to prevent empty prompts or 2nd prompt when an answer did not yet arrive.
    if (isLoading || !prompt.trim()) return;

    // Now send the message.
    setIsLoading(true);
    try {
      const reply = await sendMessage(history, prompt, OPEN_ROUTER_API_KEY);
      setHistory((prev) => [...prev, { role: "user", content: prompt }]);
      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.log(err); // Remove this when converting to APK, but keep it for debugging in development.
      setHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { history, isLoading, send };
}
