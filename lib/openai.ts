import OpenAI from "openai"; 
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
const openai = new OpenAI(
    {
        apiKey : process.env.OPENAI_API_KEY,

    }
) 
export async function generateSummaryFromOpenAI(pdfText: string) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SUMMARY_SYSTEM_PROMPT },
          { role: "user", content: `Transform this document into an engaing 
          summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}` }
        ],
        temperature: 0.7,
        max_tokens:500
      });
      return response.choices[0].message.content;
    } catch (error: any) {
      if (error?.status === 429 && attempt < 2) {
        const delay = Math.pow(2, attempt) * 1000; // exponential backoff
        await new Promise(res => setTimeout(res, delay));
        continue;
      }
      throw error;
    }
  }
}
