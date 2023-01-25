---
title: "WAS Notes: WCAG 1.2.1 Audio-only and Video-only (Prerecorded) | Writing | Dustin Whisman"
description: How do you meet WCAG 1.2.1 Audio-only and Video-only (Prerecorded)?
articleTitle: "WAS Notes: WCAG 1.2.1 Audio-only and Video-only (Prerecorded)"
layout: layout.njk
date: 2023-01-25T00:00:01Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WCAG 1.2.1 Audio-only and Video-only (Prerecorded)

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

## Level A

All prerecorded audio-only and video-only media meet the following conditions, unless that media is clearly labeled as an alternative for text.

### How to Succeed

- Provide an alternative for audio-only media, such as a transcript
- Provide an alternative for video-only media, such as a screenplay or a written step-by-step guide for a how-to video
- Provide an audio track that describes visual information in video-only media (the `track` element can be used within `video` elements to provide these audio tracks, including for different languages)

### How to Fail

- Use text alternatives that are insufficient, like file names or non-descriptive text like “Video”
- Provide descriptions that are completely different or don’t serve the same purpose
