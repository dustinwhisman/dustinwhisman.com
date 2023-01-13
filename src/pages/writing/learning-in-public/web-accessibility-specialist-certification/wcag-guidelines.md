---
title: "WAS Notes: WCAG Guidelines | Writing | Dustin Whisman"
description: This is an overview of what the Web Content Accessibility Guidelines are for and how they're structured.
articleTitle: "WAS Notes: WCAG Guidelines"
layout: layout.njk
date: 2023-01-12T00:00:00Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WCAG Guidelines

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

## Web Content Accessibility Guidelines (WCAG)

[WCAG 2.1](https://www.w3.org/TR/WCAG21/) is the most authoritative source of web accessibility guidelines. All guidelines are technology-agnostic, meaning they apply to all present and future web technologies.

### Level A, AA, and AAA

Level A is the lowest level of conformance, and Level AAA is the highest. Most organizations target AA as the minimum because it is meaningful and achievable. Level AAA shouldn’t be ignored, though, because people with disabilities depend on those success criteria.

### POUR

The main accessibility principles identified in WCAG are Perceivable, Operable, Understandable, and Robust. From these principles come 13 [guidelines](https://www.w3.org/WAI/WCAG21/quickref/).

#### Perceivable

- 1.1: Provide text alternatives for non-text content
- 1.2: Provide alternatives for time-based media
- 1.3: Create content that can be presented in different ways without losing information or structure
- 1.4: Make it easier for users to see and hear content

#### Operable

- 2.1: Make all functionality available from a keyboard
- 2.2: Give users enough time to read and use content
- 2.3: Do not design content in a way known to cause seizures
- 2.4: Provide ways to help users navigate, find content, and know where they are
- 2.5: Make it easier for users to operate functionality with non-keyboard inputs

#### Understandable

- 3.1: Make text content readable and understandable
- 3.2: Make web pages appear and operate in predictable ways
- 3.3: Help users avoid and correct mistakes

#### Robust

- 4.1: Maximize compatibility with user agents, including assistive technologies

### Success Criteria

Each guideline has at least one success criterion, and most have several. If you meet all the criteria up to a certain level, such as Level AA, then you have met the guideline at that conformance level.

Most success criteria are self-explanatory, but some require more detail or documentation for techniques for achieving the success criteria. “Sufficient techniques” are enough to pass the success criterion, whereas “advisory techniques” are more like recommendations for best practices that aren’t necessarily required.
