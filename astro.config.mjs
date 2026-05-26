// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://despotnekretnine.rs',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      customPages: [
        'https://despotnekretnine.rs/',
        'https://despotnekretnine.rs/usluge',
        'https://despotnekretnine.rs/o-nama',
        'https://despotnekretnine.rs/kontakt',
        'https://despotnekretnine.rs/dokumentacija',
        'https://despotnekretnine.rs/en',
        'https://despotnekretnine.rs/en/usluge',
        'https://despotnekretnine.rs/en/o-nama',
        'https://despotnekretnine.rs/en/kontakt',
        'https://despotnekretnine.rs/en/dokumentacija',
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
