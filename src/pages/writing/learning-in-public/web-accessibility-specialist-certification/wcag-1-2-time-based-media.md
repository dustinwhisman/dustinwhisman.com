---
title: "WAS Notes: WCAG 1.2 Time-based Media | Writing | Dustin Whisman"
description: How do you meet all of the success criteria for WCAG 1.2 Time-based Media?
articleTitle: "WAS Notes: WCAG 1.2 Time-based Media"
layout: layout.njk
date: 2023-01-26T00:00:00Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WCAG 1.2 Time-based Media

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

## 1.2.1 Audio-only and Video-only (Prerecorded) - Level A

All prerecorded audio-only and video-only media meet the following conditions, unless that media is clearly labeled as an alternative for text.

### How to Succeed

- Provide an alternative for audio-only media, such as a transcript
- Provide an alternative for video-only media, such as a screenplay or a written step-by-step guide for a how-to video
- Provide an audio track that describes visual information in video-only media (the `track` element can be used within `video` elements to provide these audio tracks, including for different languages)

### How to Fail

- Use text alternatives that are insufficient, like file names or non-descriptive text like “Video”
- Provide descriptions that are completely different or don’t serve the same purpose


## 1.2.2 Captions (Prerecorded) - Level A

Captions are provided for audio content in synchronized media, unless the media is clearly labeled as an alternative for text.

### How to Succeed

- Provide open captions (always visible)
- Provide closed captions (can be activated by the user)
- Techniques for video players differ, but for the `video` element in HTML, the `track` element works

### How to Fail

- Omit some dialogue or important sound effects from captions
- Omit captions entirely when there is no suitable text alternative
- Don’t label the video as an alternative to text when they both communicate the same information

## 1.2.3 Audio Description or Media Alternative (Prerecorded) - Level A

An alternative for time-base media or an audio description is provided for prerecorded synchronized media, unless that media is clearly labeled as an alternative to text.

### How to Succeed

- Provide an alternative for time-based media, such as an audio description or a transcript, and make it clear the alternative is available (put a link next to the media)
- Provide selectable audio tracks that include audio descriptions
- Provide versions of a video with audio descriptions or extended audio descriptions
- Provide a static text alternative when there is no time-based visual information in the video
- `track[kind=description]` is your friend here
