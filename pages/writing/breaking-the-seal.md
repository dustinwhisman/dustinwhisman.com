---
title: "Breaking the Seal - Writing - Dustin Whisman"
description: "In which I describe why I've decided to break my no-client-side JavaScript rule for this site."
articleTitle: "Breaking the Seal"
layout: default
date: 2023-06-22T00:00:00.000Z
tags:
  - writing
  - uncategorized
---

# Breaking the Seal

{% include 'partials/published-date.njk' %}

Up until now, I've had absolutely zero client-side JavaScript running on my site. There was always JS to build the site via Eleventy, but nothing would run on the browser. I've been happy with this setup, but this self-imposed restriction only works if it makes sense, and I'm not so sure that it does anymore.

Partially because of this rule, I opted to use Edge Functions to handle some special logic for [CSS Naked Day](/writing/css-naked-day-2023) and keep the current year up to date in the footer. The other reason was to experiment with this new-ish feature that Eleventy 2.0 and Netlify supported, just to get a sense of how it works and what you could do with it.

As cool as playing around with new techniques was, I was a little uneasy about the _implications_. This choice meant that my site would **have** to be hosted by Netlify. I like Netlify as a provider, but I get concerned about vendor lock-in, so I'd like to be able to pick up and go somewhere else if things change for whatever reason.

The use of Edge Functions also meant that every request for my site would require a little pre-processing before serving up the page. I never noticed any real performance problems with this, but it felt like overkill for something that would apply to maybe 7 days out of the year.

The news that [Netlify is no longer sponsoring Eleventy](https://www.zachleat.com/web/eleventy-side-project/) was enough of a nudge for me to want to eliminate that dependency. So I did a little refactoring, and now there's a small client-side script that accomplishes the same goal as the Edge Function. This also solves a paper cut from using Netlify Dev locally, which would often crash during hot-reloading, so I'd have to reload the page manually.

Initial testing shows that the Time to First Byte (TTFB) is about 200ms faster without the Edge Function, so I think the trade-off is worth it. The vast majority of the time, the script will effectively be a no-op, and the most work it will ever do is remove, add, or update a couple of elements on the page.

Even though the client-side JS seal is broken, I don't anticipate doing anything too fancy with this site. Accessibility and performance are still my top priority, but if something comes up that makes sense and can only be done on the client, why not go for it?

{% include 'partials/article-pagination.njk' %}
