'use server';

import nodemailer from 'nodemailer';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';

/*
 * Invio del form contatti con la casella del dominio (Zoho Mail EU): il sito si
 * autentica come info@subgarden.it e scrive a info@ stesso, con «Rispondi a» sul
 * cliente. Mittente del dominio e SPF di Zoho già a posto: niente spam, niente
 * servizi terzi.
 *
 * Variabili su Vercel:
 *   SMTP_USER         info@subgarden.it
 *   SMTP_PASS         password per applicazione creata in Zoho (solo su Vercel)
 *   CONTACT_EMAIL_TO  info@subgarden.it (se manca, si usa SMTP_USER)
 *   SMTP_HOST / SMTP_PORT  facoltative: smtp.zoho.eu / 465
 *
 * Se l'invio non è configurato o fallisce, il form lo dice (e propone telefono e
 * WhatsApp): mai un «inviato» finto, che farebbe perdere la richiesta.
 */
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const to = process.env.CONTACT_EMAIL_TO || user;
const port = Number(process.env.SMTP_PORT || 465);

const transport =
  user && pass
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.zoho.eu',
        port,
        secure: port === 465,
        auth: { user, pass },
      })
    : null;

// Una riga d'intestazione non deve poter contenere a capo (header injection)
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) return { success: false };
  const { name, email, phone, message } = parsed.data;

  if (!transport || !to) {
    if (process.env.NODE_ENV !== 'production') {
      // In sviluppo, senza credenziali, il messaggio finisce nel terminale.
      console.log('Form contatti (SMTP non configurato):', parsed.data);
      return { success: true };
    }
    console.error('Form contatti: SMTP_USER/SMTP_PASS mancanti, messaggio NON inviato');
    return { success: false };
  }

  try {
    await transport.sendMail({
      from: { name: 'Sito SUBGarden', address: user! },
      to,
      replyTo: { name: oneLine(name), address: email },
      subject: oneLine(`[Sito] Richiesta da ${name}`),
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        phone ? `Telefono: ${phone}` : '',
        '',
        'Messaggio:',
        message,
        '',
        '— Inviato dal form contatti di www.subgarden.it',
      ]
        .filter((line, i, all) => line !== '' || all[i - 1] !== '')
        .join('\n'),
    });
    return { success: true };
  } catch (error) {
    console.error('Form contatti: invio SMTP fallito', error);
    return { success: false };
  }
}
