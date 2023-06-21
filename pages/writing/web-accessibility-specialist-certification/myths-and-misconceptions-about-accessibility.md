---
title: 'WAS Notes: Myths and Misconceptions About Accessibility | Writing | Dustin Whisman'
description: This is a summary of some common arguments used to avoid building for accessibility and why those arguments are ultimately wrong.
articleTitle: 'Myths and Misconceptions About Accessibility'
layout: default
date: 2023-01-17
tags:
  - writing
  - WAS certification
---

# WAS Notes: Myths and Misconceptions About Accessibility

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Myth: Accessibility benefits only a small minority

### Truth: Accessibility benefits a wide variety of people

- Making things easier for disabled people to use also makes them easier for everyone to use
  - Accessible websites work better on different devices, browsers, and operating systems (including older versions)
  - They’re also easier for SEO bots to index and catalog, making them easier to find
  - They’re easier to use in different situations (bright sunlight, one-handed, etc.)
- Anyone can acquire a disability, such as:
  - Diminished senses or cognition due to age
  - Injuries and illnesses, both temporary and long-term
- Disabilities are a sizeable minority
  - About 20% of the population has some sort of disability
  - It’s not a nice-to-have, it’s necessary and non-negotiable

## Myth: Accessibility is a short-term project

### Truth: Accessibility is an ongoing design requirement

- There will never not be a need to provide accessible experiences
- Accessibility needs to a part of every step of the development process, including business requirements
- Company culture is essential–the leaders have to make accessibility a priority, or else it will be haphazard
- It’s best to have full-time jobs just for accessibility, since experts will be able to coordinate efforts more effectively than folks who are only focused on it part-time
- Hiring people with disabilities goes a long way

## Myth: Accessibility should be the last step

### Truth: Designing for accessibility is easier than retrofitting for accessibility

- Bolting on doesn’t really work and usually ends up being a bad user experience even if it is technically functional
- Adding accessibility at the end is harder than building for it at the start
- If saved for last, it might simply not happen at all
- This approach indicates systemic neglect
- Poor planning is not a shield from legal liability

## Myth: Accessibility is hard and expensive

### Truth: It’s cheaper than the alternatives

- Baking accessibility into every step of the process is cheaper than retrofitting, starting over, or defending against lawsuits
- Lawsuits are expensive (even if you win or avoid going to court)
- Negative publicity is expensive

## Myth: Accessibility is ugly

### Truth: Accessible websites can be just as beautiful or ugly as any other site

- There’s nothing visible about alt text or ARIA attributes, and we have CSS to style everything else (headings, labels, semantic elements, focus states, etc.)
- Color contrast is a limitation of how wild you can go with design, but it’s perfectly achievable without being ugly
- Skip links can be invisible until focused
- You may need to simplify things for folks with cognitive disabilities, but that won’t automatically ruin the design
