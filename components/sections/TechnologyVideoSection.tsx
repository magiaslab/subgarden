import { useTranslations } from 'next-intl';
import { Section } from '@/components/site/Section';

// Pagina tecnologia: preferisce il video dedicato, altrimenti quello esplicativo (stesso della home)
const videoUrl =
  process.env.NEXT_PUBLIC_TECHNOLOGY_VIDEO_URL?.trim() || process.env.NEXT_PUBLIC_EXPLANATORY_VIDEO_URL?.trim() || '';
const posterUrl =
  process.env.NEXT_PUBLIC_TECHNOLOGY_VIDEO_POSTER_URL?.trim() ||
  process.env.NEXT_PUBLIC_EXPLANATORY_VIDEO_POSTER_URL?.trim() ||
  '';

/** Il video di un minuto, se configurato: niente autoplay, controlli nativi. */
export function TechnologyVideoSection() {
  const t = useTranslations('technologyPage');
  if (!videoUrl) return null;

  return (
    <Section tone="alt" className="pt-0 md:pt-0 lg:pt-0">
      <figure className="max-w-5xl">
        <div className="rounded-media relative aspect-video bg-surface-inverse">
          <video controls playsInline preload="none" poster={posterUrl || undefined} className="size-full object-contain">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
        <figcaption className="type-small mt-3 text-ink-muted">{t('video_title')}</figcaption>
      </figure>
    </Section>
  );
}
