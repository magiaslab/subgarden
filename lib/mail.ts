import nodemailer from 'nodemailer';

/*
 * Invio dei form con la casella del dominio (Zoho Mail EU): il sito si autentica come
 * info@subgarden.it e scrive a info@ stesso, con «Rispondi a» su chi ha scritto.
 * Mittente del dominio e SPF di Zoho già a posto: niente spam, niente servizi terzi.
 *
 * Variabili su Vercel:
 *   SMTP_USER         info@subgarden.it
 *   SMTP_PASS         password per applicazione creata in Zoho (solo su Vercel)
 *   CONTACT_EMAIL_TO  info@subgarden.it (se manca, si usa SMTP_USER)
 *   SMTP_HOST / SMTP_PORT  facoltative: smtp.zoho.eu / 465
 *
 * Se l'invio non è configurato o fallisce, sendSiteMail ritorna false e il form lo
 * dice (e propone telefono e WhatsApp): mai un «inviato» finto, che farebbe perdere
 * la richiesta.
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
export const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

/** Righe del corpo senza righe vuote doppie (i campi facoltativi lasciano buchi). */
export const bodyText = (lines: string[]) =>
  lines.filter((line, i, all) => line !== '' || all[i - 1] !== '').join('\n');

export async function sendSiteMail({
  form,
  subject,
  replyTo,
  text,
}: {
  /** Nome del form, per i log. */
  form: string;
  subject: string;
  replyTo: { name: string; address: string };
  text: string;
}): Promise<boolean> {
  if (!transport || !to) {
    if (process.env.NODE_ENV !== 'production') {
      // In sviluppo, senza credenziali, il messaggio finisce nel terminale.
      console.log(`Form ${form} (SMTP non configurato):\n${subject}\n${text}`);
      return true;
    }
    console.error(`Form ${form}: SMTP_USER/SMTP_PASS mancanti, messaggio NON inviato`);
    return false;
  }

  try {
    await transport.sendMail({
      from: { name: 'Sito SUBGarden', address: user! },
      to,
      replyTo: { name: oneLine(replyTo.name), address: replyTo.address },
      subject: oneLine(subject),
      text,
    });
    return true;
  } catch (error) {
    console.error(`Form ${form}: invio SMTP fallito`, error);
    return false;
  }
}
