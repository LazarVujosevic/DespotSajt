# Despot nekretnine — Sajt

Prezentacioni sajt za agenciju za nekretnine **Despot nekretnine**. Statički sajt bez backenda, hostovan na cPanel. Dvojezičan (SR/EN).

## Tech stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) v6 — statički output |
| CSS | Tailwind CSS v4 (konfiguracija u CSS, bez `tailwind.config.js`) |
| Font | Montserrat — self-hosted preko `@fontsource/montserrat` (uvozi se u `global.css`) |
| Hosting | cPanel — build se uploaduje iz `dist/` |
| Node | ≥ 22.12.0 |

## Pokretanje

```bash
npm install
npm run dev        # dev server na http://localhost:4321
npm run build      # build u ./dist/
npm run preview    # preview builda lokalno
```

## Deploy na cPanel

1. Pokreni `npm run build`
2. Upload ceo sadržaj `dist/` foldera na public_html (ili željeni folder) — sadržaj foldera ide direktno u root, ne sam folder `dist/`
3. `.htaccess` je već uključen u build — HTTPS redirect, cache, sigurnosni headeri

## Struktura projekta

```
src/
├── data/
│   └── site.ts              ← JEDINI IZVOR ISTINE za naziv, kontakt, nav, social
├── i18n/
│   ├── translations.ts      ← Centralni izvor svih UI stringova (SR + EN)
│   └── utils.ts             ← t(lang), navLinks(lang), getAlternateUrl(), serviceHref()
├── styles/
│   └── global.css           ← Dizajn sistem (CSS custom properties, @theme blok) + font import
├── layouts/
│   └── BaseLayout.astro     ← HTML shell, SEO meta, OG tagovi, JSON-LD
├── components/
│   ├── layout/
│   │   ├── Header.astro            ← Sticky nav, scroll efekat, mobilni hamburger
│   │   ├── Footer.astro            ← 4-kolona, tamna pozadina
│   │   └── LanguageSwitcher.astro  ← SR | EN prebacivanje jezika
│   ├── ui/
│   │   ├── Button.astro     ← Varijante: gold-fill | outline | ghost
│   │   └── Badge.astro      ← Mali label: gold | outline | default
│   └── sections/
│       └── SectionTitle.astro ← eyebrow + h2 + subtitle, align left/center
├── templates/               ← Sav sadržaj stranica (template pattern — vidi CLAUDE.md)
│   ├── HomeTemplate.astro
│   ├── UslugeTemplate.astro
│   ├── AboutTemplate.astro
│   ├── KontaktTemplate.astro
│   └── DokumentacijaTemplate.astro
└── pages/
    ├── index.astro, usluge.astro, o-nama.astro, kontakt.astro,
    │   dokumentacija.astro, politika-privatnosti.astro, 404.astro, hvala.astro
    │   ← srpske rute (tanki wrapper-i: <XTemplate lang="sr" />)
    └── en/
        └── ...              ← engleske rute (isti template-i, lang="en")

public/
├── logo.jpg                 ← Logo klijenta (originalna slika)
├── og-image.jpg, favicon.* ← SEO/social slike
├── dokumenti/               ← PDF dokumenti za /dokumentacija
├── robots.txt
└── .htaccess                ← Apache config za cPanel
```

## Dizajn sistem

Sve boje i varijable su u `src/styles/global.css` unutar `@theme {}` bloka (Tailwind v4 sintaksa).

| Token | Vrednost | Upotreba |
|---|---|---|
| `--color-primary` | `#c9a84c` | Zlatna — akcenti, CTA, ikone |
| `--color-primary-hover` | `#e2ae2e` | Hover stanja |
| `--color-background` | `#0a0a0a` | Pozadina stranica |
| `--color-surface` | `#141414` | Kartice, sekcije |
| `--color-surface-2` | `#1c1c1c` | Ugniježđeni elementi |
| `--color-border` | `#2a2a2a` | Linije razdvajanja |
| `--color-border-gold` | `rgba(201,168,76,0.3)` | Zlatne granice |
| `--color-text` | `#f0ede8` | Primarni tekst |
| `--color-text-muted` | `#9a9a9a` | Sekundarni tekst |
| `--font-sans` | `'Montserrat'` | Sve — headings i body |

## Važne napomene

- **Ćirilica**: Zabranjena na sajtu, uz dva izuzetka — logo slika (`logo.jpg`) i logo tekst pored slike (`ДЕСПОТ некретнине`, eksplicitan zahtev klijenta). Svuda drugde piše se `Despot nekretnine` latinicom.
- **Kontakt forma**: Klijent nije hteo formu — kontakt stranica prikazuje samo telefon, email, Instagram i adresu.
- **Dokumenti**: PDF fajlovi idu u `public/dokumenti/`. Lista i veličine se uređuju u `src/templates/DokumentacijaTemplate.astro` (`docFiles`, `docSizes`).
- **Navigacija i UI tekst**: Uređuju se u `src/i18n/translations.ts` (ne u `site.ts`).
- **Instagram**: `https://www.instagram.com/_prodaja_nekretnina_/`

## Stranice i status

| Stranica | Ruta (SR / EN) | Status |
|---|---|---|
| Homepage | `/` · `/en` | ✅ Kompletan |
| Usluge | `/usluge` · `/en/usluge` | ✅ Kompletan — 3 usluge sa punim sadržajem |
| O nama | `/o-nama` · `/en/o-nama` | ✅ Kompletan |
| Dokumentacija | `/dokumentacija` · `/en/dokumentacija` | ✅ 2 PDF-a postavljena — čekaju još 2 (`opsti-uslovi-poslovanja.pdf`, `cenovnik.pdf`) |
| Kontakt | `/kontakt` · `/en/kontakt` | ✅ Kompletan |
| Politika privatnosti | `/politika-privatnosti` · `/en/...` | ✅ Generička, usklađena sa ZZPL/GDPR |
| 404 | `/404` | ✅ Kompletan |

## Hero fotografija

Desna kolona homepagea prikazuje fotografiju iz `src/assets/hero-nekretnina.jpg` (portrait orijentacija, prikazana ispod teksta na mobilnom — 260px visine).

## Napomene za mobilni prikaz

Plutajuće kartice (npr. "30+ godina iskustva", "Spoj mladosti i iskustva" na homepageu i "U moru posrednika..." na O nama) koriste `position: absolute` sa negativnim offsetima koji se razlikuju za desktop i mobilni prikaz (media query). Na uskim ekranima su pozicionirane dijagonalno van uglova kutije tako da ne prekrivaju tekst — **testirati na više širina ekrana** pre bilo kakve izmene ovih offset-a.

## Dokumenti

PDF fajlovi se nalaze u `public/dokumenti/`. Lista i prevodi naziva se uređuju u `src/templates/DokumentacijaTemplate.astro` i `src/i18n/translations.ts` (`docs.docNames`).

| Fajl | Status |
|---|---|
| `Ugovor-o-posredovanju.pdf` | ✅ Postavljen |
| `Predugovor-o-kupoprodaji-stana.pdf` | ✅ Postavljen |
| `opsti-uslovi-poslovanja.pdf` | 🔲 Čeka dokument od klijenta |
| `cenovnik.pdf` | 🔲 Čeka dokument od klijenta |

## Brend i sadržaj

- **Moto**: *"Mi se bavimo vašim stanom, a vi se bavite vašim danom."* — hero naslov, usluga Upravljanje izdavanjem, footer tagline (u `translations.ts`, ne u `site.ts`)
- **Pozicioniranje**: Nova agencija + tim sa 30+ godina iskustva. "Staro znanje, svež pristup."
- **Usluge**: Prodaja · Iznajmljivanje · Upravljanje izdavanjem (za vlasnike koji žive daleko od nekretnine)
- **Bez kontakt forme** — klijent ne želi formu. Kontakt = telefon + email + Instagram
- **Telefon**: 061 18 30 866
