---
title: 'The Basics - WAS Notes - Writing - Dustin Whisman'
description: To get started studying for the WAS certification, let's start with the basics, laying out some facts and terms to understand before going deeper.
articleTitle: 'The Basics'
layout: default
date: 2023-01-06T00:00:01Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: The Basics

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

- The World Health Organization (WHO) estimates that over 15% of the world’s population has a disability (I’ve heard numbers as high as 25%, depending on population)
- These are the main types of disabilities to be aware of
  - Visual impairments (blindness, low vision, and color blindness)
  - Mobility impairments (arthritis, paralysis, amputations, seizure disorders)
  - Hearing impairments (deafness, hard of hearing, hearing impaired)
  - Cognitive impairments (Down’s syndrome, autism, ADHD, dyslexia, aphasia)
  - Seizure and vestibular disorders (epilepsy, vertigo, dizziness, labyrinthitis, balance and eye movement disorders)
  - Speech impairments (apraxia, dysarthria, stuttering)
- These assistive tools help people who have disabilities
  - Screen reader software
  - Screen magnification tools
  - Braille output devices
  - Adaptive switches
  - Eye tracking devices
  - Mouth/head sticks
  - Speech input
  - Hearing aids
  - Captions
  - Transcripts
  - Sign language
  - Text highlighting
  - Text prediction
  - Summarization tools
  - OS settings to reduce motion
  - Augmentive and alternative communication/speech generating devices
- These are the main pain points to look out for when building digital interfaces
  - Products that don’t work with screen readers
  - Inability to zoom
  - Differentiating through color alone
  - Poor color contrast
  - Mouse-centric design (small/closely packed touch targets, hover-only interactions, etc.)
  - Audio without transcripts
  - Video without synchronized captions
  - Overly complicated interfaces
  - Big walls of text with little whitespace
  - Justified text (rivers run through it)
  - Small or hard to read fonts
  - Videos that autoplay
  - Extreme flashing or strobing
  - Parallax effects
  - Scroll-triggered animations
  - Voice-activated technology
- Accessibility benefits everyone because of
  - Temporary disabilities: injuries, medication affecting cognition
  - Situational disabilities: glare on the screen from the sun, being unable to play audio in public
  - Mild disabilities: needing glasses, understanding audio better with captions
  - Non-native speakers
  - Diminishing senses due to aging
  - Robots: SEO bots don’t have senses and can’t use mice
- The business case for building accessibly
  - Disabled people and their friends/family have money
  - Challenges related to disabilities lead to innovation
- The legal case for building accessibly
  - Public sector entities in the US need to comply with accessibility rules
  - Public and private sector entities in other countries must follow stricter rules/laws
  - Lawsuits are one of the primary methods to bring about necessary change
- Accessibility Standards
  - Web Content Accessibility Guidelines (WCAG): the default and the gold standard, meant primarily for web-based and native app designers/developers
  - Authoring Tool Accessibility Guidelines (ATAG): meant for tools used to build websites/applications, such as WYSIWYG editors, CMSs, or even websites that let users add content, like social networking sites
  - User Agent Accessibility Guidelines (UAAG): meant for tools used to render content, such as browsers, media players, and readers
- WCAG Acceptance Criteria Overview
  - Three levels of success criteria: A, AA, and AAA
  - These levels are progressive, meaning AAA success criteria must also succeed for the A and AA levels as well
  - There are 30 A success criteria, 20 AA, and 28 AAA, equaling 78 total success criteria
- The POUR Principle
  - Perceivable: users can perceive all essential information
  - Operable: the interface cannot include interactions the user cannot perform
  - Understandable: content is clearly written and the interactions aren’t overly complex or confusing
  - Robust: the application works with different types of assistive technology, operating systems, browsers, and device sizes/orientations
