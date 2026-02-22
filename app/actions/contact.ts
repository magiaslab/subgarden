'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const contactEmailTo = process.env.CONTACT_EMAIL_TO ?? '';

export async function submitContactForm(data: ContactFormData) {
  try {
    const validatedData = contactFormSchema.parse(data);

    if (resend && contactEmailTo) {
      const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      const { error } = await resend.emails.send({
        from: from.includes('<') ? from : `SUBGarden <${from}>`,
        to: [contactEmailTo],
        replyTo: validatedData.email,
        subject: `[SUBGarden Contatti] Richiesta da ${validatedData.name}`,
        text: [
          `Nome: ${validatedData.name}`,
          `Email: ${validatedData.email}`,
          validatedData.phone ? `Telefono: ${validatedData.phone}` : '',
          '',
          'Messaggio:',
          validatedData.message,
        ]
          .filter(Boolean)
          .join('\n'),
      });

      if (error) {
        console.error('Resend error:', error);
        return {
          success: false,
          message: 'Errore nell\'invio del messaggio. Riprova più tardi.',
        };
      }
      return {
        success: true,
        message: 'Messaggio inviato con successo!',
      };
    }

    // Nessun Resend configurato: simulazione per sviluppo
    console.log('Contact form (no Resend):', validatedData);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: 'Messaggio inviato con successo!',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || 'Errore nell\'invio del messaggio',
      };
    }
    return {
      success: false,
      message: 'Errore nell\'invio del messaggio. Riprova.',
    };
  }
}
