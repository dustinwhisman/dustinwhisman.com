---
title: "Auditing My Site's Performance - Writing - Dustin Whisman"
description: I built this site to be performant, but are there still areas for improvement? In short, yes.
articleTitle: Auditing My Site's Performance
layout: default
date: 2023-02-03
tags:
  - writing
  - uncategorized
---

# Auditing My Site's Performance

{% include 'partials/published-date.njk' %}

A coworker recently challenged us fellow developers to run some audits with Lighthouse and [webpagetest.org](https://webpagetest.org) on our personal sites, address any issues they flag, then write about what we did to improve them. Challenge accepted!

To start, I ran Lighthouse on a fresh version of Chrome, meaning no extensions. Here are the results for my home page:

<img src="/images/auditing-my-sites-performance/lighthouse-before.png" alt="A screenshot of lighthouse scores, which all have a score of 100 except for performance, which has 99. The PWA check indicates that the site is not a PWA." class="cmp-article__image">

Pretty good I would say! But two things already stand out to me. 100 is clearly a better number than 99, and I thought I had checked everything off the PWA list already, so why doesn’t Lighthouse show my site as PWA-ready?

Let's dig into it.

## Performance

My home page’s score of 99 might not be representative of the whole site, so I went ahead and ran Lighthouse on some other pages, and wouldn’t you know it, it found some issues that didn’t happen on the home page.

### Fonts and Render-blocking Resources

When I look at the details for performance, I can see that I get dinged for using third party fonts, which are render-blocking.

<img src="/images/auditing-my-sites-performance/performance-fonts.png" alt="A screenshot of performance details indicating that third party fonts delay the rendering of a page by 0.77 seconds." class="cmp-article__image">

Fair enough, but it’s not a massive performance issue, and I could do any of these things to address it without much effort:

- Use `link[rel="preconnect"]` hints to load the fonts faster
- Self-host the fonts
- Use system fonts instead

WebPageTest reported other issues with the fonts, like them not being on CDNs and stuff like that. I think I’ll go ahead and replace them with system fonts, partially for performance and partially because I’m not too attached to the fonts I chose. For example:

<img src="/images/auditing-my-sites-performance/uneven-numbers.png" alt="An example of numbers displaying strangely for text including '1.3.6'. The 3 is lower than the 1, and the 6 is higher than the 3 and the 1." class="cmp-article__image">

I mean, what’s going on with these numbers? I’m sure there’s a way to normalize the height, but I think I’d rather just ditch the font for now.

My `/styles.css` file is considered a blocking resource, so occasionally Lighthouse or WebPageTest would recommend inlining my CSS. I’m not going to do that, though. My service worker is set up to pre-cache my styles, and we’re looking at less than 2.5kb compressed anyway, so I’m not concerned about it.

### Cumulative Layout Shift (CLS)

One issue detected on my [`/projects` page](/projects/) has to do with my `aria-current` styles for the links in the header.

<img src="/images/auditing-my-sites-performance/cumulative-layout-shift.png" alt="A visualization of subsequent links being displaced when the styles are applied to an earlier link in the navigation." class="cmp-article__image">

What’s happening is that as the CSS applies the styling, which is a text-transform to make the current page’s link uppercase, there’s a layout shift that pushes the other links to the right. Cumulative Layout Shift (CLS) is penalized somewhat harshly, so the page that this was caught on scored 89 out of 100 for performance. So I’ll definitely want to change those styles.

### Excessive DOM Size

I fully expected to find performance issues on the [`/cats` page](/cats/). I’ve just been dumping more and more cat pictures onto that page every week, and the current count is 174 pictures. Granted, I do have `loading="lazy"` set on nearly all of them, but still, that’s a lot of elements for the browser to account for.

I think pagination might be the best option here. I was already thinking it would be nice to include headings for the month and year, so I may just run with that and generate pages for each month that has pictures, like `/cats/2023-02` for February 2023.

Somewhat relatedly, on the home page, I have 4 cat pictures near the bottom that aren’t lazy loaded. That should be easy enough to fix, so I’ll plan on doing that as well.

### Trailing Slash Redirects

When I ran WebPageTest against `https://dustinwhisman.com/cats`, it reported that there was a 301 redirect for that request. It turns out this is due to how Netlify handles HTML files written as `cats/index.html` compared to `cats.html`. Netlify is effectively redirecting to an identical URL with a trailing slash.

Do I care that much about this? Not really, but I would rather not have unnecessary redirects happening when people click the links on my site, so I’ll be updating them to include trailing slashes. There may be methods in Netlify or Eleventy to change this behavior, but it’s not a big enough issue to warrant the effort, in my opinion.

## PWA Readiness

Going back to the mystery of why Lighthouse says my site isn’t PWA-ready, it shows this message about the `display` property needing to be either “standalone”, “fullscreen”, or “minimal-ui”.

<img src="/images/auditing-my-sites-performance/display-mode.png" alt="A screenshot from a Lighthouse report explaining that the display property must be one of three values." class="cmp-article__image">

This seems like a strange “requirement” to me. I recently changed my `display` property to “browser” because I decided it made more sense to open my site in a way that still had the browser chrome. My site is inherently “webby”, with links to other pages and external sites, and it’s not a super interactive app, so making it feel like a native app doesn’t make sense to me.

On my phone, I’m able to add my site to my home screen in different browsers, so it’s not like it’s not installable. I just think Lighthouse and I have different opinions about what counts as a PWA. I think it’s okay to have a bookmark to a site on your home screen, even if it doesn’t feel like a native app, but I guess that’s not factored into Lighthouse’s success criteria.

I'll try “minimal-ui” to see what that looks like in practice, but I may just leave it as-is.

## The Plan

Based on those audits, here’s what I plan to do:

- Replace my third party fonts with similar system font stacks
- Fix the CLS issue with my navigation links
- Lazy load the cat pictures on the home page
- Add pagination for the cat pictures
- Update links throughout the site to include trailing slashes
- Try other `display` values in my site manifest

I’ll follow this up with the results of these changes. Already there’s plenty to do, and that’s starting from a pretty good baseline. Try auditing your site in the same way. You might be surprised at what you find!

{% include 'partials/article-pagination.njk' %}
