/* eslint-env node */
require('dotenv').config();
const { defineConfig } = require('cypress');

const sitemapLocations = async () => {
  const res = await fetch(`${process.env.BASE_URL}/sitemap.xml`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  });
  const xml = await res.text();
  const locations = [
    ...xml.matchAll(/<loc>(.|\n)*?<\/loc>/g),
  ].map(([loc]) => loc.replace('<loc>', '').replace('</loc>', ''));
  return locations;
};

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    chromeWebSecurity: false,
    setupNodeEvents: async (on, config) => {
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message);

          return null;
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message);

          return null;
        },
      });

      const pages = await sitemapLocations();
      // eslint-disable-next-line no-param-reassign
      config.env.pages = pages;
      return config;
    },
  },
});
