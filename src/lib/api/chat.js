import { generateOpenAIResponse } from "../openai";
import { generateGeminiResponse } from "../gemini";
import { personas, getPersonaById } from "../personas";

export async function getAIResponse({ userMessage, personaId, chatHistory }) {
  const persona = getPersonaById(personaId) || personas.hitesh;

  if (persona.provider === "openai") {
    return await generateOpenAIResponse(
      persona.systemPrompt,
      chatHistory || [],
      userMessage
    );
  } else if (persona.provider === "gemini") {
    return await generateGeminiResponse(
      persona.systemPrompt,
      chatHistory || [],
      userMessage
    );
  }

  throw new Error("Unknown AI provider");
}
