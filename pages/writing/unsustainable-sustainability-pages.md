---
title: "Unsustainable Sustainability Pages - Writing - Dustin Whisman"
description: "Let's take a look at the top 10 companies in the Fortune 500 and see how sustainable their sustainability pages are."
articleTitle: "Unsustainable Sustainability Pages"
layout: default
date: 2023-04-19T00:00:00.000Z
tags:
  - writing
---

# Unsustainable Sustainability Pages

{% include 'partials/published-date.njk' %}

I recently did some competitive analysis work for a project, and part of that involved going to a handful of corporate websites to evaluate their messaging about things like community outreach, diversity, equity, inclusion, and sustainability. A while before that, I ran across [websitecarbon.com](https://www.websitecarbon.com/), which is a tool that estimates the carbon footprint of websites, so the thought occurred to me to measure how sustainable the Sustainability pages were for the websites I was looking at.

These are not those websites, but with Earth Day coming up, I thought it would be fitting to take a look at the Sustainability pages of the top 10 companies in the Fortune 500 to see who's walking the walk. In theory, these should be the best-equipped corporations to tackle climate change, or they should at least be able to make sure their own websites are sustainable, right?

## The Fortune 500 Top 10

Should this be in reverse order like a countdown? Eh, who cares, let's just get into it.

My methodology was to search for "&lt;company-name&gt; sustainability" and find the most relevant link from the results. I'd plug that URL into [websitecarbon.com](https://www.websitecarbon.com/) and see what it returned, which would either be "&lt;url&gt; is dirtier than X% of web pages tested" or "&lt;url&gt; is cleaner than X% of web pages tested". For clarity, I'll use emojis to denote how they did: ❌ for bad results, ✅ for good results, or both for mixed results.

I also ran Lighthouse audits on each page to get performance and accessibility scores because performance correlates pretty well with sustainability and because I care about accessibility.

### 1. Walmart ❌

Walmart's [sustainability page](https://corporate.walmart.com/purpose/sustainability) was dirtier than 86% of pages tested, scored 49 on performance, and scored 83 on accessibility.

### 2. Amazon ✅

Amazon's [sustainability page](https://sustainability.aboutamazon.com/) was cleaner than 89% of web pages tested, scored 87 on performance, and scored 100 on accessibility.

### 3. Apple ❌

Apple's [sustainability page](https://www.apple.com/environment/) was dirtier than 68% of web pages tested, scored 62 on performance, and scored 94 on accessibility.

### 4. CVS Health ❌

CVS Health's [sustainability page](https://www.cvshealth.com/impact/healthy-planet/sustainability.html) was dirtier than 60% of web pages tested, scored 61 on performance, and scored 86 on accessibility.

### 5. UnitedHealth Group ❌

UnitedHealth Group's [sustainability page](https://sustainability.uhg.com/) was dirtier than 73% of web pages tested, scored 37 on performance, and scored 81 on accessibility.

### 6. ExxonMobil ❌

ExxonMobil's [sustainability page](https://corporate.exxonmobil.com/news/reporting-and-publications/sustainability-report) was dirtier than 91% of web pages tested, scored 74 on performance, and scored 96 on accessibility.

### 7. Berkshire Hathaway ✅ ❌

Berkshire Hathaway's [sustainability page](https://www.berkshirehathaway.com/sustainability/sustainability.html) was cleaner than 98% of web pages tested, scored 100 on performance, and scored 91 on accessibility. Don't get too impressed, though. If you visit that page, it's just a list of links, so failing to get a score of 100 on accessibility is impressive. Looking at [Berkshire Hathaway Energy](https://brkenergy.com/about-us/sustainability.aspx) instead, it's dirtier than 70% of pages tested, scored 58 on performance, and scored 93 on accessibility.

### 8. Alphabet ✅

Alphabet's [sustainability page](https://abc.xyz/investor/other/sustainability-and-related-information/) was cleaner than 98% of web pages tested, scored 99 on performance, and scored 80 on accessibility. This one is also barely more than a list of links, so let's look at Google's [sustainability page](https://sustainability.google/) instead. That's cleaner than 80% of web pages tested, scored 69 on performance, and scored 93 on accessibility.

### 9. McKesson ✅

McKesson's [sustainability page](https://www.mckesson.com/About-McKesson/Impact/) was cleaner than 56% of web pages tested, scored 27 on performance, and scored 96 on accessibility.

### 10. AmerisourceBergen ✅

AmerisourceBergen's [sustainability page](https://esg.amerisourcebergen.com/) was cleaner than 56% of web pages tested, scored 53 on performance, and scored 86 on accessibility.

## Analyzing the Results

Overall, the results are pretty bad. Only Amazon and Alphabet/Google had what I would describe as "good" results and meaningful content at the same time. Interestingly, putting more effort into their sustainability pages seems to have worked against some of these companies' favors. For example, Walmart's page is very flashy, has scroll-based animations, and visually appealing story-telling, and it got the second worst score. Whereas slapping together a list of links and barely styling it at all gets the best score.

There's a tradeoff there–the most performant page you'll ever see is [about:blank](about:blank), but it's completely useless. However, by designing a page that ends up being very resource-heavy with the goal of convincing people that you care about sustainability, it kind of undermines the point.

## So What?

My point isn't to drag these companies for doing a bad job (well, maybe it is a little bit), but to point out that websites, despite being abstract and digital, consume a lot of energy and generate a lot of carbon. Servers use a lot of power, and client-side JavaScript can eat up your phone's battery if overused, so we should pay attention to that and do what we can to improve the sites we build.

And in the interest of fairness, I ran the same checks on some pages on my own site, and they were cleaner than between 92% and 97% of pages tested, and my performance and accessibility scores were 100s across the board 😉
