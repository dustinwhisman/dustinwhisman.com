---
title: "WCAG 2.2 Enough Time | WAS Notes | Writing | Dustin Whisman"
description: "How do you meet all of the success criteria for 2.2 Enough Time?"
articleTitle: "WCAG 2.2 Enough Time"
layout: default
date: 2023-02-09T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: WCAG 2.2 Enough Time

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## 2.2.1 Timing Adjustable - Level A

Whenever there is a time limit, at least one of the following is true:

- The user can turn off the time limit
- The user can adjust the time limit to up to ten times the default
- The user can extend the time limit up to twenty seconds after being prompted, and they can do it with a simple action up to ten times
- There is no possible alternative to the time limit, such as for an auction
- The time limit is essential to the activity
- The time limit is longer than twenty hours

### How to Succeed

- Offer controls for turning time limits off or increasing them
- Warn users when time is about to expire, and let them extend the timer
- Allow pause/continue functionality
- Provide a mechanism for displaying moving, scrolling, or auto-updating content in a static area

### How to Fail

- Use a meta redirect or meta refresh with a time limit
- Redirect pages after a time-out without warning the user

## 2.2.2 Pause, Stop, Hide - Level A

For moving, blinking, scrolling, or auto-updating information that starts automatically, lasts more than five seconds and is presented in parallel with other content, there is a mechanism for users to pause, stop, or hide it unless it is essential.

For auto-updating information, there is also the option to control the frequency of updates unless the frequency is essential.

### How to Succeed

- Allow content to be paused, then resumed from the same point
- Avoid blinking content that lasts more than 5 seconds
- Respect user agent choices to prevent blinking content, such as gifs
- Provide controls to stop such content or reload the page without it

### How to Fail

- Include such content without providing controls to pause, stop, or hide it
- Use the `blink` element or `text-decoration: blink`

## 2.2.3 No Timing - Level AAA

Timing is not an essential part of the content, except for non-interactive synchronized media and real-time events. There are no time limits whatsoever.

## 2.2.4 Interruptions - Level AAA

Interruptions can be postponed or suppressed by the user, as long as they aren’t critical.

### How to Succeed

- Let users postpone automatic updates or change the frequency of updates
- Let users request updates rather than updating automatically
- Make nonessential alerts optional

### How to Fail

Use meta redirects or meta refreshes with a time limit.

## 2.2.5 Re-authenticating - Level AAA

When the user’s session expires, they can continue without loss of data after re-authenticating.

### How to Succeed

- Save data so it can be used after re-authenticating
- Encode user data in a re-authorization page (if it can’t live on a server for some reason)

### How to Fail

Don’t implement re-authentication after session time limits, or do so in a way that loses data.

## 2.2.6 Timeouts - Level AAA

Users are warned about timeouts that could cause data loss unless that data is preserved for more than twenty hours of inaction.

### How to Succeed

- Set session timeouts to twenty hours or more
- Store user data for more than twenty hours
- Warn users about inactivity duration limits at the beginning of a process
