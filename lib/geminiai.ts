import { GoogleGenerativeAI } from '@google/generative-ai';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const generateSummaryFromGemini = async (pdfText: string) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-002',
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
    },
  });

  const prompt = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: SUMMARY_SYSTEM_PROMPT },
          {
            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
          },
        ],
      },
    ],
  };

  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;

      const summary = response.text();

      if (!summary) {
        throw new Error('Empty response from Gemini API');
      }

      return summary;
    } catch (error: any) {
      if (error.status === 429 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        console.warn(`Rate limited (429). Retrying in ${delay / 1000}s...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error('GeminiAPI error:', error);
        throw error;
      }
    }
  }

  throw new Error('Failed after maximum retries');
};
