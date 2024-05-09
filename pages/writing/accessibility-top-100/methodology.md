---
title: "Methodology for evaluating the top 100 US sites' accessibility issues - Writing - Dustin Whisman"
description: "I will be evaluating the top 100 US websites for accessibility issues, and this is my plan for how to approach each one the same way, minimizing inconsistency as much as possible."
articleTitle: "Methodology for evaluating the top 100 US sites' accessibility issues"
layout: default
date: 2024-01-15T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# Methodology for evaluating the top 100 US sites' accessibility issues

{% include 'partials/published-date.njk' %}

Every year, [WebAIM](https://webaim.org/) releases [the WebAIM Million](https://webaim.org/projects/million/), which reports the state of accessibility of the top 1,000,000 home pages on the web. Every year, the results are… bad. Very bad. In the 2023 report, 96.3% of home pages had automatically detectable WCAG 2.1 failures. Note that these are only the issues that can be automatically detected by the [WAVE accessibility engine](https://wave.webaim.org/), and WebAIM only evaluated home pages, which are often geared more toward marketing than the actual core product features, so the reality is most likely even worse than the (already terrible) numbers indicate.

I plan on taking a look at the [top 100 websites in the US](https://ahrefs.com/blog/most-visited-websites/) to see what accessibility issues they have and how they could be fixed. If enough common issues emerge, and I suspect they will, I will write companion pieces to go in more depth about those specific issues.

So here's the plan for how I'm going to approach each site. I'm going to try to keep things as consistent as possible, but things may change either from website-specific quirks or from advances in tooling over time.

## Browser choice and settings

I plan on using an up-to-date version of Chrome in incognito mode with no extensions other than the ones for accessibility tools. I'll be using [axe DevTools](https://www.deque.com/axe-devtools-accessibility-testing/) and [IBM Equal Access Accessibility Checker](https://www.ibm.com/able/toolkit/verify/automated) to scan for automatically detectable issues. I'm using Chrome partly because of its popularity and partly because it's more likely to allow third-party trackers and serve ads than other, more privacy-minded browsers.

I don't plan on doing extensive screen reader testing, but if I find something noteworthy, I'll use a variety of screen reader and browser combinations to illustrate how different screen readers might announce something.

## Choosing what to evaluate

In addition to each site's home page, I plan on evaluating one or two primary features—the things that people come to the site to do. That's going to vary depending on the site, but I'm going to try approach the site as an average, passive user. That means reading articles on Wikipedia rather than editing them, and viewing videos on YouTube rather then publishing them. For those sites with user-generated content, I may come back to them later and evaluate them as a creator, but I want to try to limit the scope of this to something reasonable.

If a site requires a login to do the main thing, I'll evaluate the account creation process and attempt to create a burner account using only the keyboard. If that's not possible or it costs money to sign up, I'll call it there. Otherwise, I'll pick another primary feature to evaluate. I'll deactivate or delete the burner accounts when I'm done.

## Automated scans

Once I've chosen what to evaluate, I'll run automated scans with the browser extensions I mentioned earlier. I'll make note of the most critical or widespread issues, including ones that require manual review.

I'll scan each page twice, once at typical desktop sizes, and once while simulating a mobile browser. This is to account for things like hamburger menus and other variations that only happen on small screens.

## Manual testing

Some components are going to stand out as areas that require investigation, so I'll be looking at those before jumping into keyboard testing. For example, a search form with autocomplete suggestions is highly likely to have issues, so I'll take a look at the markup and ARIA usage to see whether anything there is out of place. I'll also spot check images to check that alt text is at least halfway decent. Automated scans will only indicate if the `alt` attribute is present, so this is about making sure that decorative images are presented as such and that informational images have good, descriptive alt text.

Then I'll do keyboard testing, checking that the tab order makes sense, that repeated blocks can be skipped, and that all complex components work as expected with the keyboard. I'll also be on the lookout for anything that seems like it can only be done via mouse or by touch.

Then I'll do a couple quick checks at 200% and 400% zoom level to make sure content doesn't overflow or get lost. Any noteworthy issues will get added to the list.

## Page weight and resource breakdowns

While not strictly related to accessibility, I'm going to track the initial page weight of the pages that I test, ignoring anything that gets loaded after interactions or scrolling down the page. I'll break it down by these resource categories: HTML, CSS, JS, fonts, images, and media. I'll ignore any category where the page loads 0 bytes of data.

Why track these numbers? I have a hunch that there will be a correlation between page weight and accessibility issues. I would expect more lightweight pages that lean on HTML and CSS to be more accessible than ones that rely heavily on JS. We'll see if that theory checks out as I check out more of these sites.

## Caveats

These are not going to be full site audits, and I'm not going to write up detailed reports. The goal here is education, so I'm going to find the most noteworthy or most common issues and explain how to avoid them or fix them. I'll also include the date that I evaluated the site, so if you check for the same issues later, and they're fixed, great! That means progress has been made.

This is not an endorsement of any of these sites. The top 100 is pretty likely to feature companies with questionable business practices. However, this is also not a condemnation. Accessibility is a nuanced topic that isn't prioritized when educating developers, and there's no such thing as an "accessible website." There are only more or less accessible websites.

Don't bully any websites on this list, but if you can encourage them to fix the issues they do have, that's going to be hugely impactful for the people who currently encounter barriers on those sites.
