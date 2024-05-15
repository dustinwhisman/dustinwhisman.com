---
title: "Semantic Structure and Navigation - WAS Notes - Writing - Dustin Whisman"
description: "What are the best practices for writing semantic markup that is as accessible as possible?"
articleTitle: "Semantic Structure and Navigation"
layout: default
date: 2023-04-06T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Semantic Structure and Navigation

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Page Title

- You need to have a `title`, which is the first thing screen reader users hear
- The page `title` must change when the URL changes (especially important for client-side routing scenarios)
- Every `title` should be unique, with the most unique information first
- The `title` should be very similar to the top heading in the main content

## Language

- The `lang` attribute on the `html` tag is not optional! Use it!
- Two-letter codes are the best supported, such as `lang="en"` or `lang="de"`
- Use `lang` attributes on inline language changes, like quoting French

## Landmarks

- Semantic landmark tags are `header`, `nav`, `main`, `footer`, `aside`, `section`, `article`, and `form`
- `role="search"` is another landmark, but it has no semantic equivalent (at time of writing, I think `search` is being proposed as an element)
- `section` is listed as a landmark usually only when combined with `aria-label` or `aria-labelledby`
- Only JAWS lists `article` as a landmark
- `form` elements are only listed as landmarks if they have `role="form"`
- Text should not live outside of landmark regions
- Use `aria-label` or `aria-labelledby` to distinguish different landmarks of the same type, such as `nav`
- There should only ever be one of each of these landmarks
  - `header` or `role="banner"`
  - `main` or `role="main"`
  - `footer` or `role="contentinfo"`
- You probably don’t need more than about 5 or so landmarks, and having too many will frustrate your users

## Headings

- If it visually looks like a heading, it should probably be a semantic heading (`h1`-`h6`)
- The structural outline of the page should be clear from reading just the headings
- Don’t skip levels! If you’re building a reusable component that could appear anywhere, the heading level had better not be hard-coded
- In general, the first thing in the `main` should be an `h1`
- Only include one `h1` per page (there are a few nuanced cases where more is fine, but basically just don’t)

## Links

- If you *****must***** retrofit legacy code that doesn’t use semantic links, you can use `role="link"` and `tabindex="0"` (but even so, you need to make the mouse click and enter key work with JavaScript)
- Links take you places, buttons make things happen, and using them interchangeably can confuse screen reader users
- Link text should indicate the purpose of the link on its own (looking at you, “read more” links)
- Indicate when a link will open in a new window or tab, both visually and in the accessible text (but maybe don’t use `target="_blank"` unless you have a very good reason to)
- Links to documents should indicate the document type, like PDFs
- Links should be distinct from surrounding text, and not by color alone
- Don’t wipe out your links’ focus styles

## Navigation Between Pages

- Navigation lists should be `nav` elements or have `role="navigation"`
- Wrap `ul` elements with `nav` instead of setting `role="navigation"` on the `ul` to avoid wiping out the list semantics
- The currently active page’s link should be visually distinct from the other navigation links (`aria-current` is great for this)
- Navigation patterns that are repeated on multiple pages must be presented in the same order

## Navigation Within Pages

- Provide “skip” links to bypass navigation and repeated elements
- The “skip to main content” link should be the first focusable element on the page, and either visible all the time or on keyboard focus
- For long pages, consider adding a table of contents that accurately matches the structure of the page
- The DOM order is the reading order, so don’t get too clever with absolute positioning or flexbox reordering
- Do not use positive `tabindex` values
- If you have single-character-key shortcuts, provide options to turn them off, re-map them, or only let them work when specific components are focused
- In pagination, use `aria-current` and visual styling to let users know which page they’re on

## Tables

- Use `caption` elements, `aria-label`, or `aria-labelledby` to label your tables (this is extra useful for screen readers to distinguish multiple tables from each other)
- Table headers must use `th` tags, and it is helpful to include the `scope` attribute to be extra explicit
- Complex structures will be harder for screen readers to interpret, so simplify as much as possible, and make sure you use `scope="rowgroup"`, `scope="colgroup"`, and `id`/`headers` attributes responsibly
- Don’t nest tables, it’s a bad idea
- Summaries may be helpful for complex tables, or to provide the gist
- If for some reason, you find yourself working with a layout table, put `role="presentation"` on it, and make sure you aren’t using the `caption` or `th` elements or the `summary`, `scope`, or `headers` attributes in your markup

## Iframes

- The `iframe` element must have a non-empty `title` attribute that is accurate, descriptive, and unique within the page
- The source page must have a valid, meaningful `title` element as well (mostly for JAWS)
- The contents of the iframe are treated as part of the same document as the parent page, so the heading hierarchy should be consistent between page/iframe, if possible
- Hide iframes that don’t have meaningful content with `aria-hidden="true"`

## Miscellaneous

- `strong` and `em` are generally ignored by screen readers by default, so emphasis should be conveyed visually or in a text-based format if it’s essential
- Use `blockquote` for long, block-level quotations
- `q` is ignored by screen readers, so use normal quotation characters instead
- Inline code should use the `code` element (even though screen readers ignore it) and be stylized to be visually distinct from its surrounding text
- Blocks of code should be formatted with the `pre` element
- Use `del` for strike-through with caution, since screen readers won’t announce that the text has been deleted—use a text-based alternative with hidden text or something to convey the correct meaning
- `ins` is the same for inserted text, screen readers will ignore it, so provide a text-based alternative
- Use `mark` for highlighting text, but again, screen readers ignore it

## Parsing and Validity

Even though the 4.1.1 Parsing success criterion is being deprecated in WCAG 2.2, I’m still going to cover it, since it’s still best to write valid markup, sheesh.

- Use complete start and end tags
- IDs and names of landmarks must be unique within a page
- Adhere to allowed parent-child relationships of elements (no floating `li` elements outside of `ul` elements, for example)
- Don’t use deprecated markup like `blink` or `marquee` tags
- Use a [validator](http://validator.w3.org/) to check built pages

{% include 'partials/article-pagination.njk' %}
