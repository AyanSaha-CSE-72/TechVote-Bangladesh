import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RumorAnalysisResult } from "../types";

// GUIDELINE COMPLIANCE: The API key must be obtained exclusively from process.env.API_KEY.
// Removed import.meta.env usage which was causing TypeScript errors.
const API_KEY = process.env.API_KEY;

// Initialize client only if key exists
const genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const hasApiKey = (): boolean => !!API_KEY;

/**
 * Mocks the AI response for demonstration purposes if no API key is provided.
 */
const mockAnalyzeRumor = async (text: string, media?: { mimeType: string }): Promise<RumorAnalysisResult> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

  const lowerText = text.toLowerCase();
  
  if (media) {
    return {
      status: "Needs Expert Review",
      summary: "We have detected media content. While AI can analyze visual elements for signs of manipulation (like deepfakes), it is recommended to cross-reference this image/video with official news sources.",
      keyQuestions: [
        "Does the shadow/lighting in the image look consistent?",
        "Is the audio lip-synced correctly (for video)?",
        "Reverse search this image: has it appeared in older contexts?"
      ],
      safetyTip: "Manipulated media is often used to incite anger. Verify before sharing.",
      isHarmful: false
    };
  }

  if (lowerText.includes("cancel") || lowerText.includes("postpone")) {
    return {
      status: "Likely Misleading",
      summary: "We found no official announcements regarding election postponement. This type of rumor often spreads to suppress voter turnout.",
      keyQuestions: [
        "Is the source the official Election Commission website?",
        "Are mainstream news outlets reporting this?",
        "Does the post use emotional or urgent language?"
      ],
      safetyTip: "Always verify dates on the official EC Bangladesh website.",
      isHarmful: false
    };
  }

  if (lowerText.includes("violence") || lowerText.includes("hate")) {
    return {
      status: "Needs Expert Review",
      summary: "This content contains sensitive allegations. Please report it to local authorities or verified safety helplines if it incites violence.",
      keyQuestions: [
        "Is this an isolated incident or a coordinated campaign?",
        "Is the image verifiable via reverse image search?"
      ],
      safetyTip: "Do not share unverified content that may incite panic.",
      isHarmful: true
    };
  }

  return {
    status: "Unverifiable",
    summary: "The context provided is insufficient for a definitive check. However, always be cautious of sensational claims.",
    keyQuestions: [
      "Who is the original author?",
      "When was this originally posted?",
      "Why might someone want me to believe this?"
    ],
    safetyTip: "If in doubt, do not share.",
    isHarmful: false
  };
};

/**
 * Analyzes a rumor using Gemini 2.5 Flash, supporting text and media.
 */
export const analyzeRumor = async (
  text: string, 
  category: string, 
  media?: { data: string, mimeType: string }
): Promise<RumorAnalysisResult> => {
  if (!genAI) {
    console.warn("Gemini API Key missing. Using mock data.");
    return mockAnalyzeRumor(text, media);
  }

  try {
    const promptText = `
      You are a neutral, non-partisan civic-tech assistant for the Bangladesh 2026 election called "TechVote". 
      Analyze the following user input (Text and optionally Image/Video) which they suspect might be a rumor or misinformation.
      
      Category: ${category}
      User Text Context: "${text}"

      If an image or video is provided, analyze it for:
      1. Signs of manipulation (shadows, lighting, artifacts).
      2. Context mismatch (old footage used as new).
      3. Deepfake indicators (unnatural movement, audio sync).
      
      Your goal is to promote media literacy and fact-checking, not to be the final judge of truth, but to guide the user on how to verify it.
      
      Rules:
      1. Be objective and calm.
      2. If the content contains hate speech or incitement to violence, flag it as harmful but give safety advice.
      3. Return a JSON object strictly matching the schema.
    `;

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        status: {
          type: Type.STRING,
          enum: ['Likely Misleading', 'Unverifiable', 'Likely Accurate', 'Needs Expert Review']
        },
        summary: { type: Type.STRING },
        keyQuestions: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        safetyTip: { type: Type.STRING },
        isHarmful: { type: Type.BOOLEAN }
      },
      required: ['status', 'summary', 'keyQuestions', 'safetyTip', 'isHarmful']
    };

    const parts: any[] = [{ text: promptText }];
    
    if (media) {
      parts.push({
        inlineData: {
          mimeType: media.mimeType,
          data: media.data
        }
      });
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.3,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as RumorAnalysisResult;
    }
    
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("AI Service Error:", error);
    return mockAnalyzeRumor(text, media); // Fallback on error
  }
};