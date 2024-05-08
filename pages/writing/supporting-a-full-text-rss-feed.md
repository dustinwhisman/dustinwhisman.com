---
title: "Supporting a full-text RSS feed - Writing - Dustin Whisman"
description: "Up until now, I've only included a short description for posts in my RSS feed, but I've changed tactics so fellow RSS perverts can choose to read my stuff in their reader of choice."
articleTitle: "Supporting a full-text RSS feed"
layout: default
date: 2024-05-08T00:00:00.000Z
tags:
  - writing
---

# Supporting a full-text RSS feed

{% include 'partials/published-date.njk' %}

Inspired by [404Media's recent support](https://404media.co/404-media-now-has-a-full-text-rss-feed/) for full-text RSS feeds for their subscribers, as well as a [recent Piccalilli post](https://piccalil.li/blog/full-text-rss-is-back), I've decided to hop on the bandwagon and update my RSS feed to be full-text.

_Apologies in advance for any RSS spam from my feed. I'm pretty sure this update shouldn't flood your feed reader with my posts, but RSS readers are many and varied, so your mileage may vary._

## The technical details

When I set up my feed while building my site, I more or less copied the code from [11ty's docs for RSS feeds](https://www.11ty.dev/docs/plugins/rss/) but with some modifications because I didn't want to install a plugin. Here's what the chunk responsible for writing each post to the feed looked like (written in Nunjucks).

```xml
{% raw %}{%- for post in collections.writing | reverse %}
	{%- set absolutePostUrl = metadata.url + post.url %}
	<item>
		<title>{{ post.data.articleTitle }}</title>
		<link>{{ absolutePostUrl }}</link>
		<description>{{ post.data.description }}</description>
		<pubDate>{{ post.date.toUTCString() }}</pubDate>
		<dc:creator>{{ metadata.author.name }}</dc:creator>
		<guid>{{ absolutePostUrl }}</guid>
	</item>
{%- endfor %}{% endraw %}
```

The noteworthy part is the `post.data.description` piece, which was reading from a front-matter field that I include on all my posts and represents a short description of whatever that post is about. To support full-text, I needed to replace that with the full post content, and in order to do that without breaking any links or images, I'd need to replace all relative path URLs with absolute URLs.

So I ended up downloading the `@11ty/eleventy-plugin-rss` plugin after all. That let me dynamically construct the `absolutePostUrl` in a less hacky way, and it let me replace URLs in post content by using the `htmlToAbsoluteUrls` filter that the plugin provides.

After doing that, the output `feed.xml` file ended up being around 1.27 MB, which isn't terrible compared to your typical page weight these days, but I figure that number is only going to grow over time, so I decided to limit the feed to the most recent 10 posts. Any sufficiently motivated reader should be able to find my older stuff if they want to.

I ran into some weird Nunjucks behavior along the way, though. I had assumed that the [`slice` filter](https://mozilla.github.io/nunjucks/templating.html#slice) would work the same way that [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) works in JavaScript, but it does not. It ends up creating an array of arrays—I guess slicing the main array into _n_ arrays, which is not what I wanted. After some flailing around, I landed on using the [`batch` filter](https://mozilla.github.io/nunjucks/templating.html#batch), which does sort of the same thing, but batches the sub-arrays into groups of _n_ (10 in my case). Then I use the [`first` filter](https://mozilla.github.io/nunjucks/templating.html#first) to discard the other arrays I don't need. A little hacky, but it works.

Here's the same section updated for full-text support.

```xml
{% raw %}{%- for post in collections.writing | reverse | batch(10) | first %}
	{%- set absolutePostUrl = post.url | absoluteUrl(metadata.url) %}
	<item>
		<title>{{ post.data.articleTitle }}</title>
		<link>{{ absolutePostUrl }}</link>
		<dc:creator>{{ metadata.author.name }}</dc:creator>
		<pubDate>{{ post.date.toUTCString() }}</pubDate>
		<guid>{{ absolutePostUrl }}</guid>
		<description>{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</description>
	</item>
{%- endfor %}{% endraw %}
```

## When in doubt, let people choose

My previous setup was overly restrictive and imposed my preferences on readers. I like to read posts in the browser where I can see the result of all the work that people put into their sites' styles, animations, etc. but that's just, like, my opinion, man. A lot of people like to read posts right in their feed readers, and they should be able to do so.
