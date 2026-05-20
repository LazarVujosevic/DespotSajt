# Despot nekretnine — Sajt

Prezentacioni sajt za agenciju za nekretnine **Despot nekretnine**. Statički sajt bez backenda, hostovan na cPanel.

## Tech stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) v6 — statički output |
| CSS | Tailwind CSS v4 (konfiguracija u CSS, bez `tailwind.config.js`) |
| Font | Montserrat (Google Fonts, učitava se u `BaseLayout.astro`) |
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
2. Upload ceo sadržaj `dist/` foldera na public_html (ili željeni folder)
3. `.htaccess` je već uključen u build — HTTPS redirect, cache, sigurnosni headeri

## Struktura projekta

```
src/
├── data/
│   └── site.ts              ← JEDINI IZVOR ISTINE za naziv, kontakt, nav, social
├── styles/
│   └── global.css           ← Dizajn sistem: CSS custom properties, @theme blok
├── layouts/
│   └── BaseLayout.astro     ← HTML shell, SEO meta, OG tagovi, font import
├── components/
│   ├── layout/
│   │   ├── Header.astro     ← Sticky nav, scroll efekat, mobilni hamburger (vanilla JS)
│   │   └── Footer.astro     ← 4-kolona, tamna pozadina
│   ├── ui/
│   │   ├── Button.astro     ← Varijante: gold-fill | outline | ghost
│   │   └── Badge.astro      ← Mali label: gold | outline | default
│   └── sections/
│       └── SectionTitle.astro ← eyebrow + h2 + subtitle, align left/center
└── pages/
    ├── index.astro          ← Homepage
    ├── usluge.astro         ← Usluge (placeholder)
    ├── o-nama.astro         ← O nama (placeholder)
    ├── dokumentacija.astro  ← PDF dokumenti za preuzimanje
    ├── kontakt.astro        ← Kontakt info (bez forme)
    ├── hvala.astro          ← Stranica posle slanja forme (reserved)
    └── 404.astro            ← Custom 404

public/
├── logo.jpg                 ← Logo klijenta (originalna slika)
├── favicon.svg              ← Favicon
├── favicon.ico
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

- **Ćirilica**: Zabranjena na sajtu osim na samom logo fajlu (`logo.jpg`). Sve ime brenda piše se kao `Despot nekretnine`.
- **Kontakt forma**: Klijent nije hteo formu — kontakt stranica prikazuje samo telefon, email, Instagram i adresu.
- **Dokumenti**: PDF fajlovi idu u `public/dokumenti/`. Lista se uređuje direktno u `src/pages/dokumentacija.astro`.
- **Navigacija**: Uređuje se u `src/data/site.ts` — `nav` niz.
- **Instagram**: `https://www.instagram.com/_prodaja_nekretnina_/`

## Stranice i status

| Stranica | Ruta | Status |
|---|---|---|
| Homepage | `/` | ✅ Kompletan |
| Usluge | `/usluge` | ✅ Kompletan — 3 usluge sa punim sadržajem |
| O nama | `/o-nama` | ✅ Kompletan |
| Dokumentacija | `/dokumentacija` | ✅ 2 PDF-a postavljena — čekaju još 2 (`opsti-uslovi-poslovanja.pdf`, `cenovnik.pdf`) |
| Kontakt | `/kontakt` | ✅ Kompletan |
| Politika privatnosti | `/politika-privatnosti` | ✅ Generička — preporučiti pregled pravnika pre lansiranja |
| 404 | `/404` | ✅ Kompletan |

## Hero fotografija

Desna kolona homepagea prikazuje placeholder dok ne stigne prava fotografija. Kada bude:
1. Kopirati fajl kao `public/hero-nekretnina.jpg`
2. Fotografija treba biti **portrait orijentacije** (viša nego šira) — minimalno 600×800px
3. Nema potrebe da se mijenja kod — placeholder se automatski zamjenjuje

## Napomene za mobilni prikaz

Plutajuće kartice (npr. "30+ godina iskustva", "Spoj mladosti i iskustva" na homepageu i "U moru posrednika..." na O nama) koriste `position: absolute` sa negativnim offsetima. Na mobilnom se kompenzuje padding-om na kontejneru — **ne mijenjati** bez testiranja na telefonu.

## Dokumenti

PDF fajlovi se nalaze u `public/dokumenti/`. Lista se uređuje u `src/pages/dokumentacija.astro`.

| Fajl | Status |
|---|---|
| `Ugovor-o-posredovanju.pdf` | ✅ Postavljen |
| `Predugovor-o-kupoprodaji-stana.pdf` | ✅ Postavljen |
| `opsti-uslovi-poslovanja.pdf` | 🔲 Čeka dokument od klijenta |
| `cenovnik.pdf` | 🔲 Čeka dokument od klijenta |

## Brend i sadržaj

- **Moto**: *"Mi se bavimo vašim stanom, a vi se bavite vašim danom."* — hero naslov, usluga Upravljanje izdavanjem, footer tagline
- **Pozicioniranje**: Nova agencija + tim sa 30+ godina iskustva. "Staro znanje, svež pristup."
- **Usluge**: Prodaja · Iznajmljivanje · Upravljanje izdavanjem (za vlasnike koji žive daleko od nekretnine)
- **Bez kontakt forme** — klijent ne želi formu. Kontakt = telefon + email + Instagram
- **Telefon**: 061 18 30 866
