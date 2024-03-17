---
title: 'WCAG 1.2 Time-based Media - WAS Notes - Writing - Dustin Whisman'
description: How do you meet all of the success criteria for WCAG 1.2 Time-based Media?
articleTitle: 'WCAG 1.2 Time-based Media'
layout: default
date: 2023-01-26
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 1.2 Time-based Media

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

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

## 1.2.4 Captions (Live) - Level AA

Captions are provided for live audio content in synchronized media.

### How to Succeed

- Create captions using stenographic/rapid typing techniques or speech-to-text with correction
- Provide open captions (always on)
- Provide closed captions (user selectable)

## 1.2.5 Audio Description (Prerecorded) - Level AA

Audio description is provided for all prerecorded synchronized video content.

This is very similar to 1.2.3, but without the condition that you can provide a text alternative. This is more strict and applies whether there’s a text version or not.

### How to Succeed

- Provide selectable audio tracks that include audio descriptions
- Provide versions of a video with audio descriptions or extended audio descriptions
- Provide a static text alternative when there is no time-based visual information in the video
- `track[kind=description]` is your friend here

## 1.2.6 Sign Language (Prerecorded) - Level AAA

Sign language interpretation is provided for all prerecorded audio content in synchronized media.

### How to Succeed

- Include a sign language interpreter in the video
- Provide a synchronized video of a sign language interpreter that is separate from the original video

## 1.2.7 Extended Audio Description (Prerecorded) - Level AAA

When foreground audio is too dense to allow for audio descriptions, extended descriptions are provided for prerecorded video.

Extended audio descriptions temporarily pause the video to make space for descriptions of the necessary visual information.

### How to Succeed

Provide an extended audio description—simple enough.

## 1.2.8 Media Alternative (Prerecorded) - Level AAA

An alternative for time-base media is provided for all prerecorded synchronized or video-only media.

### How to Succeed

Provide alternatives, such as transcripts, screenplays, written instructions, etc.

### How to Fail

Don’t label the media as an alternative to text (as in a video that repeats the same information as text on the page).

## 1.2.9 Audio-only (Live) - Level AAA

An alternative for live audio-only content is provided.

### How to Succeed

- Provide written materials if the audio is scripted, like a prepared speech or scripted content
- Use stenographic/rapid typing techniques or speech-to-text with corrections
- Use a live audio captioning service
