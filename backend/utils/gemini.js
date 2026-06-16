import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// initialize gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

if (!process.env.GEMINI_KEY) {
  console.log("WARNING: GEMINI_KEY is not set. AI features will be blocked");
}

export const generateGameRecommendation = async ({
  platforms = [],
  genreType = "any",
  players = 1,
  difficulty = "medium",
  gameTags = [],
}) => {
  const platformInfo =
    platforms.length > 0
      ? `Preferred platforms: ${platforms.join(", ")}`
      : "Any platform";

  const tagsInfo =
    gameTags.length > 0
      ? `Preferred tags: ${gameTags.join(", ")}`
      : "No specific tags";

  const difficultyGuide = {
    easy: "casual and beginner-friendly",
    medium: "balanced challenge",
    hard: "challenging and skill-intensive",
  };

  const prompt = `
Generate a game recommendation based on the following preferences:

${platformInfo}
Preferred Genre: ${genreType}
Number of Players: ${players}
Difficulty Preference: ${difficultyGuide[difficulty] || "balanced challenge"}
${tagsInfo}

Return ONLY valid JSON. Do not include markdown, explanations, or code fences.

{
  "name": "Game Name",
  "description": "Short game summary",
  "genreType": "${genreType}",
  "platforms": ["PC", "PlayStation 5"],
  "difficulty": "easy|medium|hard",
  "players": ${players},
  "estimatedPlaytime": "20-40 hours",
  "releaseYear": 2023,
  "developer": "Studio Name",
  "gameTags": [
    "Open World",
    "RPG",
    "Story Rich"
  ],
  "whyRecommended": [
    "Reason 1",
    "Reason 2",
    "Reason 3"
  ],
  "pros": [
    "Strong story",
    "Excellent gameplay"
  ],
  "cons": [
    "Steep learning curve"
  ],
  "similarGames": [
    "Game A",
    "Game B",
    "Game C"
  ]
}

Recommend a real game whenever possible.
`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const generatedText = response.text.trim();

    // Remove markdown code blocks if present
    let jsonText = generatedText;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?$/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```json\n?/g, "");
    }

    const recommendation = JSON.parse(jsonText);
    return recommendation;
  } catch (error) {
    console.log("Gemini API Error:", error);
    throw new Error("Failed to generate recommendation. Please try again");
  }
};

export default {
  generateGameRecommendation,
};
