---
title: "How to avoid accessibility issues with CAPTCHAs - Accessibility how-tos - Writing - Dustin Whisman"
description: "Don't use them. CAPTCHAs are broadly inaccessible and ineffective at their stated purpose. Best to try other strategies to block spam and bots."
articleTitle: "How to avoid accessibility issues with CAPTCHAs"
layout: default
date: 2024-05-16T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues with CAPTCHAs

_Today is [Global Accessibility Awareness Day (GAAD)](https://accessibility.day/)! In honor of that, I thought I'd take a look at the top issues reported by screen reader users according to the [2024 WebAIM Screen Reader Survey](https://webaim.org/projects/screenreadersurvey10/#problematic) and give some advice on how to avoid those issues. I ended up writing way too much to cram into one post, so get ready for 12 days of GAAD._

{% include 'partials/published-date.njk' %}

A CAPTCHA is typically a visual interface used to distinguish humans from bots. You know, the thing where you have to identify all the crosswalks or traffic lights before signing up for a service. We’ve been used as unpaid labor to train AI models to recognize common traffic-related objects, which is definitely not concerning, nothing to worry about here. Newer CAPTCHAs have gotten even weirder, like making you choose which animal is biggest in real life, so I guess they’re shifting focus to other AI training problems.

Ethical issues aside, [bots are better at solving CAPTCHAs than humans](https://www.usatoday.com/story/tech/2023/08/17/captcha-tests-keep-more-humans-than-bots-out-study-shows/70609691007/), and that’s only considering humans who can see the images. They are required to have a non-visual alternative to be considered accessible, but considering that screen reader users report them as their #1 issue and that CAPTCHAs don’t really work for their intended purpose, it’s best to avoid them entirely.

However, you don’t want your site to be clogged with spam and bots, so what alternatives are there? One option would be to use a honeypot field in forms, which are visually hidden inputs that humans can’t use but bots can. For example, a checkbox which prevents the form from submitting or data being saved if it is checked.

```html
<form action="/signup" method="POST">
	<div class="util-visually-hidden" aria-hidden="true">
		<input type="checkbox" name="honeypot" value="robot" tabindex="-1">
	</div>
	<label>
		Email Address
		<input type="email" name="email">
	</label>
	<button type="submit">Sign up</button>
</form>
```

It might require some trial and error to adjust the input so it successfully blocks spam without causing issues for people using password managers or other tools that auto-fill forms, and it’s worth noting that spam attacks and prevention are an arms race, so what works today may not work tomorrow.

Another technique is to prevent form submissions before a reasonable amount of time has passed, such as the time it would take for a human to fill out and submit the form. This can be set to a fairly short duration, like 3-5 seconds, and even that might be enough to deter spammers, who might be impatient enough to move on to another target that they can spam multiple times per second. On the back-end side of things, rate limiting and blocking IP addresses with suspicious activity can be another layer of protection against spam.

There’s no perfect solution for blocking spam, but at least with a [Swiss cheese approach](https://en.wikipedia.org/wiki/Swiss_cheese_model), you can set up reasonably good defenses that are better than using CAPTCHAs, which might not block bots but almost certainly will block humans.

{% include 'partials/article-pagination.njk' %}
