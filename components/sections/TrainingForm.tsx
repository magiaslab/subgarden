'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import { submitTrainingForm } from '@/app/actions/training';
import { TRAINING_PROFILES, trainingFormSchema, type TrainingFormData } from '@/lib/validations/training';
import { cn } from '@/lib/utils/cn';
import { track } from '@/lib/analytics';

/*
 * Form del corso installatori: stessi campi di testo del form contatti (niente
 * controlli di sistema). Il punto di partenza si sceglie con tre schede: radio veri,
 * nascosti alla vista ma non alla tastiera, così frecce e lettori di schermo
 * funzionano come in un gruppo di radio qualsiasi.
 */
const fieldClass =
  'type-body block w-full rounded-[var(--radius-control)] border border-line-strong bg-surface-raised px-4 py-3 text-ink transition-colors focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[invalid=true]:border-danger';
const labelClass = 'type-ui mb-2 block text-ink';
const errorClass = 'type-small mt-2 text-danger';

type Field = 'name' | 'email' | 'phone' | 'area' | 'profile';

export function TrainingForm({ className }: { className?: string }) {
  const t = useTranslations('training.form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TrainingFormData>({
    resolver: zodResolver(trainingFormSchema),
  });

  const onSubmit = async (data: TrainingFormData) => {
    setIsSubmitting(true);
    setStatus(null);
    try {
      const result = await submitTrainingForm(data);
      if (result.success) {
        track({ name: 'generate_lead', params: { form: 'formazione', profile: data.profile } });
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
    errors[field] ? { 'aria-invalid': true as const, 'aria-describedby': `t-${field}-error` } : {};
  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`t-${field}-error`} className={errorClass}>
        {t(`error_${field}`)}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('space-y-6', className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="t-name" className={labelClass}>
            {t('name')}
          </label>
          <input {...register('name')} {...errorProps('name')} type="text" id="t-name" autoComplete="name" className={fieldClass} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="t-area" className={labelClass}>
            {t('area')}
          </label>
          <input
            {...register('area')}
            {...errorProps('area')}
            type="text"
            id="t-area"
            autoComplete="address-level2"
            placeholder={t('area_placeholder')}
            className={fieldClass}
          />
          {errorText('area')}
        </div>
        <div>
          <label htmlFor="t-email" className={labelClass}>
            {t('email')}
          </label>
          <input
            {...register('email')}
            {...errorProps('email')}
            type="email"
            id="t-email"
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
          />
          {errorText('email')}
        </div>
        <div>
          <label htmlFor="t-phone" className={labelClass}>
            {t('phone')}
          </label>
          <input {...register('phone')} {...errorProps('phone')} type="tel" id="t-phone" autoComplete="tel" className={fieldClass} />
          {errorText('phone')}
        </div>
      </div>

      <fieldset {...(errors.profile ? { 'aria-describedby': 't-profile-error' } : {})}>
        <legend className={labelClass}>{t('profile')}</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {TRAINING_PROFILES.map((p) => (
            <label key={p} className="relative block cursor-pointer">
              <input {...register('profile')} type="radio" value={p} className="peer sr-only" />
              <span className="type-ui flex h-full min-h-14 items-center rounded-[var(--radius-control)] border border-line-strong bg-surface-raised px-4 py-3 text-ink transition-colors hover:border-brand peer-checked:border-brand peer-checked:bg-brand peer-checked:text-ink-inverse peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus">
                {t(`profile_${p}`)}
              </span>
            </label>
          ))}
        </div>
        {errorText('profile')}
      </fieldset>

      <div>
        <label htmlFor="t-message" className={labelClass}>
          {t('message')} <span className="font-normal text-ink-muted">({t('optional')})</span>
        </label>
        <textarea
          {...register('message')}
          id="t-message"
          rows={4}
          placeholder={t('message_placeholder')}
          className={cn(fieldClass, 'min-h-32 resize-y')}
        />
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

      <p className="type-small text-ink-muted">
        {t.rich('privacy', {
          link: (chunks) => (
            <Link href="/privacy" className="text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}
