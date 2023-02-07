---
title: 'WAS Notes: WCAG 1.4 Distinguishable | Writing | Dustin Whisman'
description: How do you meet all of the success criteria for WCAG 1.4 Distinguishable?
articleTitle: 'WAS Notes: WCAG 1.4 Distinguishable'
layout: layout.njk
date: 2023-02-07T00:00:00Z
tags:
  - writing
  - learning in public
  - WAS certification
---

# WAS Notes: WCAG 1.4 Distinguishable

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

<p class="cmp-fine-print">
  Published:
  <time datetime="{{ page.date.toISOString() }}">
    {{ page.date.toLocaleDateString(undefined, { timeZone: 'UTC' }) }}
  </time>
</p>

## 1.4.1 Use of Color - Level A

Color is not the only visual means of conveying information.

### How to Succeed

- Provide a text equivalent to convey the same information
- Include additional visual cues (such as underlines for links)
- Use a contrast ratio of at least 3:1 with surrounding text and use hover/focus states (this is if underlines aren’t an option, I guess)
- Use different patterns or shapes in addition to color (like for bars in a bar graph or icons on a map)

### How to Fail

- Include a text alternative that does not convey the same information as the color
- Create links that are not evident as links without color vision
- Identify required/error fields with color only

## 1.4.2 Audio Control - Level A

There is a mechanism to pause or stop any audio that plays automatically for more than 3 seconds. Alternately, there is a mechanism to turn that audio down independently from system volume.

### How to Succeed

- Only play sounds on user request
- Turn off automatically played sounds within 3 seconds
- Provide a control near the beginning of the page to turn off automatically played sounds

### How to Fail

- Automatically play a sound for more than 3 seconds without letting users turn it off
- Don’t provide a method to pause or stop autoplaying media

## 1.4.3 Contrast (Minimum) - Level AA

Text and images have a contrast ratio of at least 4.5:1, except for large text, which can be 3:1. Incidental and purely decorative text or images of text are exempted, as well as logotypes.

### How to Succeed

- Maintain a contrast ratio of at least 4.5:1 between text and background
- Use default text and background colors (seems unlikely)
- Provide alternate presentations with higher contrast, and a control to switch to them that meets the minimum contrast
- For 18 point (or 14 point bold) text or larger, maintain a 3:1 contrast ratio

### How to Fail

- Specify foreground colors without specifying background colors or vice versa
- Use insufficient contrast between text and background

## 1.4.4 Resize Text - Level AA

Text can be resized without assistive technology up to 200 percent without loss of content or functionality.

### How to Succeed

- Use relative units like `em` or `rem` to set the size of text containers
- Use relative font sizes, such as by using `em`, `rem`, `%`, or named font sizes
- Calculate size and position in a way that scales with font size (`em` and `rem` units are your friend)
- Use liquid layouts (rather than pushing content off-screen)
- Ensure content is not lost when zoomed in to 200%

### How to Fail

- Crop images, truncate text, or otherwise lose content when zoomed in up to 200%
- Keep form controls the same size, even as the text they contain is magnified
- Use viewport units exclusively to size text, such as `font-size: 1vw`. Using them in conjunction with other units may be fine, but test!

## 1.4.5 Images of Text - Level AA

When possible, text is used rather than images of text, except for when the text is customizable by the user or the presentation of the text is essential to the information conveyed.

### How to Succeed

- Use CSS to style the presentation of text instead of using images
- Provide the option to view text or the image of text
- Separate information/structure from presentation

## 1.4.6 Contrast (Enhanced) - Level AAA

The contrast ratio between text and background is at least 7:1, except for large text, which can be as low as 4.5:1. The same success and failure techniques apply as in 1.4.3 Contrast (Minimum) but with the higher contrast values.

## 1.4.7 Low or No Background Audio - Level AAA

There is no background audio that isn’t able to be turned off where background sounds are not 20 dB quieter than speech. This applies to audio of speech that isn’t an audio CAPTCHA or audio logo or vocalization intended for musical expression.

### How to Succeed

- Just don’t
- Seriously, can you imagine a site that did that?
- Mix audio files so non-speech sounds are at least 20 dB lower than speech sounds

## 1.4.8 Visual Presentation - Level AAA

It is possible to achieve the following with the visual presentation of blocks of text:

- Allow users to choose foreground and background colors
- Keep width at or below 80 characters/glyphs wide (or 40 for CJK)
- Align text rather than justifying it
- Keep line spacing at or above 1.5 within paragraphs, and the space between paragraphs at least 1.5 times larger than line spacing
- Resize text to up to 200 percent without horizontal scrolling

### How to Succeed

- Don’t specify text or background colors for main content
- Allow users to set the text and background colors
- Don’t set widths in such a way to interfere with reflow of text
- Use relative measurements to keep text to 80 or fewer characters per line
- Left-align or right-align text (never justify for body copy)
- Provide mechanism to remove text justification
- Allow users to increase line/paragraph spacing
- Set line-height and margins on paragraphs accordingly
- Size text appropriately with relative units

### How to Fail

- Specify foreground colors without specifying background colors or vice versa
- Justify text

## 1.4.9 Images of Text (No Exception) - Level AAA

Images of text are only used for decoration or when the presentation is essential to the information being conveyed. This is basically a stricter version of 1.4.5 Images of Text, omitting the customizable aspect.

## 1.4.10 Reflow - Level AA

There is no loss of content or need for scrolling in two dimensions for vertical scrolling content at 320 pixels wide or horizontal scrolling content at 256 pixels tall. Content where two-dimensional layout is important for usage or meaning is exempt.

### How to Succeed

- Use media queries, CSS Grid, and/or CSS Flexbox to reflow content
- Allow long URLs and strings of text to wrap
- Use width, max-width, and flexbox to fit labels and inputs appropriately
- Calculate size and position in relation to text size (`em` and `rem` type units)
- Provide options to switch to a different layout that doesn’t require scrolling
- Reflow simple tables on small screens

### How to Fail

- Use fixed size containers and fixed position content
- Use preformatted text or exclude preformatted text to avoid two-dimensional scrolling

## 1.4.11 Non-text Contrast - Level AA

User interface components and graphical objects have a minimum 3:1 contrast ratio against adjacent colors.

### How to Succeed

- Use highly visible focus indicators
- Make sure icons have at least a 3:1 contrast ratio with their background
- Provide contrast at boundaries between colors

### How to Fail

Remove the visual focus indicator or make it invisible.

## 1.4.12 Text Spacing - Level AA

With the following conditions, there is no loss of content or functionality:

- Line height of 1.5
- Paragraph spacing of 2 times the font size
- Letter spacing of 0.12 times the font size
- Word spacing of 0.16 times the font size

### How to Succeed

- Allow for text spacing override
- Allow for text spacing without wrapping

### How to Fail

Don’t allow for spacing override.

## 1.4.13 Content on Hover or Focus - Level AA

Content that becomes visible or hidden on hover/focus interactions meets these criteria:

- They are dismissable without moving pointer hover or keyboard focus
- The pointer can move over the additional content without causing it to disappear
- The content remains visible until hover/focus is removed or dismissed by the user

### How to Succeed

- Use `role="tooltip"`
- Use hover and focus pseudo classes

### How to Fail

- Make the content shown on hover not be hoverable
- Don’t make the content dismissable without moving the pointer or keyboard focus
- Hide content without a change in hover/focus state if the user didn’t dismiss it
