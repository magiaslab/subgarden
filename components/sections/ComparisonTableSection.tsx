import { useTranslations } from 'next-intl';
import { Section, SectionIntro } from '@/components/site/Section';

const rows = ['water_eff', 'mosquito', 'furniture', 'aesthetic', 'maintenance'] as const;

/*
 * Pioggia contro SUBGarden, riga per riga. Una tabella vera (th con scope), senza
 * icone: la colonna SUBGarden si distingue per il colore del testo e il filetto rame.
 * Sotto i 40 rem scorre di lato nel suo contenitore, la pagina no.
 */
export function ComparisonTableSection({ eyebrow }: { eyebrow?: string }) {
  const t = useTranslations('comparison');

  return (
    <Section tone="alt">
      <SectionIntro eyebrow={eyebrow} title={t('title')} />
      <div className="mt-10 overflow-x-auto lg:mt-14" tabIndex={0} role="region" aria-label={t('title')}>
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="type-eyebrow w-[28%] py-4 pr-6 text-ink-muted">
                {t('feature')}
              </th>
              <th scope="col" className="type-eyebrow w-[36%] py-4 pr-6 text-ink-muted">
                {t('rain')}
              </th>
              <th scope="col" className="type-eyebrow w-[36%] border-l-2 border-cta py-4 pl-6 text-brand">
                {t('subgarden')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row} className="border-b border-line">
                <th scope="row" className="type-ui py-5 pr-6 align-top text-ink">
                  {t(`${row}_label`)}
                </th>
                <td className="type-body py-5 pr-6 align-top text-ink-muted">{t(`rain_${row}`)}</td>
                <td className="type-body border-l-2 border-cta py-5 pl-6 align-top font-semibold text-brand">
                  {t(`subgarden_${row}`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
