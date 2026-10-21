import { useTranslations } from 'next-intl';
import { Section, SectionIntro } from '@/components/site/Section';
import { SoilSection } from '@/components/site/SoilSection';
import { ButtonLink } from '@/components/ui/Button';
import { SottoIlPrato } from './SottoIlPrato';

export function HowItWorks() {
  const t = useTranslations('home');
  const tn = useTranslations('operationalStrip');
  const legend = [1, 2, 3, 4].map((i) => ({ label: t(`how_${i}_label`), text: t(`how_${i}_text`) })) as [
    { label: string; text: string },
    { label: string; text: string },
    { label: string; text: string },
    { label: string; text: string },
  ];
  return (
    <Section id="come-funziona" tone="raised">
      <SectionIntro eyebrow={t('how_eyebrow')} title={t('how_title')} lead={t('how_lead')} />
      {/* Racconto in 3D: prato, ali gocciolanti, acqua, radici. Ripiego: lo spaccato SVG. */}
      <SottoIlPrato passi={[legend[0], legend[2], legend[3], legend[1]]} etichetta={t('how_figure')}>
        <SoilSection className="mt-12 lg:mt-16" title={t('how_figure')} legend={legend} />
      </SottoIlPrato>
      <div className="mt-10">
        <ButtonLink href="/tecnologia" variant="ghost">
          {tn('cta')}
        </ButtonLink>
      </div>
    </Section>
  );
}
