---
title: "WAS Notes: Images, SVGs, and Canvas | Writing | Dustin Whisman"
description: "What are the accessibility considerations to account for when working with images, SVGs, and canvas?"
articleTitle: "Images, SVGs, and Canvas"
layout: default
date: 2023-03-28T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Images, SVGs, and Canvas

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Images

- Alternative text should be programmatically determinable, meaningful, and concise
- For images with lots of important information, include a supplementary long description with the image
  - Use the context of the HTML document (`aria-describedby` can be useful here)
  - Use a disclosure or dialog control to show/hide a long description
  - Link to another page with the long description
  - You still need alt text, and sighted users should be able to see the long description
- The `alt` attribute is the preferred method, but you can technically use `aria-label`, `aria-labelledby`, or `title` (but don’t use `title`)
- You can use `role="presentation"` instead of `alt=""` (but just use `alt=""`)
- Good alt text conveys the purpose of the image, not just the content
- Don’t use phrases like “an image of” or “a picture showing”–it’s redundant
- Screen readers can’t pause while reading alt text, so keep it short (150 characters)
- Actionable images, like in links or buttons, must have alt text
- Animated images that play automatically and for 5 or more seconds need to be able to be paused, stopped, or hidden (and must not flash more than 3 times per second)
- Avoid using CSS for informative images, but if you must, use `aria-label` or `aria-labelledby` on the element that the image is used on
- Image maps follow the same rules as images, each `area` within the `map` needs to have an `alt` attribute

## SVGs and Icon Fonts

- Use `role="img"` on `svg` tags and when using SVGs in `img` tags to support a wide range of assistive technologies
- Normal alt text rules apply for SVGs in `img` tags
- Use the `title` element in inline SVGs to provide alternative text and link it up to the `svg` tag with `aria-labelledby`
- The `title` element should be the first child of its parent element
- Use `aria-labelledby` to reference all text that needs to be read by screen readers
- Don’t embed SVGs via `object` or `iframe` elements
- Provide long descriptions similar to what you would do for images
- Use the `desc` element for descriptions that are longer than alt text (and hook it up via `aria-labelledby`)
- Limit text in `svg` elements as much as possible
- Check your color contrast, especially for Windows High Contrast Mode
- Animate SVGs with SMIL, CSS, or JavaScript, but not the deprecated `animate` element (and normal animation rules apply)
- Interactive SVGs must be keyboard accessible, touchscreen accessible, and communicate name, role, and value correctly
- Informative icon fonts should be given `role="img"` and `aria-label` attributes
- Decorative icon fonts should be set to `aria-hidden="true"`

## Canvas

- Accessibility has to be added through JavaScript and/or ARIA for `canvas` because it is not accessible to screen readers by default
- If the `canvas` is displaying graphics, use `role="img"`
- All `canvas` elements must have a text alternative, either through ARIA or fallback content within the `canvas`
- Text alternatives should be short, but they can also be supplemented by long descriptions
- Use a background fill color on `canvas` elements, and test with Windows High Contrast Mode
- Consider using SVG instead of `canvas` if your use case is better supported with SVG
- Interactive canvases must be keyboard accessible, touchscreen accessible, and communicate name, role, and value correctly

## Multimedia, Objects, and Documents

- There is no `alt` attribute for `video` or `audio` elements (use transcripts, captions, and/or audio descriptions)
- `object` elements must have alternative text using `aria-label` or `aria-labelledby`
- Avoid non-HTML documents as much as possible, and make sure those documents adhere to accessibility principles
- PDFs have an accessibility API similar to HTML, so make your PDFs accessible (this may require some touching up in something like Acrobat Pro)
- Use EPUB 3 format for EPUB files and ensure you are following accessibility principles
