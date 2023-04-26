---
title: "WAS Notes: Custom JavaScript/ARIA Widgets | Writing | Dustin Whisman"
description: "What are the accessibility considerations to account for when building custom JavaScript/ARIA widgets?"
articleTitle: "WAS Notes: Custom JavaScript/ARIA Widgets"
layout: default
date: 2023-04-26T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Custom JavaScript/ARIA Widgets

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## ARIA Concepts

- ARIA Axioms
  - Never use ARIA unless you have to
  - Always use ARIA when you have to
  - You’re doing it wrong (probably)
- ARIA communicates the following information to screen readers (and only screen readers):
  - Labels
  - Roles
  - States
  - Properties
  - Relationships between items
  - Live announcements
- An element’s accessible name is determined by checking things in this order
  1. `aria-labelledby`, which is usually visible text referenced by one or more IDs separated by spaces
  2. `aria-label`, which is not visible and contains the text itself
  3. Text within or related to the element (between opening and closing tags, `label` association for a form control, or `alt` attribute on an image)
  4. `title`
- `aria-labelledby` and `aria-label` both work best on interactive, semantic elements, and they replace the name instead of adding to it

## Roles and Values

- Landmark roles separate things like navigation from the main content of a page, and they give screen reader users a way to navigate directly to the region they want
- Landmark roles include `banner`, `main`, `form`, `navigation`, `contentinfo`, and more, and some HTML tags have implicit landmark roles
- Widget roles convey the functionality of components where no native HTML roles apply, such as `status`, `tab`, `tree`, and others
- Pseudo-HTML roles are when you apply a role like `checkbox` to an element like a `div`. This is generally not recommended
- The `document` role is the default role of a web page, and the main time to use it is when document-like content is inside an element with an `application`, `dialog`, `alertdialog`, or `tablist` role
- The `application` role should be used with extreme caution, as it wipes out everything that screen reader users depend on to navigate, leaving developers to re-add support for everything users need to be able to do
- `role="presentation"` cancels out existing semantic meanings for elements
- `role="definition"` can be used to replicate `dl` semantics
- `role="note"` is similar to the `aside` element/`complimentary` role, but is not considered a landmark role
- The `directory` role can be used for things like tables of contents
- Values for ARIA attributes can be true/false, reference element IDs, or match predefined options based on the attribute

## `aria-describedby`

- `aria-describedby` only works on elements with semantic roles
- `aria-describedby` usually only applies to focusable items, like links and buttons, or at least things that can have accessible names
- If the text read by `aria-describedby` is essential, it needs to be visible

## Live Regions

- Assertive announcements will interrupt screen readers if they’re in the middle of reading text (including previous assertive announcements)
- Polite announcements will be queued to be read after the screen reader finishes reading the current item, but activating screen reader features can interrupt the polite announcements
- Keep announcements brief because they cannot be re-read
- Live regions must be empty to start and they have to exist before being updated with an announcement
- `aria-atomic` can be used to specify whether the whole announcement needs to be read when there’s a change or only the changed portion
- `aria-relevant` can be used to specify which changes should be announced, such as when content is added, removed, or the text is changed
- `aria-busy` can be used to delay announcements until the region is done updating
- `role="alert"` is a lot like `aria-live="assertive"`, except it might be prefaced with “Alert”, and `role="status` is a lot like `aria-live="polite"` with `aria-atomic="true"`
- The `timer` and `marguee` roles have an implied `aria-live="off"`, meaning they won’t be read unless screen reader users navigate to those elements

## ARIA Keyboard Patterns

- The web historically has relied mostly on the tab, enter, and arrow keys, whereas operating systems make more use of modifier and function keys
- In general, tab to the widget, then use arrow keys within it
- Don’t nuke your focus indicators
- Don’t use positive `tabindex` values (use 0 to put an element in the tab order, or -1 to make it focusable but outside of the tab order)
- Manage focus correctly, ideally with source order and carefully controlled JS interactions
- Use standard interactions by following authoring practices guidelines
