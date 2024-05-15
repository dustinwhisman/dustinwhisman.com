---
title: "Basic Methods for Web Accessibility Testing - WAS Notes - Writing - Dustin Whisman"
description: "How does one actually go about testing a website for accessibility issues?"
articleTitle: "Basic Methods for Web Accessibility Testing"
layout: default
date: 2023-05-17T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Basic Methods for Web Accessibility Testing

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

- Accessibility issues need to be flagged during design
- Accessibility annotations should be included in planning to let developers know what to do and look out for
- Automated tests should be run regularly during development so that easy-to-find issues aren’t caught at the end when the focus should be on manual testing
- Developers should be doing basic keyboard accessibility and screen reader checks, especially when building custom widgets
- Team members who are most qualified to check for accessibility issues should do thorough testing in a testing phase (which can be recurring, not just once before release)

## Accessibility Checklists

- [Designer Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/dq-designers-checklist.pdf)
- [Semantic Structure and Navigation Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-semantic-checklist.pdf)
- [Images, Canvas, SVG, and Non-Text Content Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-images-checklist.pdf)
- [Visual Design and Colors Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-visual-design-checklist.pdf)
- [Responsive Design and Zoom Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-responsive-zoom-checklist.pdf)
- [Multimedia, Animations, and Motion Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-multimedia-checklist.pdf)
- [Device-Independent User Input Methods Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-input-methods-checklist.pdf)
- [Form Labels, Instructions, and Validation Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-forms-checklist.pdf)
- [Dynamic Updates, AJAX, and Single-page Applications Checklist](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/module-dynamic-updates-checklist.pdf)
- [Design Considerations for different disabilities](https://media.dequeuniversity.com/courses/generic/testing-basic-method-and-tools/2.0/en/docs/dq-design-considerations.pdf)

## The Scope of the Test

This is the priority order for things that need to be evaluated:

1. Anything that occurs across the entire site
2. Navigation
3. Anything used to accept payments or commit to legal contracts
4. Anything used during primary interaction with the site (core functions)
5. Common causes of accessibility problems, like images, forms, custom widgets, and multimedia
6. Things typically used by people with disabilities, like site maps
7. Things used to contact the organization
8. High-traffic areas (top 80%)

### Testing Pages

- Choose representative pages to test. Ideally, ones that cover the broadest range of content, semantics, and structure
- Choose pages built by different teams and compare components from each to each other
- Always test the home page

### Testing Templates

- Pick at least one or two pages from every template
- Evaluate the templates that are used for the most important or highest number of pages first, since errors will be widespread

### Testing Page Content

- Problems with images are the biggest contributor to accessibility problems on the web, either from missing alt text or having poor-quality alt text
- Tables are very tricky and easy to get wrong if they aren’t extremely simple, but they’re usually generated consistently, so fixing them tends to be relatively easy
- Forms are another huge contributor to accessibility issues and require comprehensive testing
- Most issues with frames can be detected automatically, and manual testing is often fast
- Multimedia accessibility issues are high-impact, so audio and video players need to be tested
- Custom widgets are easy to get wrong, so they need to be tested based on how widespread and high-impact they are

## An Example Testing Routine

1. Determine the scope for testing
2. Run automated tests (can catch about a third of all issues this way)
3. Perform manual testing for each of these areas of focus
    1. Keyboard Access (tab order, keyboard traps, focus indicators, etc.)
    2. Touch Access (touch target size, touch functionality)
    3. Visual Presentation (color contrast, conveying meaning through color alone)
    4. Alternative Text (going beyond what you can automatically detect, is the alt text actually good?)
    5. Audio and Video (captions, transcripts, and audio descriptions)
    6. Semantics and Document Structure (landmarks, headings, link text, etc.)
    7. Forms (labels and descriptive text, validation and feedback, etc.)
    8. Dynamic Content (does focus update correctly, is content added after the current position in the DOM, etc.)
    9. Custom Widgets (heavy focus on keyboard functionality, since it is created from scratch)
4. Document findings in an Accessibility Report
5. Plan for Remediation
6. Conduct Regression testing

## A Good Bug Report Template

- Title
- Issue Description
- Expected Results
- Platform and Assistive Technology
- Impact/Severity
- Steps to Reproduce
- Visual or Video
- Remediation

## Prioritizing Accessibility Bugs

- User Impact
    - Critical: the bug results in blocked content for individuals with disabilities, rendering content completely inaccessible (high risk of legal action)
    - Serious: the bug causes serious barriers for folks with disabilities, rendering some content inaccessible or requiring frustrating workarounds (vulnerable to legal action)
    - Moderate: the bug results in some barriers but does not block users from accessing key elements or content
    - Minor: the bug causes inconveniences but would not cause much frustration or difficulty in accomplishing tasks
- Time to Remediate
- Business Priority (core vs. secondary business functions)
- Location of Issues (high traffic vs. rarely visited pages)
- Volume (number of occurrences)
- Impact on Interface and Operation (does it require a significant redesign or effort to fix?)
- Secondary Benefit (do fixes help more than just people with disabilities?)

{% include 'partials/article-pagination.njk' %}
