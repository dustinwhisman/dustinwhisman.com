---
title: "WAS Notes: WCAG 1.2.3 Audio Description or Media Alternative (Prerecorded) | Writing | Dustin Whisman"
description: How do you meet WCAG 1.2.3 Audio Description or Media Alternative (Prerecorded)?
articleTitle: "WAS Notes: WCAG 1.2.3 Audio Description or Media Alternative (Prerecorded)"
layout: layout.njk
date: 2023-01-25T00:00:03Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WCAG 1.2.3 Audio Description or Media Alternative (Prerecorded)

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

## Level A

An alternative for time-base media or an audio description is provided for prerecorded synchronized media, unless that media is clearly labeled as an alternative to text.

### How to Succeed

- Provide an alternative for time-based media, such as an audio description or a transcript, and make it clear the alternative is available (put a link next to the media)
- Provide selectable audio tracks that include audio descriptions
- Provide versions of a video with audio descriptions or extended audio descriptions
- Provide a static text alternative when there is no time-based visual information in the video
- `track[kind=description]` is your friend here
