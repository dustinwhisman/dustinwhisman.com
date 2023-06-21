---
title: "WCAG 4.1 Compatible | WAS Notes | Writing | Dustin Whisman"
description: "How do you meet all the success criteria for WCAG 4.1 Compatible?"
articleTitle: "WCAG 4.1 Compatible"
layout: default
date: 2023-02-16T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 4.1 Compatible

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 4.1.1 Parsing - Level A

In markup languages, elements have complete start and end tags, elements are nested correctly, elements do not have duplicate attributes, and all IDs are unique, except for when allowed by specifications.

### How to Succeed

- [Validate your markup](https://validator.w3.org/)
- Conform to specifications, notably for HTML
- Use opening and closing tags correctly
- Use unique IDs for elements on the same page
- Do not use duplicate attributes
- Include your `doctype`

### How to Fail

- Fail to close tags or use opening/closing tags incorrectly
- Use duplicate IDs on the same page

## 4.1.2 Name, Role, Value - Level A

For all user interface components, the name and role can be programmatically determined. States, properties, and values that the user can set can be set programmatically, and notifications of changes are available to user agents, including assistive technologies.

### How to Succeed

- Use `aria-label` or `aria-labelledby` to provide names for user interface controls without visible labels (`title` is a last resort)
- Use semantic elements with baked in roles or use ARIA roles and attributes to define them
- Use HTML form controls (with labels) and links
- Use the `title` attribute on `frame` and `iframe` elements
- Use HTML according to spec

### How to Fail

- Turn `div` or `span` elements into user interface controls without setting their roles
- Implement custom controls that do not use an accessibility API, or do so incompletely
- Don’t update text alternatives when non-text content changes
- Don’t provide a name to user interface controls or images that are the only content of links
- Make focus states not programmatically determinable or fail to notify users about changes of focus state
- Omit labels from form controls that are grouped together

## 4.1.3 Status Messages - Level AA

Status messages can be programmatically determined through role or properties in such a way that they can be reported without receiving focus.

### How to Succeed

- Use `role="status"` to report status messages
- Provide feedback when data is submitted successfully
- Use `role="alert"` or live regions to identify errors
- Do all the things from 3.3 Input Assistance for forms
- Use `role="log"` to identify sequential information updates
- Use `role="progressbar"` to report progress

### How to Fail

- Use `role="alert"` or `aria-live="assertive"` on content that is not important and time-sensitive
- Hide or display a document without switching the live regions between active and inactive
