---
title: 'WAS Notes: WCAG 1.3 Adaptable | Writing | Dustin Whisman'
description: How do you meet all of the success criteria for WCAG 1.3 Adaptable?
articleTitle: 'WCAG 1.3 Adaptable'
layout: default
date: 2023-02-01
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 1.3 Adaptable

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 1.3.1 Info and Relationships - Level A

Information, structure, and relationships conveyed through presentation (size, proximity, etc.) can be programmatically determined or are available in text.

### How to Succeed

- Use semantic elements to mark up structure (`header`, `h1`, `main`, etc.)
- Use semantic elements to mark emphasized or special text (`em`, `strong`, `blockquote`, etc.)
- Use ARIA landmarks to identify page regions (`role=”<navigation|search|region|etc.>"`)
- Use `role="heading"` to identify headings
- Use `aria-labelledby` to name regions and landmarks, or to name user interface controls
- Use grouping roles to identify related controls
- Include information in text that is otherwise conveyed through appearance/styling of text
- Separate structure from presentation (don’t use an `h3` instead of an `h2` because you like its styles better)
- Identify icons with `role="img"`

### How to Fail

- Use presentation only to convey information (like a color to indicate a field is required)
- Use white space characters to format content rather than using semantic elements and CSS
- Emulate links with JavaScript instead of using `a` elements
- Use structural markup that does not match the relationships between content
- Use tables for layout
- Use the `pre` element for tabular data
- Insert non-decorative content with pseudo-elements in CSS
- Suppress semantic information by using `role="presentation"`
- Fail to mark up tables correctly
  - Use `td` instead of `th` for headings
  - Associate `id` and `headers` attributes incorrectly

## 1.3.2 Meaningful Sequence - Level A

The correct reading sequence can be programmatically determined, assuming the sequence affects meaning.

### How to Succeed

- Put content in the right order
- Use the `dir` attribute on inline elements that have a different text direction from the content they’re in
- Keep the DOM order and visual order the same

### How to Fail

- Use white space characters for formatting text content into tables or columns, or to control spacing within a word
- Use tables for layout where the tables don’t make sense in order
- Visually change the order of things from the DOM order in a way that changes meaning

## 1.3.3 Sensory Characteristics - Level A

Sensory characteristics like shape, color, size, visual location, orientation, or sound are not the only way to understand or operate content.

### How to Succeed

Provide text identification alongside sensory items (icons, colors signifying status, etc.).

### How to Fail

- Describe which button to click by describing where it is or what shape/color it is: “click the round green button to the right”
- Use icons or emoticons with no text equivalent provided

## 1.3.4 Orientation - Level AA

Content is not restricted to a single display orientation (landscape vs. portrait), unless that orientation is essential.

### How to Succeed

- Allow landscape and portrait orientations with CSS (or lack thereof)
- Use show/hide controls to allow access to content in different orientations

### How to Fail

Lock the orientation to one type.

## 1.3.5 Identify Input Purpose - Level AA

The purpose of each input field can be programmatically determined.

### How to Succeed

- Give input fields clear purposes through labels and attributes like `type="email"` or `autocomplete="new-password"`
- Ensure that inputs are created in such a way that they can be filled in by browsers, password managers, and other related tools

## 1.3.6 Identify Purpose - Level AAA

The purpose of user interface components, icons, and regions can be programmatically determined.

### How to Succeed

- Use semantic elements, possibly augmented by ARIA landmarks to identify page regions
- Use microdata to augment markup (is this supported? more info needed)
- Use `aria-invalid` and `aria-required`
