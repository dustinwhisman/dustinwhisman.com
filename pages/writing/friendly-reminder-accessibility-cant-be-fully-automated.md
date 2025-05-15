---
title: "Friendly reminder: accessibility can't be fully automated - Writing - Dustin Whisman"
description: "I know there's a lot of marketing buzz about the potential for AI to solve accessibility forever, but so far, not so good."
articleTitle: "Friendly reminder: accessibility can't be fully automated"
layout: default
date: 2025-05-15T00:00:00.000Z
tags:
  - writing
  - uncategorized
---

# Friendly reminder: accessibility can't be fully automated

{% include 'partials/published-date.njk' %}

It's Global Accessibility Awareness Day (GAAD), which feels like a good time to check in on where we're at in terms of fixing or preventing accessibility issues on the web. [The WebAIM Million report from this year](https://webaim.org/projects/million/) shows that across one million home pages, 94.8% of them had automatically detectable WCAG 2 failures. That's a slight improvement over 95.9% in 2024, but I'd hardly call it encouraging.

From the report:

> Over the last several years the proportion of pages with fewer errors has increased while the number of pages with many errors has also increased—pages with fewer errors have gotten better while pages with many errors have gotten worse.

This tells me that website owners and developers that care are working to improve things, while the ones that don't care are making things worse. To me, the latter group seems likely to enthusiastically accept AI-generated code so long as it "works" without checking for accessibility issues.

## How about that AI-generated code?

The large language models (LLMs) that power AI tooling to generate code have to be trained on a massive amount of real-world code, but as we learned from the WebAIM report, the vast majority of that real-world code ranges from flawed to completely broken. [I've looked at a fair share of it myself](/writing/accessibility-top-100/), and I wouldn't trust any AI tool that had been trained on the code from those sites.

Someone who is vibe coding a website probably either doesn't know enough to know what to check for, or they don't care enough to check at all. I would wager that vibe-coded sites will either be used by only a few people or they'll buckle under the weight of performance and security problems long before accessibility becomes a priority, so I'm not too concerned about them.

However, it's worth noting that high profile, "no code" tools like Figma Sites tend to produce [inaccessible garbage](https://www.joedolson.com/2025/05/the-true-path-to-garbage-code-figma-sites/). Even on sites they built with it to showcase how good the tool is, there are [hundreds of automatically detectable issues](https://adrianroselli.com/2025/05/do-not-publish-your-designs-on-the-web-with-figma-sites.html). These kinds of tools are attractive to business owners, and I do think that widespread use could lead to pretty bad outcomes for people with disabilities (and frankly just people at large).

As AI tools proliferate, I'm predicting a buggier, less accessible web in the near future. I'd love to be wrong.

## How about automated testing?

Despite some wild claims from people who should know better, accessibility audits will not be 100% automated by the end of 2025. I don't care how bullish you are about AI's abilities, that's ridiculous.

The main problem is context. An automated tool can detect whether an image has an `alt` attribute, whether it's empty, and it can check whether it follows patterns that are bad practice, like starting with "image of". But they can't determine if alt text actually describes the image in a way that is useful. Sometimes a literal description of what is featured in the image makes sense, but other times there are emotional details, cultural context, or assumed knowledge that would affect how an image should be described.

That's just one type of issue that can't be fully tested automatically, and there are far more involved testing scenarios that require humans exercising their judgment based on context to determine whether there are accessibility barriers or not, or how severe those barriers are. Anyone who tells you otherwise is selling you something that cannot work as advertised.

## How about the law?

There are two big elephants in the room; the current US government's hostility to anything resembling compassion, and the European Accessibility Act (EAA), which takes effect in June 2025. The former may give businesses the idea that they can avoid or delay making their products accessible, since enforcements may be less likely, and the latter may inspire panic in businesses that operate in Europe that didn't get their act together after the EAA was passed in 2019.

Even if Trump signs an executive order saying that "accessibility efforts are discriminatory, actually," that shouldn't affect existing legal requirements. Formal complaints and lawsuits are still the primary way to enforce those requirements, and different state and federal district judges will most likely still use the laws on the books, such as the Americans with Disabilities Act (ADA), to decide cases. It's always been the law to make websites accessible, and not doing so is still risky, even if you think you can get away with it.

I'll be interested to see how the EAA taking affect changes things. Europe has proven willing to [levy massive fines against companies like Apple and Meta](https://arstechnica.com/tech-policy/2025/04/apple-and-meta-furious-at-eu-over-fines-totaling-e700-million/) for violations of the Digital Markets Act (DMA), so similar penalties might prompt some change. The ideal outcome is for products to made accessible, though, so I'm less on board with huge fines for accessibility violations than for antitrust issues. We'll see how it goes.

I've seen a fair amount of marketing/fear-mongering like "are you ready for the EAA?" coming from organizations looking to sell solutions that will magically fix all accessibility issues forever, and it's worth noting that those do not and will not work, and you would still be subject to legal risk if you used them. Please hire human accessibility experts to do your audits and fix your designs/code.

## One last thing

If the only way to get your boss to care about making sites accessible is that "it's easier for AI to understand," then use that argument. I just hate it. Caring more about an AI scraper being able to use your site than a human trying to do the same is so grim.

If I can ask for one thing for GAAD, it's that we remember who the web is for. It is for humans all around the world with different abilities, needs, and ways of experiencing the world. Let's focus on building things with them and for them, so that their lives can be a little bit easier. We can do that by being careful, thoughtful, and intentional about our work, not by offloading it to a machine to do it for us.

{% include 'partials/article-pagination.njk' %}
