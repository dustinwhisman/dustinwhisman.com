---
title: 'WAS Notes: WAI-ARIA Overview | Writing | Dustin Whisman'
description: This is an overview of what the Accessible Rich Internet Applications are and what they're used for.
articleTitle: 'WAS Notes: WAI-ARIA Overview'
layout: layout.njk
date: 2023-01-13T00:00:00Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WAI-ARIA Overview

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'published-date.njk' %}

## Accessible Rich Internet Applications (WAI-ARIA) 1.1

[ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) fills in the gaps between HTML’s accessibility features and the accessibility needs of the real world. It’s used to specify name, role, state, and property of HTML elements, especially when they’re changed or made more interactive with JavaScript.

### ARIA Features

ARIA is mainly used for screen readers, since it lets users know what’s happening visually on screen, such as:

- If a link opens a dialog
- If an object is expandable, or its content is expanded/collapsed
- If something has changed (live regions)
- What type of control it is (tabs, sliders, dialogs, etc.)

ARIA is complex and relies on a lot of JavaScript skills, so it is mostly used by web developers. [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) is the place to go for implementation details.
