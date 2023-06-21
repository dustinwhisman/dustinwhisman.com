---
title: "WCAG 2.5 Input Modalities | WAS Notes | Writing | Dustin Whisman"
description: "How do you meet all of the success criteria for WCAG 2.5 Input Modalities?"
articleTitle: "WCAG 2.5 Input Modalities"
layout: default
date: 2023-02-13T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 2.5 Input Modalities

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 2.5.1 Pointer Gestures - Level A

All functionality that uses path-based gestures or has multiple points can be operated with a single pointer without a path-based gesture unless it is essential. An example of a multipoint gesture is a two-finger pinch to zoom, and its single-point activation equivalent could be double tapping or clicking a zoom button.

### How to Succeed

- Don’t rely on path-based gestures or multipoint gestures
- Provide controls that don’t require complex gestures while performing the same function as those complex gestures
- Use single-point activation for spatial positioning and manipulation

### How to Fail

Allow users to operate functionality with pointer input, but not single-point activation alone.

## 2.5.2 Pointer Cancellation - Level A

For functionality that is operated with a single pointer, at least one of the following is true:

- The down event is not used to trigger functionality (`mousedown` or `keydown`)
- The up event is used (`mouseup` or `keyup`) and there’s a mechanism to abort before triggering the functionality
- The up event reverses the outcome of the down event
- The down event must trigger the functionality

### How to Succeed

- Allow for drag-and-drop actions to be canceled
- Only trigger touch events when touch is removed

### How to Fail

Activate a button on the initial touch location rather than the final touch location.

## 2.5.3 Label in Name - Level A

For user interface components with labels including visible text, the accessible name contains that visible text.

### How to Succeed

- Include the visible text in the accessible name by using `aria-label`, `aria-labelledby`, or accessibly hidden text
- Make the visible text the accessible name by setting the contents of `a`/`label` tags

### How to Fail

- Use an accessible name that does not include the visible text
- Include visible text in the accessible name, but in the wrong order (visible text should be first)
- Intersperse other words between words in the visible text

## 2.5.4 Motion Actuation - Level A

Functionality that can be operated through device or user motion can also be operated by user interface components, and the motion activation can be disabled to prevent accidental activation (e.g. shaking a phone to turn on the flashlight). This applies unless the motion is used through an accessibly supported interface or motion is an essential component.

### How to Succeed

- Provide conventional controls and settings for motion actuation
- Support system-level features that disable motion actuation

### How to Fail

- Include functionality that can only be controlled by motion
- Don’t allow users to disable motion actuation
- Ignore or disable system-level features that control motion actuation

## 2.5.5 Target Size - Level AAA

The targets for pointer events are at least 44 by 44 pixels, unless:

- There’s an equivalent target elsewhere that is 44 by 44 pixels
- The target is part of a sentence (inline links)
- The target’s size is set by the user agent instead of the author
- The presentation of the target is essential to the information conveyed

### How to Succeed

- Ensure touch targets are at least 44 by 44 pixels
- Provide a mechanism to change the size of targets independent of zoom (compact, cozy, comfortable settings)

### How to Fail

- Make targets smaller than 44 by 44 pixels
- Use a link in a paragraph where the entire paragraph is smaller than 44 by 44 pixels

## 2.5.6 Concurrent Input Mechanisms - Level AAA

Web content does not restrict input modalities, except for when it is essential, required for security reasons, or required to respect user settings.

### How to Succeed

Use high-level, input-agnostic event handlers like `click`, `focus`, and `blur` to ensure wide support for input mechanisms.

### How to Fail

Limit interactions to touch-only on touchscreen devices.
