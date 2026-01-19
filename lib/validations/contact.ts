import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Il nome deve contenere almeno 2 caratteri'),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Il messaggio deve contenere almeno 10 caratteri'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
