---
title: "WAS Notes: Web Accessibility Testing with Screen Readers | Writing | Dustin Whisman"
description: "What do you need to know to be able to test sites with different screen readers?"
articleTitle: "WAS Notes: Web Accessibility Testing with Screen Readers"
layout: default
date: 2023-05-11T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Web Accessibility Testing with Screen Readers

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Screen Reader Basics

- Screen readers convert digital text to speech output or braille output
- The majority of screen reader users are blind or deafblind, but people with low vision, reading disabilities, or cognitive disabilities may also use screen readers. Some users may also choose to use them in eyes-free or hands-free environments
- Manually testing is necessary because automated testing can only catch certain issues
- Custom widgets in particular need manual testing for complex interactions
- Static HTML is usually fine to test in only one screen reader, but dynamic, interactive content should be tested in at least two screen readers to account for screen reader bugs and ARIA support
- There’s no way to detect whether the user is using a screen reader, so bake your screen reader support into your normal application

### Desktop Screen Reader Combinations

1. JAWS with Chrome
2. NVDA with Firefox
3. NVDA with Chrome
4. JAWS with IE (still?)
5. VoiceOver with Safari (macOS)
6. Narrator with Edge

### Mobile Screen Reader Combinations

1. VoiceOver with Safari (iOS)
2. TalkBack with Chrome (Android)

## Screen Reader Characteristics

- Screen readers typically do not have a visual interface, apart from maybe configuration options
- Since mice are irrelevant for blind users, screen readers rely on keyboard shortcuts, which are different for each screen reader
- In an approximation of skimming, users can jump around to different headings, landmarks, forms, and such, which is why semantic markup is so important
- Screen readers ignore CSS (mostly), which impacts text that you might want to be emphasized
- Mispronunciations are to be expected, and users can listen to the spelling of a word, so don’t do anything weird to try to correct pronunciation
- Screen readers won’t read most symbols, like punctuation, except for symbols like “$” or “&” that have meaning in language
- Abbreviations may be read as words or letter-by-letter, depending on the context, and some will read the `title` of an `abbr` tag, while others won’t
- A virtual buffer is used when converting HTML into parsed data screen readers can use, so it’s recommended to delay up to 2 seconds before moving focus to new content so slower devices can catch up instead of missing the dynamic updates

## Accessibility APIs

- Windows uses something called UI Automation as its accessibility API
- MS Edge (pre-chromium?) shows the Accessibility tree in its developer tools
- macOS lets you use Accessibility Inspector (available through Xcode) to see the accessibility tree
- Browsers construct their own accessibility trees that mainly care about semantic elements and show the following information:
  - Name
  - Description
  - Role
  - Property
  - Relationship
  - State

## Wayfinding and Reading Content with Screen Readers

- The page `title` is usually the first thing read upon page load (some screen readers may announce the number of headings, landmarks, links, and forms as well)
- If you load the page and do nothing else, the screen reader will read the entire page from start to finish
- Each screen reader lets you pause and play using keyboard shortcuts or touch gestures
- Some screen readers can list all headings, either in a tree view or a flat list, and typically you can jump to the next/previous heading
- Similarly, screen readers can list landmarks and let users navigate between them
- Listing all lists is less supported, but there’s often a way to navigate between lists
- For reading content, users can read continuously from a point or navigate line by line or sentence by sentence
- The Tab key is used to navigate to focusable elements only, skipping everything else
- With no Tab key equivalent on mobile devices, there may be options to navigate by links, like through VoiceOver’s rotor
- Screen readers say “graphic” before the alt text of an image (or filename if alt text is missing instead of `alt=""`)
- Screen reader users may resort to searching for text on the page
- Screen reader users often explore to find out what inputs are in a form, so inline validation can be annoying for them

## Screen Reader Modes

- VoiceOver doesn’t have a concept of modes, but JAWS and NVDA (and others) do
- Document/Browse/Scan mode is used for reading content and is the default mode for most screen readers
- Focus mode is for navigating only to focusable elements
- Application mode disables normal keyboard functionality, leaving it up to developers to implement keyboard shortcuts (not recommended)
- In application mode, regular text is not readable unless it’s wrapped in `role="document"`
- Forms mode is for… forms! Single-character hotkeys are disabled so users can type into text fields and such
- Only focusable items will be read when in forms mode, so make sure your error/description text is wired up with `aria-describedby` and such to avoid it being skipped
- Table mode is for navigating the cells in tables, and screen readers will read the table headers, then the cell contents (if only cell contents, the headers are probably not marked up correctly)

## JAWS (Windows)

- JAWS stands for Job Access With Speech and works well with Chrome, Edge, Firefox, and the deceased IE
- [JAWS cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/jaws-guide.pdf)

## NVDA (Windows)

- NVDA stands for Non-Visual Desktop Access and works best with Firefox and also works with Chrome and Edge
- [NVDA cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/nvda-guide.pdf)

## VoiceOver (iOS)

- VoiceOver works best with Safari (as if other browsers aren’t Safari on iOS)
- [Wordy VoiceOver iOS cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/voiceover-ios-guide.pdf)
- [Visual VoiceOver iOS cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/voiceover-ios-images-guide.pdf)

## TalkBack (Android)

- TalkBack works best with Chrome and works well with Firefox
- [Wordy TalkBack cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/talkback-guide.pdf)
- [Visual TalkBack cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/talkback-images-guide.pdf)

## VoiceOver (macOS)

- VoiceOver works best with Safari
- [VoiceOver cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/voiceover-macos-guide.pdf)

## Narrator (Windows)

- Narrator works best with Edge (pre-chromium?)
- [Narrator cheat sheet](https://media.dequeuniversity.com/en/courses/generic/testing-screen-readers/2.0/docs/narrator-guide.pdf)

## Most Important Things to Know for Testing with Screen Readers

- Recommended screen reader/browser combinations
- How to read the next item
- How to navigate to the next heading
- How to navigate to the next landmark region
- How to list all elements/pull up the elements list
- How to click a link/button
- How to open rotor/menu/scan mode
- How to cycle through reading controls
- How to navigate tables
