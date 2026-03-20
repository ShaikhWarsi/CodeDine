import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, role, seniority, company, difficulty, isStressTest } = await req.json();

  const systemPrompt = `
    You are a senior technical interviewer at ${company || 'a top-tier tech company'}. 
    You are conducting a mock interview for a ${seniority} ${role} position.
    
    Difficulty level: ${difficulty}/5.
    ${isStressTest ? 'STRESS TEST MODE: Your goal is to take a standard problem and introduce a "Senior-level twist" to see how the candidate handles complexity, scale, or edge cases.' : ''}

    Rules:
    1. Start by introducing yourself and asking ONE clear technical question.
    2. Wait for the candidate's response.
    3. Provide constructive feedback on their answer.
    4. Ask follow-up questions to probe their depth (e.g., complexity, trade-offs, alternative approaches).
    5. Maintain a professional, slightly challenging but supportive tone.
    6. If they get stuck, provide a small hint rather than the full answer.
    7. Use Markdown for formatting code snippets.
  `;

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
