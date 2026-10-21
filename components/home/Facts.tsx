import { useTranslations } from 'next-intl';
import { DripLine } from '@/components/site/DripLine';

/*
 * Quattro fatti sulla linea gocciolante, subito sotto l'hero. Il numero grande è per
 * l'occhio (e conta quando ScrollMotion c'è: data-count); la frase completa, con il
 * numero dentro, è quella che leggono tutti, screen reader compresi.
 */
const FACTS = [
  { key: 'fact1', count: '70' },
  { key: 'fact2', count: '90' },
  { key: 'fact3', count: '1.6' },
  { key: 'fact4' },
] as const;

export function Facts() {
  const t = useTranslations('home');
  return (
    <section aria-label={t('facts_label')} className="bg-surface py-14 lg:py-20">
      <div className="container-site">
        <DripLine drops={20} />
        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => {
            const value = t(`${f.key}_value`);
            const match = 'count' in f ? value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/) : null;
            return (
              <li key={f.key} className="border-l border-line pl-5">
                <p aria-hidden className="type-data mb-3 text-brand">
                  {match ? (
                    <>
                      {match[1]}
                      <span data-count={'count' in f ? f.count : undefined}>{match[2]}</span>
                      {match[3]}
                    </>
                  ) : (
                    value
                  )}
                </p>
                <p className="type-body text-ink-muted">{t(`${f.key}_text`)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
