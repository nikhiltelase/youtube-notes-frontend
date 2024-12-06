export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const API_CONFIG = {
  GEMINI_MODEL: 'gemini-1.5-flash',
  MAX_TOKENS: 2048,
};

export const PROMPT_TEMPLATES = {
  GENERATE_NOTES: (detailLevel) => `
Generate well-structured ${detailLevel} notes from the following video transcript. 
Please organize the content with:
- Clear main topic headings
- Bullet points for key concepts
- Numbered lists for sequential information
- Important terms in bold
- Examples and references properly formatted

Format the output in markdown with proper hierarchy and spacing.

Transcript:
`
};