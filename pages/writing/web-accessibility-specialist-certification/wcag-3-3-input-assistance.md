---
title: "WAS Notes: WCAG 3.3 Input Assistance | Writing | Dustin Whisman"
description: "How can you meet all the success criteria for WCAG 3.3 Input Assistance?"
articleTitle: "WAS Notes: WCAG 3.3 Input Assistance"
layout: default
date: 2023-02-15T00:00:00.001Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 3.3 Input Assistance

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 3.3.1 Error Identification - Level A

If an input has a detectable error, the error is identified and described to the user in text.

### How to Succeed

- Provide text descriptions for required fields that were not completed or fields with allowed values or required formats that were not met
- Use `aria-invalid` for a field with an error
- Provide client-side validation to alert users of errors
- Use `aria-alertdialog` to identify errors
- Use `role="alert"` or live regions to identify errors

## 3.3.2 Labels or Instructions - Level A

Labels or instructions are provided when user input is required.

### How to Succeed

- Use `label` elements to associate text labels with form controls
- Use `fieldset` and `legend` elements for groups of related form controls
- Use `aria-describedby` to provide more descriptive labels
- Use `aria-labelledby` to concatenate a label from different text nodes
- Provide the expected format with an example
- Provide text instructions at the beginning of the form
- Position labels to maximize predictability
- Indicate required inputs using a `label` or `legend` element

### How to Fail

Omit labels, such as by only labeling one field in a set of three for a formatted phone number.

## 3.3.3 Error Suggestion - Level AA

If an error is detected, suggestions for how to fix it are provided to the user, unless that jeopardizes security or the purpose of the content.

### How to Succeed

- Provide text to identify required fields that were not completed
- Use `aria-required` on required fields
- Use `aria-alertdialog` to identify errors
- Provide a text description when user input doesn’t match the required format or allowed values
- Provide a suggestion for corrected text

## 3.3.4 Error Prevention (Legal, Financial, Data) - Level AA

For pages that cause legal commitments or financial transactions for the user to occur, or modify or delete user data, at least one of the following is true:

- Submissions are reversible
- Data entered by the user is checked for errors, and users have the opportunity to correct them
- There is a mechanism to review and confirm information before finalizing the submission

### How to Succeed

- Provide a window of time when the user may amend or cancel the request
- Give the user a chance to review and correct information before submitting
- Provide an “I’ve confirmed everything” checkbox in addition to a submit button
- Provide a mechanism to recover deleted information
- Request confirmation before continuing

## 3.3.5 Help - Level AAA

Context-sensitive help is available.

### How to Succeed

- Provide a help link on every page
- Provide help via an assistant on the page
- Provide spell-checking and suggestions for input
- Provide text instructions at the beginning of forms
- Provide expected data formats with examples

## 3.3.6 Error Prevention (All) - Level AAA

This is the same as 3.3.4 but applies to any page where the user is required to submit information.
