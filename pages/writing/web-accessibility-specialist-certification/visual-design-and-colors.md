---
title: "WAS Notes: Visual Design and Colors | Writing | Dustin Whisman"
description: "What are the accessibility considerations related to visual design and colors?"
articleTitle: "Visual Design and Colors"
layout: default
date: 2023-02-28T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Visual Design and Colors

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Color

- Color alone is not enough to convey information, and text is color’s best friend
- Don’t reference things by color, especially for things like alt text where color is irrelevant
- In addition to color changes, links should be underlined, and additional hover/focus styling is encouraged
- To distinguish colors from each other, the contrast ratio needs to be at least 3:1
- Using actual text instead of images of text allows users to adjust the color of the text

## Contrast

- There are 3 times as many people with low vision than people with total blindness
- Nearly 8% of men and 0.4% of women have some sort of color blindness
- The ratios to remember are 4.5:1 and 3:1 for small and large text respectively, with the cutoff being 18-point or 14-point bold text
- Interactive elements (buttons and form controls), active states (focus indicators), and graphics also need a contrast ratio of at least 3:1
- It’s best practice to test against Windows High Contrast themes (one light, one dark)
- The `-ms-high-contrast` media feature and `-ms-high-contrast-adjust` property are available, but they shouldn’t be used–doing so would prevent users from customizing their experiences

## Visual Layout

- White space (a.k.a. negative space) is your friend–things get hard to understand when crammed together
- Labels should be visually adjacent to their controls
- It’s best to have _one_ main visual focus–too many things competing for your attention is a nightmare

## Target Size

- The ideal touch target size is at least 44 pixels by 44 pixels with at least 6 pixels between interactive elements
- The minimum touch target size is 24 pixels by 24 pixels, with these exceptions:
  - The spacing between interactive elements is at least 24 pixels
  - There is an equivalent control elsewhere on the page that does meet the size requirements
  - The target is inline in a sentence or block of text
  - The user agent set the size, not the author
  - The presentation is essential or legally required (when would that happen?)

## Reading Order, Focus Order

- CSS positioning or changing the flex order can break the reading order
- Adding elements dynamically before the user’s focus can result in content being missed
- Do not use `tabindex` with positive values because it can break the focus order (only use `0` or `-1`, please)
- DOM order is the best order

## Typography

- Avoid fancy fonts, since they can be hard to read
- Serif fonts have a slight readability advantage over sans-serif fonts since uppercase ‘I’ will be less likely to be confused with lowercase ‘l’
- Line spacing in paragraphs should be between 1.5 and 2, and spacing between paragraphs should be between 1.5 and 2 times larger than the line spacing
- Limit lines of text to 80 characters (or 40 for CJK languages)
- Do not fully justify text–the rivers of white space are distracting

## CSS-Generated Content and Hidden Content

- CSS-generated content is not consistently read by screen readers–best to avoid it if possible
- If using CSS-generated content, make sure there is a text alternative and that the content is `aria-hidden="true"`
- Visually hidden content should be used cautiously
- Content that is meant to be visually hidden from users, like dialogs, must also be hidden from screen readers (`display: none` or `visibility: hidden` work for this)
- Additional content triggered by hover or focus events must be dismissible, hoverable, and persistent
- Focused elements must not be obscured by other content, like sticky headers or footers
