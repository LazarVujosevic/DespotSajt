# CLAUDE.md — Kontekst projekta za AI asistente

## Ko je klijent

**Despot nekretnine** — agencija za posredovanje u kupovini, prodaji i iznajmljivanju nekretnina, bazirana u Beogradu. Instagram: [@_prodaja_nekretnina_](https://www.instagram.com/_prodaja_nekretnina_/).

Brend je luksuznog karaktera: crna pozadina, zlatni akcenti, minimalistički stil — direktno preuzeto sa Instagram identiteta klijenta.

## Šta je urađeno

- Kompletan Astro projekat sa Tailwind CSS v4
- Dizajn sistem (crna + zlatna paleta, Montserrat font)
- Header sa pravim logo fajlom (`public/logo.jpg`), sticky + scroll efekat, mobilni hamburger
- Footer sa 4 kolone
- Homepage: Hero (sa motom), Usluge grid (3 kartice), Zašto mi, Kontakt kanali sekcija
- Stranica usluga: 3 kompletne usluge sa punim sadržajem (Prodaja, Iznajmljivanje, Upravljanje izdavanjem)
- Stranica O nama: kompletna (priča, moto, pristup, tim, vrednosti, CTA)
- Kontakt stranica: samo kontakt info, bez forme
- Dokumentacija: 2 PDF-a postavljena, 2 placeholder-a čekaju fajlove
- Politika privatnosti: generička, usklađena sa ZZPL/GDPR — preporučiti pregled pravnika pre lansiranja
- Custom 404
- `.htaccess` za cPanel (HTTPS redirect, cache headers, sigurnosni headeri)
- Responzivnost: plutajuće kartice vidljive na svim uređajima (padding kompenzacija za overflow)
- Homepage hero: dvostubačni layout — tekst lijevo, slika desno (placeholder do prave fotografije)
- Hero slika: dodati `public/hero-nekretnina.jpg` — treba **portrait** fotografija (viša nego šira). Na mobilnom vidljiva ispod teksta, 260px visine.

## Pravila koja MORA da se poštuju

- **Bez ćirilice** na sajtu, uz dva izuzetka:
  1. Logo slika (`logo.jpg`) — originalni fajl klijenta.
  2. Logo tekst pored slike (Header, Footer, i gde god se prikazuje logo) — piše se `ДЕСПОТ некретнине` ćirilicom, jer je to zvanični naziv firme. Ovo je eksplicitni zahtev klijenta.
- Svuda drugde (sadržaj, navigacija, CTA) piše se `Despot nekretnine` latinicom.
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

## Brend — ključne poruke

- **Moto**: *"Mi se bavimo vašim stanom, a vi se bavite vašim danom."* — nalazi se na hero naslovu homepagea, lead rečenici usluge Upravljanje izdavanjem i footer taglineu (`site.ts`)
- **Pozicioniranje**: Nova agencija + tim sa 30+ godina iskustva. Tagline: "Staro znanje, svež pristup."
- **3 usluge**: Prodaja · Iznajmljivanje · Upravljanje izdavanjem
- **Upravljanje izdavanjem** = usluga za vlasnike koji žive van Beograda ili u inostranstvu — potpuno preuzimaju brigu o nekretnini (zakupci, računi, kvarovi, mesečni izveštaj)

## Stranice koje čekaju sadržaj od klijenta

- `/dokumentacija` — još 2 PDF-a čekaju: `opsti-uslovi-poslovanja.pdf` i `cenovnik.pdf` → kopirati u `public/dokumenti/` i ažurirati `size` u `src/pages/dokumentacija.astro`

## Kontakt podaci (pravi)

- **Telefon**: `061 18 30 866` (preuzeto sa Instagram profila)
- **Email/adresa**: još uvek placeholder u `src/data/site.ts` — ažurirati kad klijent dostavi

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
