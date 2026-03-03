import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';
import { interviewParamsSchema } from '@/lib/validations';

export const runtime = 'edge';

// Simple in-memory cache for hackathon demo
const cache = new Map<string, any>();

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const json = await req.json();
    const result = interviewParamsSchema.safeParse(json);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.format() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { role, seniority, difficulty, company } = result.data;
    const cacheKey = JSON.stringify({ role, seniority, difficulty, company });

    if (cache.has(cacheKey)) {
      console.log('Cache hit for:', cacheKey);
      return new Response(JSON.stringify(cache.get(cacheKey)), {
        headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
      });
    }

    const systemPrompt = `
      You are a senior technical interviewer at a top-tier tech company. 
      Generate 3 highly relevant interview questions for a ${seniority} ${role} role${company ? ` specifically for ${company}` : ''}.
      The difficulty level is ${difficulty}/5.

      For each question, provide:
      1. A clear problem statement.
      2. A rubric with 5 key competencies (e.g., Clarity, Depth, Problem-Solving, Domain, Efficiency).
      3. Exemplar answers for:
         - "Poor": What a weak candidate would say/do.
         - "Average": A standard, acceptable answer.
         - "Excellent": What a top 1% candidate would provide.
      
      Output the result as a JSON object containing an array of 'questions'.
    `;

    const stream = await streamObject({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: `Generate 3 ${seniority} level ${role} questions with difficulty ${difficulty}/5.`,
      schema: z.object({
        questions: z.array(z.object({
          title: z.string(),
          problem: z.string(),
          difficulty: z.number(),
          competencies: z.array(z.object({
            name: z.string(),
            description: z.string(),
          })),
          exemplars: z.object({
            poor: z.string(),
            average: z.string(),
            excellent: z.string(),
          })
        }))
      }),
      onFinish: ({ usage, object }) => {
        const latency = Date.now() - startTime;
        console.log('Analytics:', {
          latency,
          tokens: usage.totalTokens,
          cost: usage.totalTokens * 0.00015 / 1000, // Roughly for gpt-4o-mini
          role,
          seniority
        });
        
        // Save to cache (optional: set TTL if using real redis)
        cache.set(cacheKey, object);
      },
    });

    return stream.toTextStreamResponse();
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate questions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
