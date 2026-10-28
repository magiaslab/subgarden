'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { bodyText, sendSiteMail } from '@/lib/mail';

/* Form contatti: la mail arriva a info@ (lib/mail.ts), con «Rispondi a» sul cliente. */
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) return { success: false };
  const { name, email, phone, message } = parsed.data;

  const success = await sendSiteMail({
    form: 'contatti',
    subject: `[Sito] Richiesta da ${name}`,
    replyTo: { name, address: email },
    text: bodyText([
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefono: ${phone}` : '',
      '',
      'Messaggio:',
      message,
      '',
      '— Inviato dal form contatti di www.subgarden.it',
    ]),
  });
  return { success };
}
