---
title: 'WAS Notes: WCAG 1.1 Text Alternatives | Writing | Dustin Whisman'
description: How do you meet the success criteria for WCAG 1.1 Text Alternatives?
articleTitle: 'WAS Notes: WCAG 1.1 Text Alternatives'
layout: default
date: 2023-01-25
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 1.1 Text Alternatives

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 1.1.1 Non-text Content - Level A

All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except in some situations where the content is purely decorative and should be ignored by assistive technology.

### How to Succeed

We have these tools at our disposal to provide non-text alternatives to users.

- `aria-label`: use for short descriptions
- `aria-labelledby`: use to associate an element to text that is visible elsewhere, can reference multiple elements, should be concise
- `aria-describedby`: similar to `aria-labelledby`, but for longer, more detailed descriptions
- `alt` text: use to describe images or leave as `alt=""` if purely decorative. Can also be used on `area` elements in `map` elements that describe sections of images, as well as `applet` elements
- For groups of images where one description suffices, use the `alt` text of one, then leave the others `alt=""`
- Body text for `object` elements
- Long descriptions that serve the same purpose of the non-text content, e.g. a table of data that matches data shown in a chart/graph
- Links to long descriptions, provided the link is near the non-text content, e.g. a chart followed by a link to a page or section of the current page that describes the chart
- Many of the previous techniques can be used to set the accessible name of links and buttons
- `for`/`id` relationships between `label` and `input` elements
- `title` as a last resort if you can’t do the other things (you probably can, though)
- CAPTCHA alternatives
  - Describe the purpose of the CAPTCHA and include instructions for the other modality
  - Provide a different modality for the CAPTCHA, such as audio instead of images
- Include purely decorative images with CSS instead of `img` tags, or use `alt=""` and omit the `title` attribute

### How to Fail

Do any of these things to instantly fail this criterion.

- Use CSS to include images that convey important information
- Provide insufficient descriptions that leave out important information
- Don’t update text alternatives when the non-text content changes
- Omit the `alt` attribute on `img` tags
- Include useless alt text, such as `alt="image"`
- Provide text alternatives that convey completely different information or serve different purposes
- Use ASCII art or text look-alikes without providing text alternatives, such as `aria-label`
