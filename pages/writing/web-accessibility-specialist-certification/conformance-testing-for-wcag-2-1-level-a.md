---
title: "WAS Notes: Conformance Testing for WCAG 2.1 Level A | Writing | Dustin Whisman"
description: "This is essentially a checklist to follow when testing a site for WCAG Level A conformance."
articleTitle: "Conformance Testing for WCAG 2.1 Level A"
layout: default
date: 2023-06-08T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Conformance Testing for WCAG 2.1 Level A

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

This is a high-level list of things to check for when evaluating a site for WCAG 2.1 Level A conformance. It doesn't include a detailed methodology for how to test each success criteria, but it should cover the basics.

## 1. Perceivable

### SC 1.1.1 Non-text Content

- Do informative images have descriptive alternative text?
- Are decorative images not exposed to assistive technology?
- Is there a description for audio or video content that gives you an idea of what it’s about before playing?

### SC 1.2.1 Audio or Video Only (Prerecorded)

- Do audio-only files come with a descriptive text transcript?
- Do video-only (no dialogue) files come with a text or audio description?

### SC 1.2.2 Captions (Prerecorded)

- Do video files come with open or closed captions?
- Do the captions describe all important music and sound effects in addition to dialogue?

### SC 1.2.3 Audio Description or Media Alternative (Prerecorded)

- Does the video file include information that is only conveyed visually?
- If so, does the video come with a text alternative or an audio description track?

### SC 1.3.1 Info and Relationships

- Are elements used because of their semantic meaning and not because of their visual appearance?
- Is all information that is visually conveyed also programmatically conveyed?
- Are ARIA landmarks and HTML sectioning elements used correctly?
- Are cells in tables correctly associated with their header cells?
- Do tables have descriptive captions or summaries where appropriate?
- Are tables used for layout? If so, do they have `role="presentation"` or `role="none"`?
- Do groups of related controls have group labels? This applies only if the individual labels do not provide enough context, like radio buttons
- Are things that look like headings marked up as headings? On the flip side, are all the things marked up as headings meant to be headings?
- Do the heading levels match the structural hierarchy of the content?
- Are lists semantically identified as lists using `ul`, `ol`, `dl`, or `role="list"` and `role="listitem"`?

### SC 1.3.2 Meaningful Sequence

- Is the reading order logical and intuitive?
- Does the page make sense with CSS turned off or when using a screen reader?

### SC 1.3.3 Sensory Characteristics

- Do instructions rely on more than just visual cues, like shape, color, or location?
- Do instructions rely on more than just audio cues?

### SC 1.4.1 Use of Color

- When conveying content or distinguishing visual elements, is color accompanied by another method of achieving the same goal?
- Are links distinguishable from surrounding text by something other than color, or is the color contrast between the links and text at least 3:1?

### SC 1.4.2 Audio Control

- Is there a mechanism to stop, pause, mute, or adjust the volume for audio that automatically plays for more than 3 seconds?
- Is the mechanism easy to use, or is the volume adjustable by keyboard alone?

## 2. Operable

### SC 2.1.1 Keyboard

- Is all functionality on the page available using the keyboard alone, except for functionality that cannot be accomplished in any known ways by keyboards?
- Are shortcut keys implemented in a way that does not conflict with device and screen reader shortcuts?
- Are gesture-based functionalities available when using a screen reader?

### SC 2.1.2 No Keyboard Trap

- Is the user able to navigate to and from all elements using the keyboard without getting stuck?
- Are there instructions given for ways to exit a focus trap, like the ESC key?

### SC 2.1.4 Character Key Shortcuts

Do any single-character shortcut keys exist? If so, can they be turned off or remapped, or are they only active when relevant UI components are in focus?

### SC 2.2.1 Timing Adjustable

- Do users have the ability to turn off, adjust, or extend time limits, except for cases where the time limit is impossible to change, like an auction?
- Does the user have enough time to complete the action to extend the time limit, and can they do so at least ten times?
- Are time limits 20 hours or longer?

### SC 2.2.2 Pause, Stop, Hide

- Is there a mechanism for users to pause, stop, or hide content that moves, blinks, or scrolls for more than 5 seconds?
- Is automatically updating content, like a live chat, able to be paused, stopped, or hidden? Or can users adjust the timing of the updates?

### SC 2.3.1 Three Flashes or Below Threshold

- Does anything that flashes do so less than 3 times per second?
- Does anything that flashes 3 or more times per second fall below general thresholds for size and contrast? [Use a tool to measure this](https://trace.umd.edu/peat/#download).

### SC 2.4.1 Bypass Blocks

Is there a method to skip navigation and other repeated elements? Headings, landmarks, or skip links all count for this.

### SC 2.4.2 Page Titled

Does the page have a descriptive and informative title?

### SC 2.4.3 Focus Order

Is the navigation order of interactive elements logical and intuitive?

### SC 2.4.4 Link Purpose (In Context)

Is the purpose of each link clear from the link text alone or from the link text and its surrounding context?

### SC 2.5.1 Pointer Gestures

- Can all functionality that can be operated with a pointer be operated with single-pointer action, meaning path-based or multi-point gestures aren’t required?
- Are the path-based or multi-point gestures essential to the function or impossible to replace?

### SC 2.5.2 Pointer Cancellation

- Do event handlers use the “up” version instead of the “down” version? For example, “keyup”
- Can single-pointer functionality be undone or aborted?
- Is single-pointer functionality essential?

### SC 2.5.3 Label in Name

Does each user interface component with a label have an accessible name that contains the visible text or image of text?

### SC 2.5.4 Motion Actuation

Is there functionality that can be triggered by device motion or user gestures detected by device sensors? If so, can that be disabled, and is there an alternative to accomplish the same functionality?

## 3. Understandable

### SC 3.1.1 Language of Page

Is the language of the page set with the `lang` attribute on the `html` tag?

### SC 3.2.1 On Focus

When an element receives focus, does it wait for further user action before triggering changes that would be disorienting if they happened automatically?

### SC 3.2.2 On Input

When an input’s value changes, does it wait for further user action, like a form submission before triggering changes in context?

### SC 3.3.1 Error Identification

Are text-based alerts provided to users for form validation cues and errors?

### SC 3.3.2 Labels or Instructions

- Are visible text labels provided for form fields?
- Do labels or instructions provide sufficient information for users to fill out the form?
- Are error messages provided for required fields that are left blank, and are required fields labeled as such?

## 4. Robust

### SC 4.1.1 Parsing

- Do elements have complete start and end tags?
- Are elements nested according to their specifications?
- Do elements use attributes only once? (No duplicates)
- Are element IDs unique?
- Use a [validator](https://validator.w3.org/)

### SC 4.1.2 Name, Role, Value

- Are the name, role, and value of interactive elements that have semantic equivalents, like links or buttons, programmatically determinable by assistive technologies?
- Do custom controls communicate name, role, and value correctly according to W3C specifications?
- Are all features and components compatible with assistive technologies?
