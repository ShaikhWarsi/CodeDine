import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { patterns } from '@/lib/data';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || !url.includes('leetcode.com/problems/')) {
      return new Response(JSON.stringify({ error: 'Please provide a valid LeetCode problem URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const problemName = url.split('/problems/')[1].split('/')[0].replace(/-/g, ' ');
    const patternList = patterns.map(p => ({ id: p.id, name: p.name, description: p.description }));

    const systemPrompt = `
      You are a senior technical architect. Your job is to analyze a LeetCode problem and map it to one of our 16 core algorithmic primitives.
      
      Problem: ${problemName}
      Available Patterns:
      ${JSON.stringify(patternList, null, 2)}

      Analyze the problem requirements and constraints. 
      Identify which pattern is the MOST efficient fit.
      Provide a concise explanation of WHY this pattern is the primitive for this problem.
      If it uses multiple patterns, pick the primary one.
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: `Analyze the problem: ${problemName} (${url})`,
      schema: z.object({
        patternId: z.string().describe('The ID of the matching pattern'),
        patternName: z.string().describe('The display name of the pattern'),
        explanation: z.string().describe('Concise technical reasoning'),
        difficulty: z.enum(['Easy', 'Medium', 'Hard']),
        keyInsight: z.string().describe('The "Aha!" moment for this problem'),
      }),
    });

    return new Response(JSON.stringify(object), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Pattern Linker Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to analyze problem' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
