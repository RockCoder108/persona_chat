// lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * Generate a response from Gemini AI
 * @param {string} systemPrompt - AI persona instructions
 * @param {Array<{role: string, content: string}>} messages - Chat history
 * @param {string} userMessage - Current user message
 * @returns {Promise<string>} AI response
 */
export async function generateGeminiResponse(
  systemPrompt,
  messages,
  userMessage
) {
  try {
    if (!genAI) throw new Error("Gemini API not configured");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build conversation context with last 10 messages
    let conversationContext = `${systemPrompt}\n\nConversation History:\n`;
    messages.slice(-10).forEach((msg) => {
      conversationContext += `${msg.role === "user" ? "Human" : "Assistant"}: ${
        msg.content
      }\n`;
    });
    conversationContext += `\nHuman: ${userMessage}\nAssistant:`;

    const result = await model.generateContent(conversationContext);
    const text = result.response.text();

    if (!text) throw new Error("No response generated from Gemini");
    return text.trim();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw new Error(
      error.message.includes("API_KEY_INVALID")
        ? "Invalid Gemini API key"
        : error.message.includes("QUOTA_EXCEEDED")
        ? "Gemini API quota exceeded"
        : error.message.includes("SERVICE_UNAVAILABLE")
        ? "Gemini service unavailable"
        : `Gemini API error: ${error.message}`
    );
  }
}

/** Check if Gemini API is configured */
export function isGeminiConfigured() {
  return Boolean(process.env.GEMINI_API_KEY);
}
