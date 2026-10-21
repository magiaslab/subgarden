import * as React from 'react';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils/cn';

/*
 * Pulsanti (docs/DESIGN-SYSTEM.md § 3). Due ruoli fissi: il rame invita (un solo
 * `primary` per vista, «Richiedi un sopralluogo»), il verde orienta (`secondary`).
 * `inverse` è il secondario sopra i fondi scuri e le foto. Altezza minima 44 px.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'inverse' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'type-ui inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] min-h-11 transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out-soft)] disabled:opacity-50 disabled:pointer-events-none active:translate-y-px';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-cta text-ink hover:bg-cta-hover hover:text-ink-inverse',
  secondary: 'border border-brand text-brand hover:bg-brand hover:text-ink-inverse',
  // Alias del sito precedente
  outline: 'border border-brand text-brand hover:bg-brand hover:text-ink-inverse',
  inverse: 'border border-ink-inverse/70 text-ink-inverse hover:bg-ink-inverse hover:text-brand-strong',
  ghost: 'text-brand underline decoration-1 underline-offset-[0.3em] hover:decoration-2 px-0 min-h-0',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-7 py-3.5 text-base',
};

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(base, variants[variant], variant !== 'ghost' && sizes[size], className);
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={buttonStyles({ variant, size, className })} {...props} />
  ),
);
Button.displayName = 'Button';

type LinkProps = React.ComponentProps<typeof Link>;

/** Link con l'aspetto di un pulsante (mai un <button> dentro un <a>). */
function ButtonLink({
  variant,
  size,
  className,
  ...props
}: LinkProps & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}

export { Button, ButtonLink };
