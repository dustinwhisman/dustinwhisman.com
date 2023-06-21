---
title: "Conformance Testing for WCAG 2.1 Level AA | WAS Notes | Writing | Dustin Whisman"
description: "This is essentially a checklist to follow when testing a site for WCAG Level AA conformance."
articleTitle: "Conformance Testing for WCAG 2.1 Level AA"
layout: default
date: 2023-06-09T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Conformance Testing for WCAG 2.1 Level AA

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

This is a high-level list of things to check for when evaluating a site for WCAG 2.1 Level AA conformance (excluding all the Level A success criteria, which also need to be met). It doesn't include a detailed methodology for how to test each success criteria, but it should cover the basics.

## 1. Perceivable

### SC 1.2.4 Captions (Live)

Does all live multimedia containing audio come with synchronized captions?

### SC 1.2.5 Audio Description (Prerecorded)

Do all prerecorded multimedia containing visual-only information come with an audio description?

### SC 1.3.4 Orientation

Is content able to be oriented in either landscape or portrait mode, unless a specific orientation is essential for the functionality?

### SC 1.3.5 Identify Input Purpose

Do inputs for personal data use `autocomplete` attributes with values from the list of [Input Purposes for User Interface Components](https://www.w3.org/TR/WCAG22/#input-purposes)

### SC 1.4.3 Contrast (Minimum)

- Does all regular text have a contrast ratio of at least 4.5:1 with the background?
- Does all large text (18pt/24px or 14pt/19px bold) have a contrast ratio of at least 3:1 with the background?

### SC 1.4.4 Resize Text

Is the page readable and functional when zoomed to 200% of its original size?

### SC 1.4.5 Images of Text

Do all cases where text alone can be used for visual presentation use text rather than images of text?

### SC 1.4.10 Reflow

Is the content viewable without horizontal scrolling when the viewport is 320 CSS pixels wide?

### SC 1.4.11 Non-Text Contrast

- Do visual boundaries indicating a UI component’s hit area have at least a 3:1 contrast ratio with the background? This only applies if the boundary is the only thing identifying the component.
- Do visual states of UI components have contrast ratios of at least 3:1 with the background?
- Do parts of images and other graphics necessary to understand the content have a contrast ratio of at least 3:1 with the background?

### SC 1.4.12 Text Spacing

Can the spacing between letters, words, and lines of text and paragraphs be adjusted? Use a [bookmarklet](https://dylanb.github.io/bookmarklets.html) to help with testing.

### SC 1.4.13 Content on Hover or Focus

When hovering or focusing on an element reveals more content, is that content visually perceivable and can it be dismissed?

## 2. Operable

### SC 2.4.5 Multiple Ways

Are there multiple ways to find pages on the site? At least two of the following must be available:

- A list of related pages
- A table of contents
- A site map
- Site search
- A list of all available pages

### SC 2.4.6 Headings and Labels

- Are all headings informative and descriptive?
- Are all labels informative and descriptive?

### SC 2.4.7 Focus Visible

Is it visually apparent which element has keyboard focus when you tab through the page?

## 3. Understandable

### SC 3.1.2 Language of Parts

Are sections of content that are in a different language from the page’s default language identified via the `lang` attribute?

### SC 3.2.3 Consistent Navigation

Are navigation patterns that repeat across pages presented in the same order every time they appear?

### SC 3.2.4 Consistent Identification

Are labels, names, and text alternatives used for the same functionality consistently identified?

### SC 3.3.3 Error Suggestion

Are suggestions for how to fix errors provided when detected? This goes beyond identifying that there is an error.

### SC 3.3.4 Error Prevention (Legal, Financial, Data)

For destructive actions related to legal, financial, or important data, are the changes/deletions reversible, verified, or confirmed?

## 4. Robust

### SC 4.1.3 Status Messages

Are status messages programmatically determined through role or properties in a way that they can be presented to users without receiving focus?
