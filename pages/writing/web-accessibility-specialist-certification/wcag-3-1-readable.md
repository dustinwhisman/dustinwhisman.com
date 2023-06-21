---
title: "WCAG 3.1 Readable | WAS Notes | Writing | Dustin Whisman"
description: "How can you meet all the success criteria for WCAG 3.1 Readable?"
articleTitle: "WCAG 3.1 Readable"
layout: default
date: 2023-02-14T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 3.1 Readable

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 3.1.1 Language of Page - Level A

The default language of the page can be programmatically determined.

### How to Succeed

Use the `lang` attribute on the `html` element.

## 3.1.2 Language of Parts - Level AA

The language for phrases or passages in content can be programmatically determined, except for proper names, technical terms, or made-up words.

### How to Succeed

Use the `lang` attribute when the language changes from the default within the content.

## 3.1.3 Unusual Words - Level AAA

A mechanism is available for defining words or phrases that are unusual, like idioms and jargon.

### How to Succeed

- Link to definitions or glossaries
- Use description lists
- Use inline definitions, such as with the `dfn` element
- Provide a way to search an online dictionary

## 3.1.4 Abbreviations - Level AAA

A mechanism for identifying what an abbreviation stands for is available.

### How to Succeed

- Use the expanded form before using the abbreviation. For example, HyperText Markup Language (HTML)
- Link to definitions or glossaries
- Use the `abbr` element to provide definitions
- Provide a way to search an online dictionary

## 3.1.5 Reading Level - Level AAA

When text requires reading at an advanced/secondary education level, there is supplemental content or an alternate version available at an easier reading level.

### How to Succeed

- Provide a text summary that can be understood by people with lower secondary education reading level ability
- Provide illustrations, pictures, and symbols to help explain the content
- Provide a spoken version of the text
- Make it easier to read
- Provide a sign language version of the content

## 3.1.6 Pronunciation - Level AAA

A mechanism is available to identify the pronunciation of words where the meaning is ambiguous without knowing the pronunciation.

### How to Succeed

- Provide the pronunciation right after the word
- Link to pronunciations or glossaries
- Use standard diacritical marks that can be turned off
- Use the `ruby` annotation element
