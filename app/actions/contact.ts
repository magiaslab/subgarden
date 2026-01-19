'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validazione
    const validatedData = contactFormSchema.parse(data);

    // TODO: Integrare con sistema email (Resend)
    // Per ora simuliamo l'invio
    console.log('Contact form submission:', validatedData);

    // Simulazione delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
