---
title: "WCAG 2.4 Navigable - WAS Notes - Writing - Dustin Whisman"
description: "How do you meet all the success criteria for WGAC 2.4 Navigable?"
articleTitle: "WCAG 2.4 Navigable"
layout: default
date: 2023-02-10T00:00:00.001Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 2.4 Navigable

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 2.4.1 Bypass Blocks - Level A

There is a mechanism to skip past blocks of content that are repeated on multiple pages.

### How to Succeed

- Create skip links at the beginning of pages that go directly to the main content
- Create skip links at the beginning of repeated content to skip past that block
- Add table of contents links that lead to each area of content
- Use ARIA landmarks to identify page regions
- Use heading elements at the beginning of each section
- Use expandable and collapsible menus to bypass blocks of content

## 2.4.2 Page Titled - Level A

Web pages have useful titles.

### How to Succeed

Use the `title` element with a title that describes the content or purpose of the page.

### How to Fail

Use a generic title that doesn’t relate to page contents or omit the title entirely.

## 2.4.3 Focus Order - Level A

The page can be navigated in a sequential order that preserves meaning and operability.

### How to Succeed

- Place elements in an order that follows sequences and relationships within the content
- Create a logical tab order through interactive elements
- Make the DOM order match the visual order
- Insert dynamic content in the DOM immediately after its trigger element
- Create modals and dialogs in an operable manner (move focus accordingly on open/close)

### How to Fail

- Use `tabindex` to create a nonsensical tab order
- Open/close modals or dialogs without moving focus correctly

## 2.4.4 Link Purpose (In Context) - Level A

The purpose of each link can be determined through the link text alone or the link text in combination with the surrounding context.

### How to Succeed

- Write clear, descriptive link text
- Provide text alternatives for non-text links (icons, image maps, etc.)
- Use links in sentences that make the purpose of the link clear
- Supplement links with the `title` attribute
- Hide portions of visually redundant link text with CSS
- Use `aria-labelledby` or `aria-label` to set the link text
- Use list and table information to identify the purpose of links in lists and tables

### How to Fail

- Provide link context in content that is not related to the link
- Link an image without giving it an accessible name

## 2.4.5 Multiple Ways - Level AA

There is more than one way to find a page unless it is part of a multi-step process.

### How to Succeed

- Provide links to related pages
- Provide a table of contents
- Provide a site map
- Provide search functionality
- Provide a list of links to all pages
- Link to all pages from the home page

## 2.4.6 Headings and Labels - Level AA

Headings and labels describe the topic or purpose.

### How to Succeed

- Provide descriptive headings
- Provide descriptive labels

## 2.4.7 Focus Visible - Level AA

Keyboard focus indicators are visible.

### How to Succeed

- Use components that are highlighted when they receive focus (links, buttons, etc,)
- Use CSS to change the presentation of a component when it receives focus
- Use the default focus indicator of the platform
- Use highly visible focus indicators, if author-supplied
- Change the color contrast of the focused element, or change its background color or border

### How to Fail

- Remove focus when it is received
- Render focus states invisible, such as by removing the default outline without replacing it with custom styles

## 2.4.8 Location - Level AAA

Information about the user’s location within a site is available.

### How to Succeed

- Provide breadcrumbs
- Provide a site map
- Indicate the user’s current location in the navigation
- Use `link="prev|next"` elements to reference related pages

## 2.4.9 Link Purpose (Link Only) - Level AAA

The purpose of each link can be determined through the link text alone. This is a more strict version of 2.4.4 that does not account for the surrounding context.

### How to Fail

Use “click here” or “read more” links that mean nothing on their own.

## 2.4.10 Section Headings - Level AAA

Section headings are used to organize content. “Heading” is a general term not limited to heading elements like `h1` or `h2`, and it applies more so to writing than interactive components.

### How to Succeed

- Organize pages with headings (`title`, `h1`, `h2`, etc. and not skipping levels)
- Provide heading elements at the beginning of each section of content
