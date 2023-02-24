---
title: "WAS Notes: Designing an Accessible User Experience | Writing | Dustin Whisman"
description: "What are the accessibility considerations that you need to account for when designing a user experience?"
articleTitle: "WAS Notes: Designing an Accessible User Experience"
layout: default
date: 2023-02-24T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Designing an Accessible User Experience

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Design Principles

- Making a website accessible should be the minimum goal
- It is possible to build a website that meets all the WCAG success criteria but is completely unusable
- Guidelines are great for objective, measurable criteria, but less so for subjective criteria (how do you know that a typeface is readable?)
- WCAG 2.1 addressed a lot of gaps related to cognitive disabilities, low vision, and mobile/touch devices, but there’s still room for improvement
- In 1997, a group of architects led by Robert Mace came up with 7 principles for building design that apply to web design as well
  - Equitable Use
  - Flexibility in Use
  - Simple and Intuitive Use
  - Perceptible Information
  - Tolerance for Error
  - Low Physical Effort
  - Size and Space for Approach and Use

## Design Failures

- Common design failures include:
  - Failure to design: usually due to a lack of awareness
  - Ineffective designs: due to lack of awareness, poor understanding, or ignoring best practices
  - Incomplete designs: due to incomplete understanding, like adding ARIA attributes incorrectly because it seemed right
  - Bad retrofitting: due to poor planning
  - Inconvenient or stigmatizing designs: treating people with disabilities as second-class citizens
  - Accessibility rot over time: due to inattention or accessibility experts leaving projects
- Is it a good idea to provide an alternate, more accessible version of the site? No. Instead, you can _maybe_ add on some optional enhancements, but assistive technology may override those anyway

## Affordances

Affordances are the range of possible actions that can be performed on an object.

- Affordances need to be perceivable to exist
- Perception of affordances can vary based on the person’s background and experience

## Designing for Screen Readers

- In most cases, the most landmarks you would need are a header, a nav, a search, a main, and a footer
- Screen reader users are mainly interested in:
  - Name (accessible name/label)
  - Description (`aria-describedby`)
  - Role (button, link, etc.)
  - Value
    - Properties (`aria-controls`)
    - States (`aria-selected`, `aria-expanded`, etc.)
  - Updates (”live” regions)

## Designing for Cognitive Disabilities

- Cognitive disabilities tend to be neglected in web design, partially because of the broad spectrum of cognitive disabilities and partially because of the difficulty in creating objective rules to abide by
- Design principles for cognitive disabilities:
  - Make it easy for users to succeed
  - Simplify
    - Visual interface
    - Navigation
    - Processes and tasks
    - Content
  - Provide alternative representations
  - Allow extra time
  - Focus on the user’s attention
    - Eliminate or reduce distractions
    - Present a small number of clearly-defined tasks
    - Make the experience compelling and fun
    - Use visual design cues to draw attention
      - Blank space
      - Color
      - Contrast
      - The gaze of others (illustrations or photos of creatures looking at the thing to pay attention to)
      - Surprise
      - Framing
      - Directional cues
      - Leading lines
      - Motion (use with caution)
    - Use text to draw attention
    - Use auditory cues to draw attention (brief error/success/notification sounds)
  - Provide immediate feedback for both success and error scenarios

## Designing for User-generated Content

- For user-generated content, you need to be aware of ATAG guidelines, but in general, make it as easy as possible to make content accessible by providing guard rails or the ability to make content more accessible (a field for image alt text, for example)
- Automated fixes for accessibility issues _might_ eventually get to a place where they’re universally useful, but they have limitations–transcripts, alt text, and audio descriptions written by humans will most likely be better
