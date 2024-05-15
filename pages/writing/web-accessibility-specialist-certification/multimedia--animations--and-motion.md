---
title: "Multimedia, Animations, and Motion - WAS Notes - Writing - Dustin Whisman"
description: "What are the accessibility considerations that need to be accounted for related to Multimedia, Animations, and Motion?"
articleTitle: "Multimedia, Animations, and Motion"
layout: default
date: 2023-03-13T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Multimedia, Animations, and Motion

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Multimedia

The four methods of providing alternatives to time-based media are captions, transcripts, audio descriptions, and sign language interpretation. These alternatives are covered by Sections 504 and 508 of the Rehabilitation Act and the 21st Century Video Communications and Accessibility Act (CVAA).

### Captions

- Captions are distinct from subtitles, as they also include descriptions of sounds, whereas subtitles are mainly for translating languages
- Captions are useful not only for people who are deaf or hard of hearing, but also for SEO, second language learners, and situations where the sound is turned off
- Auto-captioning is promising, but not enough on its own to provide good captions—human review is required
- Closed captions are toggle-able and added as separate text files, whereas open captions are always on and “burned in” to videos
- Prerecorded video needs to have synchronized captions
- [WebVTT](https://w3c.github.io/webvtt/) is the most flexible captioning format, and should always be included among other file format options for captions
- Captions for live content require human transcribers, usually with stenograph machines
- Captions should be verbatim, if possible
- Captions should be styled in such a way as to be readable and clear about what is happening in the video (there are lots of specific rules that ultimately boil down to common sense)

### Transcripts

- Transcripts need to provide both audio and visual information, and they need to be easy to find
- Audio-only content requires transcripts, but multimedia and video-only content is more lenient if you provide captions or audio descriptions (but deafblind users need transcripts)
- Transcripts follow the same rules as captions, except important visual events must be described
- Transcripts can be included near the media content, pointed to by a link near the media content, or made to be interactive (jumping to time codes)

### Audio Descriptions

- If the video does not contain important visual information, audio descriptions are not necessary
- Audio descriptions are necessary when there is important visual information
- While not required, if you can provide audio descriptions for live content, go for it
- The level of detail may be limited by the soundtrack and the density of information
- Descriptions should be present tense, simple, and convey only as much information as a sighted viewer would have
- Descriptions should be neutral, fit the tone of the content, and not draw attention to itself
- Subtitles should be noted and then prefixed with indicators of who is saying what
- Avoid layering descriptions over important lyrics in music
- Read the credits when they appear at the beginning and end of videos
- Extended audio descriptions pause the content to allow for more description before resuming
- You can either create a second version with the audio description “baked in” or you can provide a secondary audio track with just the audio descriptions

### Sign Language Interpretation

- Sign language interpretation is a Level AAA requirement, so it’s nice to add it if you can but it isn’t strictly required
- Typically, the sign language interpretation can be within the frame of the video (picture-in-picture), provided as a separate video, or the interpreter can be in the video itself (like on stage during a speech)

### Media Player Accessibility

- The HTML5 `video` element works reasonably well, but browser implementation can impact accessibility, so it may be better to use proven video players
- All media player functionality must be available to keyboard users
- Names, roles, and values must be used correctly for media players, so screen readers can read them correctly
- Captions, transcripts, and audio descriptions should be available, either in the media player itself or provided in a sensible alternative way
- Captions should be customizable and media players should remember user preferences
- Full-screen video should be allowed

### Background Sounds

- Background sounds are an extra nuisance for people who are hard of hearing or use hearing aids
- It’s best to drop the volume of background music when there is dialog
- High-quality sound equipment makes a big difference compared to built-in camera mics
- Minimize overlapping dialog or cross-talk as much as possible
- Background sounds should be 20dB lower than foreground sounds or able to be turned off by users
- If possible, limit bursts of loud background sound to less than 2 seconds
- Don’t automatically play anything that makes noise. Just don’t.
- If you insist on being loud and rude, there must be a way to turn it off, pause it, or turn it down

## Animations and Motion

The accessibility problems with animation and motion can range from being distracting all the way to causing medical emergencies. Attention deficit disorders, vestibular disorders (vertigo/dizziness), and epilepsy are the most common cases to look out for.

### Seizure-Inducing Flashes

- Flashing or strobing effects can put some users at risk for photo-epileptic seizures
- Do not include content that flashes more than 3 times per second, unless the content is sufficiently small or is low enough contrast
    - “Sufficiently small” is roughly less than 21,824 square pixels (wow so easy to remember and reason about)
    - “Low enough contrast” is determined by a very technical formula. Best to avoid flashing in general
- [PEAT](https://trace.umd.edu/peat) and the [Harding Test](http://www.hardingtest.com/) are tools you can use to test flashing content

### Parallax Effects

- Parallax effects are when different elements move at different speeds or directions relative to each other
- This can cause nausea, dizziness, or other negative symptoms in people with vestibular disorders
- Minimize parallax effects to a few elements and small areas, and keep the effect subtle
- Normal accessibility rules apply (color contrast, keyboard accessibility, etc.)
- Parallax effects can negatively impact usability (can’t tell when you need to scroll) and SEO, so keep those downsides in mind

### Background Videos and Animations

- Important content must not be conveyed through background videos, unless there are playback controls and access to captions, transcripts, and audio descriptions as needed
- There must be a way to pause, stop, or hide background videos longer than 5 seconds (and please don’t play it automatically)
- Even for short background videos, a pause button is nice, or a way to opt out
- Keep motion minimal in background videos to avoid being distracting
- Please no sound, I’m begging you—it’s bad for all users, but especially so for ones using screen readers

### Animations from Interactions

There should be a way to opt out of unnecessary animations (prefers-reduced-motion or a setting on the user’s profile).

### Auto-Play

- There must be a way to pause, stop, or hide any media that automatically plays and is longer than 5 seconds
- This also applies to some non-media, like animations, games, stock tickers, and auto-updating content
- Allowing users to control the frequency of updates is a workaround if auto-updates are necessary

{% include 'partials/article-pagination.njk' %}
