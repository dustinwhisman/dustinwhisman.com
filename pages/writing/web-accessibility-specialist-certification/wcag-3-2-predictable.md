---
title: "WCAG 3.2 Predictable - WAS Notes - Writing - Dustin Whisman"
description: "How do you meet all the success criteria for WCAG 3.2 Predictable?"
articleTitle: "WCAG 3.2 Predictable"
layout: default
date: 2023-02-15T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 3.2 Predictable

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 3.2.1 On Focus - Level A

When user interface components receive focus, they do not initiate a change of context.

### How to Succeed

Use activation, such as clicks, instead of focus to trigger changes in context.

### How to Fail

Remove focus when focus is received.

## 3.2.2 On Input - Level A

Changing the setting of a user interface component does not automatically change the context unless the user has been made aware of the behavior in advance.

### How to Succeed

- Use submit buttons to initiate changes in context
- Describe what will happen if form controls trigger changes in context when their values change
- Use the `onchange` event for cascading `select` elements without changing the context

### How to Fail

- Automatically submit forms
- Launch a new window when a form control’s value changes

## 3.2.3 Consistent Navigation - Level AA

Navigation that repeats on multiple pages occurs in the same order when they are repeated unless changed by the user.

### How to Succeed

Present components in the same relative order each time they appear.

### How to Fail

Present navigation links in a different relative order on different pages.

## 3.2.4 Consistent Identification - Level AA

Components that have the same functionality are identified consistently.

### How to Succeed

Use labels, names, and text alternatives consistently for content with the same functionality.

### How to Fail

Use two different labels for things that do the same thing, either within the page or within a set of pages.

## 3.2.5 Change on Request - Level AAA

Only change the context when the user requests it, or provide a mechanism to turn off such changes.

### How to Succeed

- Provide a mechanism to update content manually rather than automatically
- Implement redirects on the server side instead of the client side
- Use instant meta refreshes or redirects if done on the client side
- Use the `target` attribute to open a new window, and indicate that this will happen in the link text
- Update cascading `select` controls with the `onchange` event

### How to Fail

- Launch a new window when the user enters text in an input field
- Update main content automatically without giving the user the ability to disable automatic updates
- Change the context on `blur` from form elements
- Open windows that aren’t wanted by the user
- Use meta refresh to reload the page on a delay or interval

{% include 'partials/article-pagination.njk' %}
