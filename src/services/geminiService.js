import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY, API_CONFIG, PROMPT_TEMPLATES } from '../config/constants';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateNotes = async (transcript, detailLevel = 'detailed') => {
  try {
    const model = genAI.getGenerativeModel({ model: API_CONFIG.GEMINI_MODEL });
    
    if (!transcript || typeof transcript !== 'string') {
      throw new Error('Invalid transcript data');
    }

    const prompt = PROMPT_TEMPLATES.GENERATE_NOTES(detailLevel) + transcript;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: API_CONFIG.MAX_TOKENS,
        temperature: 0.7,
      },
    });

    if (!result.response) {
      throw new Error('No response from Gemini API');
    }

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    throw new Error('Failed to generate notes. Please try again later.');
  }
};