'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { submitContactForm } from '@/app/actions/contact';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics';

/*
 * Form contatti (docs/DESIGN-SYSTEM.md § 3): solo campi di testo, niente controlli di
 * sistema. Validazione con zod; gli errori sono tradotti qui (lo schema ha i messaggi
 * solo in italiano) e legati al campo con aria-describedby/aria-invalid. L'esito
 * dell'invio è in una regione aria-live sempre presente.
 */
const fieldClass =
  'type-body block w-full rounded-[var(--radius-control)] border border-line-strong bg-surface-raised px-4 py-3 text-ink transition-colors focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[invalid=true]:border-danger';
const labelClass = 'type-ui mb-2 block text-ink';
const errorClass = 'type-small mt-2 text-danger';

type Field = 'name' | 'email' | 'phone' | 'message';
const ERROR_KEY: Partial<Record<Field, string>> = {
  name: 'error_name',
  email: 'error_email',
  message: 'error_message',
};

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        track({ name: 'generate_lead', params: { form: 'contatti' } });
        setStatus({ type: 'success', message: t('success') });
        reset();
      } else {
        setStatus({ type: 'error', message: t('error') });
      }
    } catch {
      setStatus({ type: 'error', message: t('error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorProps = (field: Field) =>
    errors[field] ? { 'aria-invalid': true as const, 'aria-describedby': `${field}-error` } : {};
  const errorText = (field: Field) =>
    errors[field] && ERROR_KEY[field] ? (
      <p id={`${field}-error`} className={errorClass}>
        {t(ERROR_KEY[field]!)}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('space-y-6', className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t('name')}
          </label>
          <input {...register('name')} {...errorProps('name')} type="text" id="name" autoComplete="name" className={fieldClass} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t('email')}
          </label>
          <input
            {...register('email')}
            {...errorProps('email')}
            type="email"
            id="email"
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
          />
          {errorText('email')}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          {t('phone')} <span className="font-normal text-ink-muted">({t('optional')})</span>
        </label>
        <input {...register('phone')} type="tel" id="phone" autoComplete="tel" className={cn(fieldClass, 'sm:max-w-sm')} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t('message')}
        </label>
        <textarea {...register('message')} {...errorProps('message')} id="message" rows={6} className={cn(fieldClass, 'min-h-40 resize-y')} />
        {errorText('message')}
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" variant="primary" disabled={isSubmitting} className="sm:min-w-56">
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden className="size-5 animate-spin motion-reduce:animate-none" />
              {t('sending')}
            </>
          ) : (
            t('submit')
          )}
        </Button>

        <div role="status" aria-live="polite" className="min-h-6">
          {status && (
            <p className={cn('type-ui flex items-center gap-2', status.type === 'success' ? 'text-brand' : 'text-danger')}>
              {status.type === 'success' ? <CheckCircle2 aria-hidden className="size-5 shrink-0" /> : <XCircle aria-hidden className="size-5 shrink-0" />}
              {status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
