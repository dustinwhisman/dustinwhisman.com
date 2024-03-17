---
title: "Learning WordPress - Writing - Dustin Whisman"
description: "A reflection on a few months of needing to learn WordPress very quickly."
articleTitle: "Learning WordPress"
layout: default
date: 2023-11-01T00:00:00.000Z
tags:
  - writing
  - learning in public
---

# Learning WordPress

{% include 'partials/published-date.njk' %}

In development, you can can classify your experience level with any given tool with these rules:

- If you’ve heard of it, you’re familiar
- If you’ve used it once, you’re knowledgeable
- Anything more than that, you’re an expert

In July, I would have said I was familiar with WordPress. I knew it existed and that it supposedly runs something like 40% of the internet. I also knew that [wordpress.org](https://wordpress.org) and [wordpress.com](https://wordpress.com) were different things and the the rollout of the Gutenberg editor had been _rough_, accessibility-wise. That’s it. That’s all I knew at the time.

Somehow after 8 years in web development, I had simply avoided WordPress, or maybe it had avoided me. Now, in November, I’d call myself an “expert” 😉

## Starting at zero

I was asked to be the technical lead on a project that would be using WordPress, to which I said that I didn’t know much about WordPress, but I was sure I could figure it out along the way. It helped that some other team members had set up a repo with the basics in place during discovery earlier in the year, so I wasn’t completely starting from scratch.

Before the project truly got started, I had about a week to familiarize myself with the starter repo and with WordPress as a whole. I spent about a day of that working on getting dependencies up to date and smoothing out the build process, but the rest was spent on research, experimentation, and planning.

## Figuring out how to figure things out

WordPress has been around since 2003, which makes it about 100 in internet dog years. As such, there’s a lot of legacy design decisions and documentation to sift through. If you’ve been at it for a while, you can rely on institutional knowledge and experience to guide you, but for a newcomer, I found it difficult to even figure out where to start looking for information.

I knew the general shape of what we needed for the project, so I started by trying to look up common solutions to problems we’d need to solve, and everywhere I looked, I found plugins. Without a doubt, WordPress’ plugin ecosystem has contributed to its success over the years, but man, I don’t want to install your plugin.

Because of this, I shifted my searches from “how to do X in WordPress” to “how to do X in PHP”, and I ended up getting much better info that way. I also found that looking through [WordPress’ developer documentation](https://developer.wordpress.org/) to see what APIs were available was more helpful for discovering what was possible than any other type of searching I had been doing.

## Learning enough to make decisions

Once the project started in earnest, I had to run ahead of the team to do enough research so that I could write cards that described the problems well enough that one of the developers I was working with could pick it up and understand what to do. This is where the flexibility of WordPress became a fun challenge—there’s usually at least three or four different ways to do a thing. Which one is the best option?

At the start of the project, I didn’t have any good rules of thumb for how to solve different problems, so I would check out a new branch and just try some stuff out. Sometimes this led to dead ends, and other times it got me within striking distance of a solution, but I learned something every time. I also learned a ton from other developers on the team as they implemented things way better than my half-baked experiments. Over time, I got much more confident about picking the right tool for any given job.

Instead of only having hammers (plugins are hammers), we ended up with a mix of different techniques to solve different types of problems. The decisions usually came down to finding the right balance of complexity for content editors vs. developers. It also hinged a bit on what we could practically get done in a short amount of time—better to get something workable after four hours than something perfect after one week.

## So what did we learn here?

After two months of just-in-time learning and flying by the seats of our pants, we delivered a website to the client that gives them much more flexibility and control over their content than they had on their old site. We also managed to migrate over 900 pages from their old CMS while also integrating the new site with their design system. What we lacked in WordPress experience, we made up for with a willingness to learn, experiment, and apply what we knew from other contexts.

In the end, I’d probably do some things differently, but that’s the case for every project. I take it as a sign that I learned something along the way. If I looked back and thought it was perfect, that would be more concerning, I think.
