// lib/openai.js
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate a response from OpenAI GPT
 * @param {string} systemPrompt - AI persona instructions
 * @param {Array<{role: string, content: string}>} messages - Chat history
 * @param {string} userMessage - Current user message
 * @returns {Promise<string>} AI response
 */
export async function generateOpenAIResponse(
  systemPrompt,
  messages,
  userMessage
) {
  try {
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10), // Keep last 10 messages for context
      { role: "user", content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: formattedMessages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error("No response generated from OpenAI");

    return response.trim();
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    throw new Error(
      error.status === 401
        ? "Invalid OpenAI API key"
        : error.status === 429
        ? "OpenAI rate limit exceeded"
        : error.status === 500
        ? "OpenAI service unavailable"
        : `OpenAI API error: ${error.message}`
    );
  }
}

/** Check if OpenAI API is configured */
export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}
