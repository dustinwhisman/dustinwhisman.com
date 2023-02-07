---
title: 'WAS Notes: WCAG 2.1 Keyboard Accessible | Writing | Dustin Whisman'
description: How do you meet all of the success criteria for WCAG 2.1 Keyboard Accessible?
articleTitle: 'WAS Notes: WCAG 2.1 Keyboard Accessible'
layout: layout.njk
date: 2023-02-07T00:00:01Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WCAG 2.1 Keyboard Accessible

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

## 2.1.1 Keyboard - Level A

All functionality is operable through keyboard interface without requiring timed keystrokes, except for when the function requires path-dependent input, such as handwriting for an electronic signature.

### How to Succeed

- Use HTML form controls and links correctly
- Provide event handlers for keyboard triggered events
- Use the `onclick` event of anchors and buttons
- Use redundant keyboard and mouse event handlers

### How to Fail

- Use mouse or gesture-specific event handlers without a keyboard equivalent
- Remove focus from elements when focus is received
- Emulate links poorly

## 2.1.2 No Keyboard Trap - Level A

Keyboard focus can’t get stuck without providing a standard way for users to escape out of a component or region. If there’s a non-standard way to exit, users are informed on how to do so.

### How to Succeed

Ensure users aren’t trapped in content by letting them tab or escape out of it.

### How to Fail

Trap focus without providing a keyboard accessible way out.

## 2.1.3 Keyboard (No Exception) - Level AAA

All functionality is operable through keyboard interface without requiring timed keystrokes. This removes the exception for path-dependent interactions from 2.1.1.

## 2.1.4 Character Key Shortcuts - Level A

Keyboard shortcuts are not implemented using single characters (letters, punctuation, numbers, or symbols), unless they can be turned off, remapped, or only apply when a component is focused.

### How to Succeed

- Don’t implement single character shortcuts
- Provide a mechanism to change or deactivate the shortcuts, including non-printing characters (Shift, Ctrl, etc.)

### How to Fail

Implement single character shortcuts that can’t be turned off or changed by the user.
