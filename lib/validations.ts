import { z } from 'zod';

export const interviewParamsSchema = z.object({
  role: z.string().min(1).max(50),
  seniority: z.enum(['Junior', 'Mid-Level', 'Senior', 'Staff/Lead']),
  difficulty: z.number().min(1).max(5).default(3),
  company: z.string().optional(),
});

export type InterviewParams = z.infer<typeof interviewParamsSchema>;
