---
title: 'Eleventy Starter: HTML | Writing | Dustin Whisman'
description: This article goes into detail about setting up HTML layouts and page structures using Eleventy, as well as setting up an HTML linter to check for accessibility issues.
articleTitle: 'Building an Eleventy Starter Template: HTML'
layout: default
date: 2022-05-18
tags:
  - writing
  - eleventy starter template
---

# Building an Eleventy Starter Template: HTML

<p class="cmp-fine-print">
  This was originally published on the
  <a href="https://sparkbox.com/foundry">Sparkbox Foundry</a>.
  You can read
  <a href="https://sparkbox.com/foundry/building_an_eleventy_starter_template_with_flexible_html_linting_accessibility">the article on the Foundry</a>
  or go to the
  <a href="https://sparkbox.com/foundry/series/building_an_eleventy_starter_template">landing page for the whole series</a>.
</p>

{% include 'partials/published-date.njk' %}

In the [last part of this series](../eleventy-starter-structure), we set up our initial project structure and configuration, and we created a minimal HTML layout that can be shared between different pages. In this article, we will make that HTML layout more flexible and dynamic, so we can modify it as needed on a page-by-page basis.

If you just want to see the code (or use the starter template), you can find the repo at [https://github.com/dustin-jw/eleventy-starter](https://github.com/dustin-jw/eleventy-starter). You can also see a snapshot of what the codebase looks like after following the steps in this article by going to the [html branch](https://github.com/dustin-jw/eleventy-starter/tree/html).

## Making Our HTML Layout Dynamic

Previously, we created a `layout.njk` file with our HTML structure and an `index.md` file with [front matter](https://www.11ty.dev/docs/data-frontmatter/) defining a title and description:

```md
---

title: Home Page
description: This is the home page. It isn't very interesting right now.
layout: layout.njk
—--
```

However, our `layout.njk` has static values for title and description, so the ones we defined in `index.md` won’t show up in our built HTML. Let’s fix that.

Nunjucks uses curly braces, similar to Handlebars, Vue, or Angular, to include dynamic content. If we change the `title` and meta description tags, we’ll be able to reference those front matter variables in the layout. Here’s our updated `layout.njk` file:

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>{% raw %}{{ title }}{% endraw %}</title>
    <meta name="description" content="{% raw %}{{ description }}{% endraw %}" />

    <!-- TODO: add link tags, other meta tags, open graph info, etc. -->
  </head>
  <body>
    <!-- TODO: make the header and footer overridable -->
    <header>
      <p>This is the header.</p>
    </header>
    <main>{% raw %}{{ content | safe }}{% endraw %}</main>
    <footer>
      <p>This is the footer.</p>
    </footer>
  </body>
</html>
```

Now, if we run `npm start` and inspect the output `index.html` or visit `http://localhost:8080`, we should see the title and description that we set in the front matter of `index.md`.

We can create another page to further test how dynamic our titles and descriptions are. Let’s call it `about.md`.

```md
---
title: About
description: This is the about page. You might put biographical information here if it's for a personal website or portfolio.
layout: layout.njk
---

# About

This is the About page. You may not want or need this, so feel free to delete it if it isn't useful to you!
```

If you visit `localhost:8080/about`, you should see this new About page, and you can inspect it to make sure the title and description are accurate.

So far, we’ve only changed simple text. How about more complicated markup?

## Using Blocks

For something like the `header` and `footer` that we want to be dynamic, we can use Nunjucks blocks to override them at the page level. We will also need a block for our main content. Let’s define the blocks in our layout partial.

```hbs
{% raw %}<body>
  {% block header %}
    <header>
      <p>This is the header.</p>
    </header>
  {% endblock %}
  <main>
    {% block content %}
      {{ content | safe }}
    {% endblock %}
  </main>
  {% block footer %}
    <footer>
      <p>This is the footer.</p>
    </footer>
  {% endblock %}
</body>{% endraw %}
```

By wrapping our dynamic blocks this way, the default markup and content will be used unless we override the blocks from somewhere else. To do that, however, we have to use `.njk` files (instead of `.md` like we’ve been using), and we have to extend our layout instead of specifying it in front matter.

Let’s change `about.md` to `about.njk`, and let’s add a `contact.njk` file for contrast. In the About page, we’ll override the header and footer with page-specific content.

```hbs
--- title: About description: This is the about page. You might put biographical
information here if it's for a personal website or portfolio. --- {% raw %}{%
extends 'layout.njk' %} {% block header %}
<header>
  <p>
    This header has custom content specific to the current page.
  </p>
</header>
{% endblock %} {% block footer %}
<footer>
  <p>
    This footer has custom content specific to the current page.
  </p>
</footer>
{% endblock %} {% block content %}
<h1>About</h1>

<p>
  This is the About page. You may not want or need this, so feel free to delete
  it if it isn't useful to you!
</p>
{% endblock %}{% endraw %}
```

The Contact page will use Nunjucks for templating, but it won’t use blocks. Note that we can define the layout in front matter instead of using Nunjucks’ `extend` feature.

```html
---
title: Contact Page
description: This is the contact page. You might use this to provide methods for people to get in touch with you.
layout: layout.njk
---

<h1>Contact Page</h1>

<p>
  This is the Contact Page. If you wanted people to be able to reach you, you
  might provide social media handles, an email address, a physical address, or a
  phone number.
</p>
```

Now if we switch between the `/about` page and the `/contact` page, we should see that the header and footer are different for both of them. Note that the order in which we place our blocks doesn’t matter–they will always be rendered in the places defined in the layout.

Blocks unlock a lot of potential possibilities, and later on in this series, we’ll be using them for page-specific styles, scripts, and SEO information.

## Linting and Accessibility

Before we start adding more pages and expanding our HTML, we should set up some linting to ensure that we’re outputting valid, accessible markup. We’ll be using [pa11y-ci](https://github.com/pa11y/pa11y-ci) for this, but feel free to substitute another linting tool if there’s one that you already use for HTML.

We’ll install `pa11y-ci`, then create an `npm` script for linting our HTML output in the `dist` directory.

```sh
npm install --save-dev pa11y-ci
```

In our `package.json`:

```json
"scripts": {
  "start": "eleventy --serve",
  "build": "eleventy",
  "lint:html": "pa11y-ci './dist/**/*.html'"
}
```

If you `npm run lint:html`, you should see some output that pa11y is running against each HTML file found in the `dist` directory, and if all goes well, no issues will be found. However, we’ll want to customize our setup to use the `axe` runner, which uses [`axe-core` by Deque](https://github.com/dequelabs/axe-core) to detect accessibility issues.

Let’s create a configuration file at the root of our project and call it `.pa11yci.json`. We’ll keep it simple for now, but `pa11y` has a lot of [configuration options](https://github.com/pa11y/pa11y#configuration) to choose from, should we need them. For now, we’ll specify the `runners`, using `axe` and `htmlcs` ([HTML_CodeSniffer](https://github.com/squizlabs/HTML_CodeSniffer)).

```json
{
  "defaults": {
    "runners": ["axe", "htmlcs"]
  }
}
```

Now, we’ll need to update our `lint:html` script in `package.json` to use the configuration file we just created.

```json
"scripts": {
  "lint:html": "pa11y-ci -c .pa11yci.json './dist/**/*.html'"
}
```

We can test that this is working as expected by deliberately making our markup inaccessible, and running `npm run lint:html`. For example, if we add a `role="foo"` attribute to our `main` element, we should see errors like “ARIA roles used must conform to valid values.” If we remove the invalid role, rebuild the site, and run `npm run lint:html` again, we should no longer see those errors.

## And There We Have It

Our starter template is starting to come together now. We have a decent HTML structure that we can reuse and extend between pages, and we have linting set up to make sure our HTML stays in good shape.

We’ll be building on top of this foundation throughout the series, starting with CSS in Part Three. See you next time!
