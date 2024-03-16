---
title: "How to use Google Analytics without BREAKING THE LAW - Writing - Dustin Whisman"
description: "How can you add Google Analytics to a website without breaking GDPR or CCPA rules? Turns out it's more complicated than you might expect."
articleTitle: "How to use Google Analytics without BREAKING THE LAW"
layout: default
date: 2024-03-15T00:00:00.000Z
tags:
  - writing
---

# How to use Google Analytics without BREAKING THE LAW

{% include 'partials/published-date.njk' %}

_Disclaimer: none of this is legal advice. These are my findings based on a limited amount of time and research. Also, check the published date–this could be outdated info if you're reading this in the not-so-distant future._

I recently had the, um, opportunity to dig into Google Analytics (or I guess Google Tag Manager, but no one I know calls it that consistently) to figure out how to use it while not running afoul of [GDPR](https://gdpr.eu/) or [CCPA](https://www.oag.ca.gov/privacy/ccpa) requirements. Given that these laws were drafted as a response to the privacy issues caused by tools such as analytics and tracking software, you would think that Google would make it easy for their customers to understand how to use their product in a way that’s compliant with international law. You’d be wrong!

When you set up Google Analytics with their GA4 version, you’ll most likely find a snippet like this that you’re meant to add to your site:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"><script>
<script>
	window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TAG_ID');
</script>
```

Easy enough, just copy and paste that sucker into your `<head>` and voila! You’re collecting whatever data Google collects by default. I suspect that’s where it ends most of the time. In my experience, developers usually aren’t the ones given access to Google Analytics–they’re usually handed that code snippet by someone else.

If you’re lucky, that person might ask “What’s the deal with this banner? It says we need to check our consent settings for the European Economic Area.” You might make the reasonable assumption that that means no data is going to be collected in Europe until you do a little more configuration. Again, you’d be wrong!

## What usually happens

If you copy that snippet from before, Google will set cookies on your site and collect data from your users, regardless of their region or what the law says about collecting personal info. Call me naive, but I would think that a company like Google would be able implement some logic in their analytics scripts that would go “oh wait, I’m in Europe aren’t I? Did I get consent to start tracking data? No? Okay, I won’t then.”

If you’ve read this far, then you’ll know that of course that’s not how it works. Nope. Google puts the onus of compliance on you, the customer using _their_ product. This is, in my opinion, completely unworkable. I’d wager that most people adding Google Analytics to their sites aren’t very technical and nearly zero of them have a solid understanding of GDPR, CCPA, or any other privacy regulations that exist around the world.

Odds are that most sites that use Google Analytics are violating GDPR without even realizing it, and the people who _could_ fix it probably have no idea how to do that. Best case scenario, the marketing person signs up with one of the providers for those cookie consent banners that everyone hates and the developer gets to copy-paste another code snippet.

## Defaults matter

What is a more sensible default? If the usual snippet collects data on anyone in the world that isn’t using an ad-blocker, how can we restrict that behavior? It turns out you can add to your `gtag` snippet to deny consent by default.

```html
<script>
	window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // deny cookie consent by default
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'denied',
  });

  gtag('js', new Date());
  gtag('config', 'TAG_ID');
</script>
```

Google has these [consent types](https://developers.google.com/tag-platform/tag-manager/templates/consent-apis) that you can use to grant or deny consent by category. There isn’t a type for strictly necessary cookies since those are allowed regardless of consent under GDPR. Note that if you use this snippet, the analytics scripts won’t do anything useful unless you provide a mechanism for users to grant their consent. You can do that with a function like the following, along with the UI to wire it up (that UI needs to meet [regulations](https://www.google.com/about/company/user-consent-policy-help/), though).

```jsx
// category can be one of the types, like 'analytics_storage'
function grantConsent(category) {
  gtag('consent', 'update', {
    [category]: 'granted'
  });
}
```

This should work as a general-purpose default if you want to ensure that everybody’s consent is granted before tracking them, regardless of region. However, knowing what I know about marketing and how privacy is treated when not required by law, you'll likely be asked to set a more permissive default. You can specify regions to deny or grant consent differently for these types. Does Google make it easy to know what the region codes are? Of course not, don’t be silly.

```html
<script>
	window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // deny cookie consent by default
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'denied',
  });

  // grant cookie consent in the US (not how consent works, but legally compliant)
  gtag('consent', 'default', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted',
    'functionality_storage': 'granted',
    'personalization_storage': 'granted',
    'security_storage': 'granted',
    'region': 'US',
  });

  // explicitly deny cookie consent by default in California, overriding US settings
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'denied',
    'region': 'US-CA',
  });

  gtag('js', new Date());
  gtag('config', 'TAG_ID');
</script>
```

More specific regions will override others that are more broad, so in this example, users in California won’t have cookies set by default, but everywhere else in the US, they will.

## Beware embedded content

As an aside, if you embed YouTube videos, you should check that the embed code uses `youtube-nocookie.com` instead of `youtube.com` in the URL. Otherwise, the embed will add a bunch of cookies that aren’t strictly necessary (they’re mostly for advertising/tracking). It’s unclear to me whether those cookies still get set even if you have a cookie consent banner and a user has rejected all nonessential cookies. Better to err on the safe side.

```html
<!-- default embed code if copied directly from YouTube -->
<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=_szTq7FkNw_6p6wp"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
></iframe>

<!-- embed code if you check the box for "Enable privacy-enhanced mode" in YouTube -->
<iframe
	width="560"
	height="315"
	src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?si=_szTq7FkNw_6p6wp"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
></iframe>
```

The same general advice applies if you’re embedding any content from another site. You should at least investigate to see whether they offer cookie-free versions of their embed codes. If you can’t find that information, it _might_ be fine, but you should check with a tool like [Blacklight](https://themarkup.org/blacklight) to make sure no unwanted trackers are introduced.

## Some alternatives to Google Analytics

Google doesn’t have the best track record when it comes to privacy, so if you want a privacy-focused alternative, here are a few options that might be viable.

- [Netlify Analytics](https://www.netlify.com/platform/core/analytics/): if you’re already hosting your site on Netlify, you can pay for analytics based on server-side activity, maintaining user privacy. The main drawback is cost ($9 per month per site at time of writing)
- [Fathom Analytics](https://usefathom.com/): another server-side option with maybe more features than Netlify, but it is $15 per month
- [Plausible Analytics](https://plausible.io/): another server-side option based in the EU that is $9 or more per month, but it’s open source and you can self-host it if you’re okay dealing with maintenance and more limited features

## Do you actually need analytics?

If all of this sounds like a hassle, it’s because it is. Invading users’ privacy used to be so much easier, but with browsers starting to block third-party cookies more aggressively along with ad-blocker extensions and privacy laws, any data that you manage to collect (legally or otherwise) is likely to have huge gaps. By the way, Google Analytics sets first-party cookies somehow–no idea how that’s allowed, but apparently it is.

The flakiness of data is maybe most evident by GA4 using machine learning to fill in gaps in data, otherwise known as making stuff up, also known as just guessin’. That’s not to say that analytics data is worthless–you can still probably glean some insights from which pages on your site get the most traffic, but is it worth it?

Answer these questions to decide whether analytics (of any kind) are going to be useful for you:

- Are you okay with bothering your users with cookie consent banners (or building one yourself that’s less annoying?)
- Are you okay with setting cookies without consent in places where it’s not illegal to do so?
- Do you feel confident that you understand privacy regulations around the world to the point where you won’t be violating any of them?
- Does patchwork data defeat the purpose of collecting analytics for you?
- Do you have the skills or expertise to analyze the data?
- Are you going to spend the time to understand data and monitor it over time?
- Are you just collecting data for vanity metrics?
- Is the analytics data worth $9-15 per month? Is it only worth it if it’s free?
- Are the [environmental costs](https://rootwebdesign.studio/articles/the-environmental-benefits-of-privacy-focussed-web-design/) of downloading more scripts and storing more data worth it?

For me, my answers point to “no, I don’t need or want analytics on my site.” I don’t have analytics and likely never will because I care enough about the people visiting to respect their privacy, and I don’t care enough about the data to justify the hassle of adding analytics ethically/legally.

Your answers and conclusion may be different, and that’s fine, but I think it’s worth reconsidering what’s become the standard business practice. Just because lots of people do it, that doesn’t make it good.
