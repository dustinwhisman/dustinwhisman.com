---
title: "WAS Notes: Device-Independent Input Methods | Writing | Dustin Whisman"
description: "What are the accessibility considerations related to Device-Independent Input Methods?"
articleTitle: "WAS Notes: Device-Independent Input Methods"
layout: default
date: 2023-05-05T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Device-Independent Input Methods

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Mouse Input

- Target sizes should be large enough for people with limited dexterity to click on with a mouse
- Visual hover indicators are good, even better if they’re not too subtle
- By default, `button` elements don’t get `cursor: pointer`, so maybe don’t add that to buttons
- Don’t use `mousedown` events, only `mouseup`

## Keyboard Input

- Many assistive technologies work effectively the same as keyboards, so keyboard accessibility applies to a broad variety of other tools as well
- Links, buttons, and all interactive controls must be keyboard accessible
- Use Tab to navigate to widgets and arrow keys to navigate within them
- `tabindex="0"` to put an element in the tab order, `tabindex="-1"` to manage focus with JavaScript, never use `tabindex` greater than 0
- As much as possible, match source order to visual order
- Visual focus indicators are not optional, and they shouldn’t be too subtle (at least 3:1 contrast with the background). Remove `:focus { outline: none; }` from your CSS vocabulary
- If it’s possible to do it with a keyboard, it must be able to be done with a keyboard (exceptions include drawing by hand/path-based inputs)
- Don’t trap your keyboard users, provide an escape route
- Focus must be purposefully set during/after dynamic interactions, like back to where it was before opening a modal dialog or to new content that has been added
- Only set focus on elements with programmatically determinable text
- Don’t clash with browser, OS, or assistive technology hotkeys
- Provide instructions for unusual or novel keyboard interactions (or avoid getting that complex in the first place)

## Touch Input

- Touches are essentially clicks, so if it’s already mouse accessible, it should be touch-accessible as-is
- Drag and drop is a brittle interaction, so should be an optional enhancement, not the primary mechanism
- Gestures are not well standardized or supported, so it’s best to avoid or treat them as optional enhancements
- Screen readers on phones take over touch interactions, so don’t count on your fancy swipe gestures working when screen readers are turned on
- Large touch sizes are highly recommended: 44px by Apple and 48px for Android
- Screen reader focus and programmatic focus aren’t necessarily the same, so `onfocus` and `onblur` events may be unreliable on touchscreen devices
- Functionality that uses multi-point gestures, like two-finger pinch to zoom, must be able to be performed by single-point gestures, like tapping a button

## Voice Input

- Voice control users rely on ARIA and accessible names to be able to command their software to click on form controls, buttons, links, etc.
- Dragon Naturally Speaking is the most popular voice control software outside of built-in OS methods
- When accessible names don’t match visible names, users may need to resort to navigating with Mouse Grid, which is a cool, but cumbersome workaround to be able to click without a mouse

## Motion, Disappearing Content, and Transitions

- Gestures like shaking your phone must be achievable through another mechanism, and they must be able to be turned off (I’ve had this issue with my phone’s flashlight turning on while I’m jogging)
- Don’t move content in a way that makes interactive elements hard to activate, like a link in a `marquee` element, or a confirmation message that automatically disappears
- Transitions and layout shifts should not interfere with reading or interaction unless the interference is brief (they say less than 5 seconds, but that’s still such a long time)
- Keep transition and parallax effects to a minimum to avoid distractions, nausea, and other motion-related issues
