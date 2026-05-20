# CLAUDE.md — Kontekst projekta za AI asistente

## Ko je klijent

**Despot nekretnine** — agencija za posredovanje u kupovini, prodaji i iznajmljivanju nekretnina, bazirana u Beogradu. Instagram: [@_prodaja_nekretnina_](https://www.instagram.com/_prodaja_nekretnina_/).

Brend je luksuznog karaktera: crna pozadina, zlatni akcenti, minimalistički stil — direktno preuzeto sa Instagram identiteta klijenta.

## Šta je urađeno

- Kompletan Astro projekat sa Tailwind CSS v4
- Dizajn sistem (crna + zlatna paleta, Montserrat font)
- Header sa pravim logo fajlom (`public/logo.jpg`), sticky + scroll efekat, mobilni hamburger
- Footer sa 4 kolone
- Homepage: Hero, Usluge grid, Zašto mi, Kontakt kanali sekcija
- Kontakt stranica: samo kontakt info, bez forme
- Dokumentacija stranica: lista PDF-ova za preuzimanje
- Placeholder stranice: `/usluge`, `/o-nama`
- Custom 404
- `.htaccess` za cPanel (HTTPS redirect, cache headers, sigurnosni headeri)

## Pravila koja MORA da se poštuju

- **Bez ćirilice** na sajtu. Jedini izuzetak je logo slika (`logo.jpg`) koja je originalni fajl klijenta. Svuda drugde piše se `Despot nekretnine` latinicom.
- **Bez kontakt forme** — klijent ne želi formu. Kontakt je isključivo: telefon, email, Instagram.
- **Boje se ne menjaju** bez dogovora sa klijentom. Zlatna `#c9a84c` je direktno uzeta sa loga.
- **Font je Montserrat** — jedini font. Nema mešanja serif/sans-serif.

## Centralni config fajl

`src/data/site.ts` — svi podaci o sajtu (naziv, kontakt, navigacija, social). **Ovo je jedino mesto gde se menja naziv, broj telefona, email, adresa, nav linkovi.** Ne hardkodovati ove vrednosti direktno u komponente.

## Arhitektura komponenti

```
Button.astro   → prop: variant ("gold-fill" | "outline" | "ghost"), size ("sm"|"md"|"lg")
Badge.astro    → prop: variant ("gold" | "outline" | "default")
SectionTitle.astro → props: eyebrow, title, subtitle, align ("left"|"center")
Header.astro   → koristi logo.jpg direktno, ne SVG
Footer.astro   → koristi logo.jpg direktno, ne SVG
BaseLayout.astro → prima: title, description, image, noIndex
```

## Stranice koje čekaju sadržaj

Klijent još nije dostavio sadržaj za:
- `/usluge` — treba: lista usluga sa opisima, eventualno cenovnik ili paketi
- `/o-nama` — treba: opis agencije, tim, istorijat, možda fotografije

Oba fajla imaju postavljenu page-hero strukturu, samo nedostaje telo sekcije.

## Dokumenti

PDF fajlovi za stranicu `/dokumentacija` idu u `public/dokumenti/`. Lista se uređuje direktno u `src/pages/dokumentacija.astro` — promenljiva `documents` na vrhu fajla. Trenutno su placeholder nazivi fajlova.

## Hosting

cPanel. Deploy = upload sadržaja `dist/` foldera nakon `npm run build`. `.htaccess` je već u `public/` i kopira se automatski u `dist/` pri buildu.

## Moguće buduće proširenje

Klijent je napomenuo da bi sajt u budućnosti mogao da komunicira sa nekim API-em ili backendom (npr. lista nekretnina, filter pretraga). Astro podržava SSR mode (`output: 'server'`) i integraciju sa React/Vue ostrvima ako zatreba dinamika. Za sada ostaje `output: 'static'`.

## Kako pokrenuti

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # output u ./dist/
```
