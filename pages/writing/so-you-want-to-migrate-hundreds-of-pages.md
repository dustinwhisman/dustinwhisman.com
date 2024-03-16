---
title: "So You Want to Migrate Hundreds of Pages - Writing - Dustin Whisman"
description: "A deep dive into how you can, in a pinch, migrate a ton of content off of a dying CMS before it reaches end-of-life."
articleTitle: "So You Want to Migrate Hundreds of Pages"
layout: default
date: 2023-03-30T00:00:00.000Z
tags:
  - writing
---

# So You Want to Migrate Hundreds of Pages

{% include 'partials/published-date.njk' %}

I recently wrote about [treating MVP as a mindset](/writing/is-mvp-a-deliverable-or-a-mindset), and one of the examples I mentioned was from a recent project where we essentially copy-pasted about 800 pages from an old Content Management System (CMS) so we could statically host them on the client's new system. I want to dig a little deeper into how that worked, at least beyond a few bullet points.

## The Background

Our client had an old CMS that needed its content migrated to their new CMS before the old one reached end-of-life support. The workflow that we were following to migrate content the "right" way was pretty time-consuming, and it was clear that we wouldn't be able to hit the deadline following that process for all the remaining pages.

We had to improvise.

## Maybe Just Copy and Paste the Pages?

View source. Copy. Paste. Job done. 💥

Okay, maybe that's an oversimplification. All of the stylesheets, scripts, images, and other external resources were hosted by their old CMS, so we'd need to find a way to get those, too. But we could use the HTML that's served to browsers as a starting point to migrate the content statically. Who doesn't love a good web scraping script?

## The Migration Script

For each page that we wanted to migrate, we needed to do the following:

1. Fetch the page
1. Parse the HTML
1. Fetch the stylesheets used by the page
1. Fetch the scripts used by the page
1. Fetch the images used by the page
1. Fetch other external resources used by the page
1. Write those external resources to disc
1. Update references to resources in HTML
1. Write the HTML file to disc

Once all of that was done and we'd run the script against the pages we needed, we copied those local files and put them in the `public` folder of the new system's application. I'm hand-waving some redirect rules, but that's basically it.

### Fetching the Page

First things first, we needed the HTML for the page. We used `axios`, but `fetch` would work just as well in supported Node.js versions.

```js
const axios = require('axios');

const migratePages = (pagesToMigrate) => {
  pagesToMigrate.forEach((page) => {
    const { data: html } = await axios.get(page.sourceUrl);
  });
};
```

### Parsing the HTML

Then we needed to parse the HTML into something we could work with, such as being able to call `querySelectorAll` on elements. We used `jsdom` for this.

```js
const jsdom = require('jsdom');
const { DOMParser } = new jsdom.JSDOM('').window;
const parser = new DOMParser();
const parseHtml = (html) => parser.parseFromString(html, 'text/html');

// later
const { data: html } = await axios.get(page.sourceUrl);
const parsedHtml = parseHtml(html);
```

### Fetching Stylesheets

We needed to get any stylesheets referenced by the site. If the `href` attributes pointed to the domain we were interested in or were relative path links, we knew they were hosted by the old CMS. This let us ignore third-party stylesheets that were hosted via CDN.

```js
const getStylesheetUrls = (html) => {
  const stylesheets = html.querySelectorAll(
    'link[rel="stylesheet"][href*="example."],link[rel="stylesheet"][href^="/"]:not([href^="//"])'
  );
  return Array.from(stylesheets).map((stylesheet) => stylesheet.href);
};

// later
const stylesheets = getStylesheetUrls(parsedHtml);
```

### Fetching Scripts

We needed to do the same thing for scripts.

```js
const getScriptUrls = (html) => {
  const scripts = html.querySelectorAll(
    'script[src*="example."],script[src^="/"]:not([src^="//"])'
  );
  return Array.from(scripts).map((script) => script.src);
};

// later
const scripts = getScriptUrls(parsedHtml);
```

### Fetching Images

And again the same thing for images.

```js
const getImageUrls = (html) => {
  const images = html.querySelectorAll(
    'img[src*="example."],img[src^="/"]:not([src^="//"])'
  );
  return Array.from(images).map((image) => image.src);
};

// later
const images = getImageUrls(parsedHtml);
```

### You Get the Idea

We wrote similar helper functions to get icons, manifests, videos, and anything with a `srcset` attribute to get all variations of images for responsive sizing. At this point, our main script looks like this.

```js
const migratePages = (pagesToMigrate) => {
  pagesToMigrate.forEach((page) => {
    const { data: html } = await axios.get(page.sourceUrl);
    const parsedHtml = parseHtml(html);
    const stylesheets = getStylesheetUrls(parsedHtml);
    const scripts = getScriptUrls(parsedHtml);
    const images = getImageUrls(parsedHtml);
    const icons = getIconUrls(parsedHtml);
    const manifests = getManifestUrls(parsedHtml);
    const videos = getVideoUrls(parsedHtml);
    const srcsetUrls = getSrcsetUrls(parsedHtml);
  });
};
```

### Writing Resources to Disc

Now that we had gathered all of those external resources, we needed to write them to disc. Again, I'm hand-waving some details, but the basic idea is to fetch the resources, pick our output directory, and then `fs.writeFileSync()` the files we have to disc.

```js
const fs = require('fs');
const path = require('path');

const writeResourceFiles = async (urls) => {
  urls.forEach((url) => {
    const { data: content } = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    // hand-waving some implementation details here
    const dirPath = getDirectory(url);
    const filePath = path.join(dirPath, getFileName(url));

    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, content);
  });
};

// later
writeResourceFiles([...stylesheets, ...scripts, ...images, ...etc]);
```

### Updating Paths in HTML

We wrote the external resources to disc, but now we need to update our HTML files to reference those new locations by relative path. For that, we more or less just used the `String.prototype.replaceAll()` method.

```js
const replaceUrlsInHtmlFiles = (html, resources) => {
  let processedHtml = html;
  resources.forEach((resource) => {
    // a little more hand-waving
    processedHtml = processedHtml.replaceAll(
      resource,
      getRelativePath(resource)
    );
  });

  return processedHtml;
};

// later
const processedHtml = replaceUrlsInHtmlFiles(html, [
  ...stylesheets,
  ...scripts,
  ...images,
  ...etc,
]);
```

### Writing HTML Files to Disc

We needed to write the updated HTML files to disc. One important detail here is that we wanted the paths to match the URLs that we wanted, so `https://example.com/company/about` would end up being written to `dist/company/about/index.html`.

```js
const writeHtmlFile = (page, processedHtml) => {
  const alias = getAlias(page.destinationUrl);
  const dirPath = path.join('dist', alias);
  const filePath = path.join(dirPath, 'index.html');

  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, processedHtml, 'utf-8');
};

// later
writeHtmlFile(page, processedHtml);
```

### Putting it all Together

With all of those pieces in place, our final script ended up looking a little something like this. I'm excluding a lot of project-specific implementation details and error handling, but this is the gist.

```js
const migratePages = (pagesToMigrate) => {
  pagesToMigrate.forEach((page) => {
    const { data: html } = await axios.get(page.sourceUrl);
    const parsedHtml = parseHtml(html);
    const stylesheets = getStylesheetUrls(parsedHtml);
    const scripts = getScriptUrls(parsedHtml);
    const images = getImageUrls(parsedHtml);
    const etc = getOtherResources(parsedHtml); // hand-waving
    writeResourceFiles([...stylesheets, ...scripts, ...images, ...etc]);

    const processedHtml = replaceUrlsInHtmlFiles(html, [
      ...stylesheets,
      ...scripts,
      ...images,
      ...etc,
    ]);
    writeHtmlFile(page, processedHtml);
  });
};
```

## The `dist` Folder

By running the migration script, the files were written to the `dist` folder. At this point, you could serve `dist` with a local file server and have a functioning set of pages.

We ran `backstop` against the site running locally vs. production for the pages we needed to make sure we didn't introduce any visual regressions, and we spot-checked pages that had more interactivity to check that no carousels or accordions broke along the way.

Once that was clear, we copied the contents of `dist` over to the `public` folder of the new site's application, put up a pull request, and passed it along to quality assurance to check everything out.

## 🚨 Edge Case City 🚨

I've oversimplified to keep this brief, but we had to deal with a _lot_ of edge cases. Here's a summary:

- Updating `hreflang` URLs
- Handling images loaded via CSS
- Replacing forms that depended on the old CMS
- Finding localized versions of the page that weren't planned for migration
- Keeping track of which pages had already been migrated
- Writing CSV/JSON reports to track any errors that happened during migration
- So much routing and redirect logic

## The Final Result

After accounting for edge cases and fixing some bugs, this process went surprisingly smoothly after all the files were copied over. The biggest headache wasn't even related to the content–it was mostly routing logic that was caused by a complicated server setup.

The pages weren't broken, partly because we specifically ran this against pages without back-end dependencies, but also because we managed to get a one-to-one copy of each page pretty reliably. Would I recommend this approach for every CMS migration? No. But it did a pretty good job given the constraints of the project.

It also gave me a greater appreciation of all the work that browsers do when they render a page. Do you know how many different ways you can show an image on the page? It's bonkers how much browsers need to account for, and I only got a taste of it from what I needed to handle in the script.

With all that said, maybe don't try this at home. If you have better options for migrating content, go with those before resorting to this sort of web scraping trickery.
