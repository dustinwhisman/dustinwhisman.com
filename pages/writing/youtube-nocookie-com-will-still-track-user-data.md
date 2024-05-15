---
title: "youtube-nocookie.com will still track user data - Writing - Dustin Whisman"
description: "So about how I thought that using youtube-nocookie.com instead of youtube.com in embeds would keep YouTube from tracking user data... Yeah, I was wrong about that."
articleTitle: "youtube-nocookie.com will still track user data"
layout: default
date: 2024-03-19T00:00:00.000Z
tags:
  - writing
---

# youtube-nocookie.com will still track user data

{% include 'partials/published-date.njk' %}

[I recently dug into cookie consent](/writing/how-to-use-google-analytics-without-breaking-the-law/) as it relates to Google Analytics, and as an aside, I recommended switching YouTube embeds from using `youtube.com` to `youtube-nocookie.com` in the source URLs. As it turns out, that’s still not good enough, and it won’t get you out of hot water with regards to GDPR requirements.

Despite the name’s implied meaning, `youtube-nocookie.com` embeds will still track user data—they’ll just be a little sneakier about it. Sure, if you put one of these embeds on a page, clear your site data in browser dev tools, then reload the page, you won’t see any cookies getting set from that domain. However, if you check local storage, you’ll see some data stored under the `https://www.youtube-nocookie.com` domain with keys like the following:

- `yt-remote-device-id` - you know, like identifying a specific device
- `ytidb::LAST_RESULT_ENTRY_KEY` - seems ominous and worth checking if data’s stored in IndexedDB as well
- `yt.innertube::requests` - the data for this includes `X-Goog-Visitor-Id`, I’m sure there’s no way that could be tied to a specific user
- `yt-remote-connected-devices` - also seems ominous
- `yt.innertube::nextId` - at least they used a cutesy name like “innertube”

After playing, then pausing a video, then going to a different page with a different embed, I checked again and saw even more values in local storage:

- `yt-player-headers-readable`
- `yt-player-bandwidth`

I also checked IndexedDB, and under the `https://www.youtube-nocookie.com` domain, there’s a `YtIdbMeta` database that is initialized, but I didn’t see any actual data being stored in it. It’s still alarming to me that it gets set up.

So yeah, YouTube is still absolutely tracking user data, and I’d argue they’re doing it under false pretenses when people are copying embed codes after checking a box for “Enable privacy-enhanced mode.”

## What to do about it

If it’s viable to do so, you could host your videos on [mave.io](https://mave.io/), which is based in the EU and GDPR compliant. However, it’s not a free service and doesn’t address embedding videos not created by you. YouTube is where the people are, so chances are you’re stuck with them.

An option that might not be appealing, but would take relatively little effort, would be to use links to the videos on YouTube instead of embeds. This would likely have implications for your designs and would probably reduce the amount of people who end up watching the videos.

The most compliant option that won’t break your designs or force you to find another platform would be to block YouTube embeds from loading until consent has been granted. You can use an old lazy-loading technique for this, setting `data-src` instead of the `src` attribute on the `<iframe>`, then swapping them when cookie consent has been granted (or detected as having already been granted).

You can also show the video thumbnail as a placeholder if you have the video ID. Based on Paul Irish’s `[lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed)`, the thumbnail URLs follow a pattern of [`https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg`](https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg), where the part immediately after `/vi/` is the video ID. I checked and apparently `i.ytimg.com` is indeed what YouTube uses for their video thumbnail images (not sure why they insist on using domains that look like bad phishing attempts).

When consent hasn’t been granted, the choice is yours for how to handle that. You could link to your cookie consent page or open a modal when users click on the “video” to let them change their cookie settings. You could even display a passive-aggressive message about YouTube being shady and explaining why users would need to allow cookies to watch a video.

## What did we learn here?

Don’t trust Google. Make sure you audit your sites for cookies, local storage, session storage, and apparently IndexedDB as well. This is some sneaky bullshit and I’m surprised that there haven’t been fines or legal actions based on this (that I know of).

I feel like it’s worth reiterating that website owners probably have *no idea* that YouTube is tracking this data, and the websites that are using the `youtube-nocookie` embeds probably think they’re in the clear, privacy-wise. The data that’s being tracked is of no benefit to anyone but YouTube, but guess who’s more likely to pay the fine when there’s a complaint.

{% include 'partials/article-pagination.njk' %}
