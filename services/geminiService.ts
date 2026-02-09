
import { GoogleGenAI, Type } from "@google/genai";
import { GardenConfig, BloomResponse, ProductEvaluation, VibeType } from "../types";

export class GardenLifeForce {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  }

  // FEATURE: THINKING MODE (Complex Analysis)
  async generateBloom(config: GardenConfig): Promise<BloomResponse> {
    const prompt = `
      You are the "Garden Life-Force," a sentient design engine. 
      A designer named "${config.name}" has arrived at the Black & White Void.
      Vibe: ${config.vibe}
      Palette: ${config.colors.join(", ")}
      Hair Characteristic: ${config.hairType}

      1. Write a 'Bloom Narrative' welcoming them.
      2. Describe a Ghibli-style avatar for them based on their hair type and vibe.
      3. Provide a brief design analysis of why this palette fits their vibe.
      4. Summarize the designer's style identity in one 'Title' (e.g., 'The Ethereal Minimalist', 'Void Walker', 'Cyber-shaman').
      5. Create a 'Stat Block' with integers (0-100) for: UI_Power, Vibe_Consistency, and Creativity. Base these on how cohesive the palette is.
      6. Suggest one 'Evolution' for the Avatar now that they have reached Level 2 (e.g., "Her hair now floats with zero-gravity pixels").
      7. Write a short, punchy 'Public Invite' message (max 10 words) to invite others to this garden.

      Respond ONLY in JSON format.
    `;

    try {
      // Uses gemini-3-pro-preview with HIGH thinking budget for complex persona creation
      const response = await this.ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              narrative: { type: Type.STRING },
              avatarDescription: { type: Type.STRING },
              designAnalysis: { type: Type.STRING },
              styleTitle: { type: Type.STRING },
              stats: {
                type: Type.OBJECT,
                properties: {
                  uiPower: { type: Type.NUMBER },
                  vibeConsistency: { type: Type.NUMBER },
                  creativity: { type: Type.NUMBER }
                },
                required: ["uiPower", "vibeConsistency", "creativity"]
              },
              avatarEvolution: { type: Type.STRING },
              inviteMessage: { type: Type.STRING }
            },
            required: ["narrative", "avatarDescription", "designAnalysis", "styleTitle", "stats", "avatarEvolution", "inviteMessage"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response text");
      return JSON.parse(text.trim());
    } catch (error) {
      console.error("Bloom Generation Error:", error);
      // Fallback for offline/error states
      return {
        narrative: "The Void trembles as you arrive. Your colors bleed into the gray, demanding existence. Welcome, creator.",
        avatarDescription: "A figure with flowing hair, wearing a designer's cloak that shifts colors like an oil slick on water.",
        designAnalysis: "A bold choice that disrupts the status quo.",
        styleTitle: "The Unknown Architect",
        stats: { uiPower: 75, vibeConsistency: 80, creativity: 85 },
        avatarEvolution: "Your silhouette begins to glow with an inner light, signaling the awakening of your true potential.",
        inviteMessage: "Enter the realm of the Unknown."
      };
    }
  }

  // FEATURE: FAST EVALUATION (Flash Model)
  async evaluateProduct(productName: string, vibe: VibeType): Promise<ProductEvaluation> {
    const prompt = `
      As the Garden Life-Force, evaluate the product "${productName}" for a garden with a "${vibe}" vibe.
      
      1. Assign a Rarity (Common, Rare, Epic, Legendary).
      2. Evaluate how well it fits the ${vibe} theme (1-2 sentences).
      3. Give it a Vibe Alignment Score (0-100).

      Respond ONLY in JSON format.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rarity: { type: Type.STRING, description: "Common, Rare, Epic, or Legendary" },
              evaluation: { type: Type.STRING },
              vibeScore: { type: Type.NUMBER }
            },
            required: ["rarity", "evaluation", "vibeScore"]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No response text");
      return JSON.parse(text.trim());
    } catch (error) {
      return {
        rarity: 'Common',
        evaluation: "An interesting addition to the ecosystem, though its roots haven't fully taken hold of the vibe yet.",
        vibeScore: 50
      };
    }
  }

  // FEATURE: NANO BANANA (Image Editing)
  async editAvatar(imageBase64: string, instruction: string): Promise<string> {
    // Basic data URL cleanup
    const base64Data = imageBase64.split(',')[1] || imageBase64;
    const mimeType = imageBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)?.[1] || 'image/png';

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { mimeType, data: base64Data } },
                { text: `Edit this image: ${instruction}. Maintain the original style but apply the changes seamlessly.` }
            ]
        }
      });

      // Nano Banana series models return images in the parts array
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image generated by Gemini.");
    } catch (error) {
      console.error("Avatar Edit Error:", error);
      throw error;
    }
  }
}
