import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Section, SectionIntro } from '@/components/site/Section';

/*
 * Cosa cambia in giardino: sei effetti concreti. Due con la foto (i più visibili:
 * arredi fuori e niente zanzare), quattro come elenco compatto: niente griglia di
 * card tutte uguali.
 */
const WITH_IMAGE = [
  { key: 'furniture', image: '/arredi.jpg' },
  { key: 'mosquitoes', image: '/zanzare.jpg' },
] as const;
const TEXT_ONLY = ['water', 'puddles', 'noise', 'installation'] as const;

export function Why() {
  const t = useTranslations('home');
  const tp = useTranslations('painPoints');
  return (
    <Section tone="alt">
      <SectionIntro eyebrow={t('why_eyebrow')} title={t('why_title')} lead={tp('description')} />
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-16">
        {WITH_IMAGE.map((item) => (
          <figure key={item.key}>
            <div className="rounded-media relative aspect-3/2 bg-surface">
              <Image src={item.image} alt="" fill sizes="(min-width: 48rem) 50vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-5">
              <p className="type-h3 text-ink">{tp(`${item.key}.title`)}</p>
              <p className="type-body mt-2 max-w-prose text-ink-muted">{tp(`${item.key}.description`)}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <ul className="mt-14 grid gap-x-8 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {TEXT_ONLY.map((key) => (
          <li key={key}>
            <p className="type-h3 text-ink">{tp(`${key}.title`)}</p>
            <p className="type-body mt-2 text-ink-muted">{tp(`${key}.description`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
