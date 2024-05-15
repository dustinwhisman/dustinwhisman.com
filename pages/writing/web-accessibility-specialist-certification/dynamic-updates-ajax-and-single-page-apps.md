---
title: "Dynamic Updates, AJAX, and Single Page Apps - WAS Notes - Writing - Dustin Whisman"
description: "What are the accessibility considerations related to dynamic updates, AJAX, and Single Page Apps?"
articleTitle: "Dynamic Updates, AJAX, and Single Page Apps"
layout: default
date: 2023-04-18T00:00:00.000Z
tags:
  - writing
  - WAS certification
---

# WAS Notes: Dynamic Updates, AJAX, and Single Page Apps

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}

## Options for Notifying Users of Changes

- Load a new page or reload the page (look Ma, no JavaScript!)
- Move the focus to the new content, like a modal dialog
  - Be sure to set `tabindex="-1"`
  - Moving focus should be the result of a user’s actions, not automatic
  - Move focus after all the operations for loading the new content are finished
- Use ARIA live announcements
  - The ARIA live region needs to exist and be empty before making an announcement, you can’t just drop a new live region in and expect it to work
  - Keep announcements brief and remove them soon after the announcement is made to avoid stale announcements from being made
  - You may visually hide announcements if they wouldn’t make sense to sighted users

## Time Limits

- Users must be warned about session expiration before it ends and they must have enough time to save their data and/or extend the session (two minutes is generally fine)
- Data should not be lost after a session timeout
- If data would be lost after a timeout of less than 20 hours, let the user know upfront so they can plan
- When there are fixed deadlines, you should provide a countdown with ARIA live announcements at strategic intervals (not so often they’re overwhelming)
- In some cases, putting the time remaining in the `title` can help users know when they load the page how much time they have
- Don’t automatically refresh or reload pages to keep content fresh, instead recommend that the user refresh or reload when new content is available or something has been updated

## AJAX

- Lazy loading works well unless the user ends up at the blank area where content hasn’t loaded yet—use placeholders to let screen readers know stuff is being loaded
- Too many ARIA live messages can make things worse if every new “content loaded” message is announced—if it’s meant to load quickly, don’t announce it
- Don’t use infinite scrolling if it means you can’t get to the footer or similar content, especially with the keyboard
- An alternative to automatic infinite scrolling would be a “load more” button at the end of the infinite scrolling section
- For actions that take a while, move focus to an interstitial message or announce it via ARIA live region
- For Single Page Applications (SPAs), you should either:
  - Move the focus to the heading at the start of the new content, making sure the container has `tabindex="-1"` (preferred option)
  - Use ARIA live regions to announce the new content, possibly including “page loading” if there could be a long delay
- You must update the browser history when an AJAX operation does something that makes it seem like the back button should work, and the back/forward button should work as expected

{% include 'partials/article-pagination.njk' %}
