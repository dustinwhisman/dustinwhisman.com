---
title: "Responsive Design and Zoom - WAS Notes - Writing - Dustin Whisman"
description: "What are the accessibility considerations we need to account for that relate to Responsive Design and Zoom?"
articleTitle: "Responsive Design and Zoom"
layout: default
date: 2023-03-14T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Responsive Design and Zoom

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Responsive Design

- Responsive design is low vision design
- Low-vision users may use built-in zoom features or more beefy screen magnifiers
- Desktops are generally more capable/useful when zoomed in than mobile devices
- Keep breakpoints to a minimum, ideally where the design breaks instead of arbitrary device dimensions
- Retina displays will interpolate CSS pixels, so even if the device is 800 “real” pixels wide, it will be treated as having a width of 400 CSS pixels
- A good responsive design avoids horizontal overflow, especially for form fields and labels (put the labels above the inputs)
- `max-width`, `srcset`, and the `picture` tag with `source` tags are great for managing responsive images
- Tables are very tricky for responsive design, especially if there are many columns—you may need to get creative and re-flow the table into one column
- By default, text will re-flow based on screen size, so try not to break that. You may need to add hyphen rules if your font size and words are both large
- Sometimes you need to re-size, hide, or simplify UI elements on small screens or when zoomed in (like hamburger menus)

## Zoom

- ZoomText and MAGic are two popular screen magnification tools
- Most browsers allow full-page zooming and text-only zooming that leaves images and such alone (this can mess with the layout)
- The page should still be readable and usable when zoomed in to 200% (check that line height, paragraph spacing, letter spacing, and word spacing are all adequate)
- Unless it’s essential, content must not scroll in two directions, even when zoomed in
- Use `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- The smaller the screen or the more zoomed in, the fewer columns there should be
- Avoid fixed widths and minimum widths as much as possible, since those are the main cause of most responsive design/zoom issues
- Use high-res images or vector graphics so that zooming in doesn’t result in poor image quality
- Don’t force landscape or portrait orientation unless it’s essential
- Large touch targets are best (44px by 44px minimum, except for inline links)

{% include 'partials/article-pagination.njk' %}
