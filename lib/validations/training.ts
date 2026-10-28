import { z } from 'zod';

/** Da dove parte chi chiede del corso: serve a richiamarlo con le cose giuste. */
export const TRAINING_PROFILES = ['gardener', 'related', 'beginner'] as const;

export const trainingFormSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6),
  area: z.string().trim().min(2),
  profile: z.enum(TRAINING_PROFILES),
  message: z.string().trim().max(2000).optional(),
});

export type TrainingFormData = z.infer<typeof trainingFormSchema>;
