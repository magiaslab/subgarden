'use server';

import { trainingFormSchema, type TrainingFormData } from '@/lib/validations/training';
import { bodyText, sendSiteMail } from '@/lib/mail';

const PROFILE: Record<TrainingFormData['profile'], string> = {
  gardener: 'Giardiniere o ditta del verde',
  related: 'Lavora in un mestiere vicino (impianti, edilizia, agricoltura)',
  beginner: 'Parte da zero',
};

/* Richiesta di informazioni sul corso installatori: arriva a info@ come i contatti. */
export async function submitTrainingForm(data: TrainingFormData): Promise<{ success: boolean }> {
  const parsed = trainingFormSchema.safeParse(data);
  if (!parsed.success) return { success: false };
  const { name, email, phone, area, profile, message } = parsed.data;

  const success = await sendSiteMail({
    form: 'formazione',
    subject: `[Sito] Corso installatori: ${name} (${area})`,
    replyTo: { name, address: email },
    text: bodyText([
      `Nome: ${name}`,
      `Email: ${email}`,
      `Telefono: ${phone}`,
      `Zona: ${area}`,
      `Esperienza: ${PROFILE[profile]}`,
      '',
      message ? 'Messaggio:' : '',
      message ?? '',
      '',
      '— Inviato dal form della pagina formazione di www.subgarden.it',
    ]),
  });
  return { success };
}
