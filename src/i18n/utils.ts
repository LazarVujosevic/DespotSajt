import { translations, type Lang } from './translations';

export type { Lang };

export function t(lang: Lang) {
  return translations[lang];
}

export function navLinks(lang: Lang) {
  const tr = translations[lang];
  const prefix = lang === 'en' ? '/en' : '';
  return [
    { label: tr.nav.home, href: lang === 'en' ? '/en' : '/' },
    { label: tr.nav.services, href: `${prefix}/usluge` },
    { label: tr.nav.about, href: `${prefix}/o-nama` },
    { label: tr.nav.docs, href: `${prefix}/dokumentacija` },
    { label: tr.nav.contact, href: `${prefix}/kontakt` },
  ];
}

export function getAlternateUrl(pathname: string, currentLang: Lang): string {
  if (currentLang === 'sr') {
    return pathname === '/' ? '/en' : `/en${pathname}`;
  } else {
    const stripped = pathname.replace(/^\/en/, '') || '/';
    return stripped;
  }
}

export function serviceHref(slug: string, lang: Lang): string {
  const prefix = lang === 'en' ? '/en' : '';
  return `${prefix}/usluge#${slug}`;
}
