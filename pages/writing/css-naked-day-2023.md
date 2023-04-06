---
title: "CSS Naked Day 2023 | Writing | Dustin Whisman"
description: "In which I describe what I did to prepare for CSS Naked Day for 2023 and ideally every year beyond it by using edge functions."
articleTitle: "CSS Naked Day 2023"
layout: default
date: 2023-04-09T00:00:00.000Z
tags:
  - writing
---

# CSS Naked Day 2023

{% include 'partials/published-date.njk' %}

April 9th is [CSS Naked Day](https://css-naked-day.github.io/), which is a day to promote web standards. If your site has a good hierarchical structure and uses semantic elements and valid HTML, then your site should still be usable and readable! I understand if you don't like it, though, so feel free to [turn CSS back on](?css=on).

Now, I could have released an update to the site to remove CSS at midnight, then rolled it back the next day, but I love a good two-for-one, so I decided to use this opportunity to try out Edge Functions to handle removing CSS automatically if it's April 9th, regardless of the year. I added support for query params to override the CSS settings, though, so you can still see the CSS-ified version if you want to (or if you don't want CSS on any other day).

I also put in some logic to handle the awkward period between New Year's Day and the first time the site is built during the year when the little copyright date in the footer says the wrong number. A tiny client-side script would have worked for this, but why not make a server do it?

## Using the Netlify CLI

Currently, Eleventy only supports Netlify's implementation of Edge Functions, which is lucky for me since that's my hosting provider anyway. But to test out my Edge Functions locally, I'd need to alter my development setup to use the Netlify CLI.

I initially installed the `netlify-cli` npm package locally so I could keep it up to date and use the up-to-date version in my npm scripts, but I ran into issues with it not playing nice with GitHub Actions. I ended up going the `npx` route so I wouldn't have to deal with keeping a globally installed version updated.

My updated `start` script now looks like `npx netlify dev -c \"eleventy --serve --incremental\"`. This runs `netlify dev`, which handles all the Netlify stuff (Edge Functions), and then runs my existing `eleventy` script so the behavior is the same as it was before.

Annoyingly, the Netlify CLI opens Chrome (not my default browser) automatically when it starts running, so I opted to disable that in my brand-new `netlify.toml` file.

```toml
[dev]
  autoLaunch = false
```

## Configuring Eleventy to Use Edge Functions

It took very little configuration to get started with Edge Functions. All I needed to do was import and add the plugin in my `.eleventy.js` file, then point the `netlify.toml` file to the right place (and update `.gitignore`, but that's not important).

```js
// .eleventy.js
const { EleventyEdgePlugin } = require('@11ty/eleventy');

// later
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyEdgePlugin);

  // other configuration stuff
};
```

```toml
# netlify.toml
[[edge_functions]]
  function = "eleventy-edge"
  path = "/*"
```

The first time I ran `npm start` after updating the config, a new folder was added with an example Edge Function that doesn't do much of anything.

```js
import {
  EleventyEdge,
  precompiledAppData,
} from "./_generated/eleventy-edge-app.js";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    edge.config((eleventyConfig) => {
      // Add some custom Edge-specific configuration
      // e.g. Fancier json output
      // eleventyConfig.addFilter("json", obj => JSON.stringify(obj, null, 2));
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
```

## Making the Edge Function Useful

In the `edge.config` handler, you can add global data for Eleventy to use, so I decided to add a few global variables that I could check to handle the use cases I had in mind:

1. `isCssNakedDay` to determine whether the current day is April 9th
2. `currentYear` to keep my copyright date accurate between builds
3. `cssPreference` to handle enabling or disabling CSS with a query parameter

### Is Today CSS Naked Day?

I started by implementing a function to check whether the current day was April 9th. The only noteworthy detail here is that `getMonth()` is indexed starting with 0, so 0 is January, but `getDate()` starts with 1, so 1 is the first day of the month (the `Date` object is such a headache to work with sometimes).

```js
// is today April 9th?
const isCssNakedDay = () => {
  const today = new Date();
  if (today.getMonth() !== 3) {
    return false;
  }

  if (today.getDate() !== 9) {
    return false;
  }

  return true;
};
```

### What Year Is It?

The implementation for getting the current year is pretty simple. It's an open question of whether the result will match a user's timezone, though, since presumably `new Date()` will be relative to wherever the Edge Function is run. Ideally, that's geographically close to the user, but I expect a little bit of inaccuracy here. The same goes for the April 9th check, since it will be April 9th _somewhere_ on Earth for 48 hours. A little inaccuracy is fine for these scenarios, though.

```js
// handle the gap between January 1st and the first build of the year
const currentYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  return year;
};
```

### Does the User Have an Explicit CSS Preference?

I wanted to provide a mechanism to allow users to load CSS if they want to on CSS Naked Day, but also to turn it off on other days if they felt like it (most likely I'd be the only person who would do this). I figured a query parameter would be the easiest way to do this, and I made it flexible to accept pseudo-falsy values, like "off"/"on", "no"/"yes", "false"/"true", and "0"/"1". If they didn't specify a query param or used an unexpected value, then I would go with the default behavior for the day.

```js
const getCssPreference = (request) => {
  const url = new URL(request.url);

  switch (url.searchParams.get('css')) {
    case 'false':
    case 'no':
    case 'off':
    case '0':
      return false;
    case 'true':
    case 'yes':
    case 'on':
    case '1':
      return true;
    default:
      return null;
  }
};
```

### Setting the Global Data

With those functions at the ready, I used them to set some global data variables for Eleventy to use later in its templates.

```js
edge.config((eleventyConfig) => {
  eleventyConfig.addGlobalData('isCssNakedDay', isCssNakedDay());
  eleventyConfig.addGlobalData('currentYear', currentYear());
  eleventyConfig.addGlobalData('cssPreference', getCssPreference(request));
});
```

It's just that easy!

## Updating Templates

The last thing to do was to use the data from the Edge Function in my layout template since that's where all the relevant bits of code already were.

For the logic to load CSS or not, the template will now look for the CSS preference first, and if it's explicitly `false`, it will not load CSS. Otherwise, it checks for whether it's CSS Naked Day or if there's an explicitly `true` CSS preference.

```html
{% raw %}{% edge %}
  {% if cssPreference == false %}
  {% elseif not isCssNakedDay or cssPreference == true %}
    <link rel="stylesheet" href="/styles.css">
  {% endif %}
{% endedge %}{% endraw %}
```

In the main content of the page, I wanted to include a paragraph explaining why the site looks how it does on CSS Naked Day, so I set that up as well.

```html
{% raw %}{% edge %}
  {% if isCssNakedDay and cssPreference != true %}
    <p aria-hidden="true">Today is <a href="https://css-naked-day.github.io/">CSS Naked Day</a>, so if you're confused about why the site looks how it does, that's why! To <a href="?css=on">view this page with CSS</a>, you can append "?css=on" to the page's URL.</p>
  {% endif %}
{% endedge %}{% endraw %}
```

Last up is setting the `currentYear` in the footer! I had to specify "njk" as the desired template language, otherwise, on pages that were originally written in Markdown, the year would get wrapped in a `p` tag unnecessarily.

```html
© Copyright {% raw %}{% edge "njk" %}{{ currentYear }}{% endedge %}{% endraw %}
```

## Papercuts

The result is mostly working how I want it to, but it wasn't a completely smooth process to get there. The documentation can be a little abstract and hard to follow at times, so it took some trial and error to get things right, and I wish the example for adding global data was more prominent.

Setting the "njk" on one of the `edge` blocks was a bit of a gotcha, since I did not expect the behavior to vary depending on which templating language was used to build the page. Since my layout file is `layout.njk`, I would have assumed that it would always be treated as "njk", so maybe that's a bug?

Also, It would be great if there was a fallback for cases where the Edge Function fails or is unavailable (this happens a lot during hot reloading). The ideal default behavior for me would be to load CSS, show the build-time year in the footer, and not render the CSS Naked Day paragraph. Right now, there are only hacky ways to handle this, but a standard solution like `{% raw %}{% edgefallback %}{% endraw %}` would be nice.
