---
title: "WAS Notes: WCAG 1.2.2 Captions (Prerecorded) | Writing | Dustin Whisman"
description: How do you meet WCAG 1.2.2 Captions (Prerecorded)?
articleTitle: "WAS Notes: WCAG 1.2.2 Captions (Prerecorded)"
layout: layout.njk
date: 2023-01-25T00:00:02Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WCAG 1.2.2 Captions (Prerecorded)

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

## Level A

Captions are provided for audio content in synchronized media, unless the media is clearly labeled as an alternative for text.

### How to Succeed

- Provide open captions (always visible)
- Provide closed captions (can be activated by the user)
- Techniques for video players differ, but for the `video` element in HTML, the `track` element works

### How to Fail

- Omit some dialogue or important sound effects from captions
- Omit captions entirely when there is no suitable text alternative
- Don’t label the video as an alternative to text when they both communicate the same information
