---
title: "How accessible is Fandom? - Writing - Dustin Whisman"
description: "How accessible is Fandom? This is part 12 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is Fandom?"
layout: default
date: 2025-02-01T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is Fandom?

_This is part 12 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at Fandom. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

First, a little housekeeping. I took a break from this series for a little while, partially because I didn’t want to do anything even remotely related to work over the holiday break, and also partially because I’ve been training for a half-marathon, which has eaten up more of my time and attention. I can only have so many projects at a time.

In any event, now seems like a fine time to adjust my approach to this series. I’ve certainly lost interest in writing the same things over and over again—it turns out the variety of accessibility issues is pretty limited, so the differences between sites tend to be in degree, not kind. To mitigate that and keep things fresh for myself and hopefully the reader (that’s you!), I’ll be taking a narrower focus. I’m thinking I’ll give high level summaries of the types and volume of issues, but then I’ll dig into one or two specifics, hopefully finding a teachable moment.

That will be the plan for as long as I feel like it’s working, and I refuse to commit to any particular format or schedule. I’ll probably also ditch the screenshots, unless there’s something really egregious (they’re a pain in the ass). With that out of the way, let’s get into it!

## What I tested

I tested the [home page](https://www.fandom.com/) as well as pages from two other reasons I haven’t published in a while, [Baldur’s Gate III](https://forgottenrealms.fandom.com/wiki/Baldur%27s_Gate_III) and [Final Fantasy X](https://finalfantasy.fandom.com/wiki/Celestial_Weapon). I tested Fandom on February 1st, 2025.

## Automatically detected issues

### Home page

- Interactive elements without accessible names
  - In Google ads, the close button is an unlabeled `div` with `role="button"`
  - Search buttons don’t have accessible names, just magnifying glass icons (the only visible label for search inputs is a placeholder as well)
  - A link to see more wikis has an SVG arrow icon with no text alternative
- The red-orange color doesn’t have sufficient contrast with white text (debatable, might pass under APCA)
- Broken images that appear to be tracking pixels happen to not have `alt` attributes (I object more to the tracking pixels than anything)
- The home page is not organized into landmark regions (there’s a `nav` and a `footer`, but pretty much everything else is sloshing around in `div` soup)
- Small links are clustered too close together, making it hard to click/tap on the intended link
- Forms in the same (lack of) region don’t have names to distinguish them from each other
- The `html` element doesn’t have a `lang` attribute (c’mon, that’s 101)

### Baldur’s Gate III and Final Fantasy X pages

The Baldur’s Gate page set the record for most reported issues from axe DevTools that I’ve ever seen, so… congrats? For probably the same reason, I wasn’t even able to test with IBM Equal Access—it just spun while I got another cup of coffee, paced around my apartment, took a bathroom break, read a couple articles, and pet one of my cats. I gave it maybe 15 minutes before moving on. The Final Fantasy X page had the same issues, but fewer because the page itself was smaller.

- The most reported issue—links are not distinguishable without relying on color, meaning they don’t have underlines (or anything else) to make it clear they are links
- Some truly mangled description lists, and by “some” I mean 135 (more if you count both pages)
- Color contrast issues
  - Ads have light gray text that doesn’t meet contrast requirements with white backgrounds (not purely Fandom’s fault, but they could write some CSS to correct for it)
  - Page-specific themes introduce contrast issues with some text, will vary from subdomain to subdomain
- Disclosure widgets use `div` or `header` elements with no roles and `aria-expanded` instead of buttons or `details`/`summary`
- Table heading cells don’t have defined scopes (row or column)
- ARIA labels are used throughout on generic `span` or `div` elements (this does nothing! Stop it!)

## Manually detected issues

### Home page

- No skip links to bypass the header or repeated content
- Keyboard focus sometimes gets completely lost or stuck, suggesting manual focus management that gets broken
- The main navigation must be explicitly closed by finding and activating the “Hide” button, pressing ESC or tabbing out of the nav doesn’t work (things you focus on later can be obscured by the menu)
- At 200% zoom, some interactive content is pushed offscreen, but there’s no way to scroll to it (it’s weirdly better at 400% since the content reflows to stack vertically)

### Baldur’s Gate III and Final Fantasy X pages

- Keyboard focus gets even worse as there’s a loop—once you get to the end of the main navigation, you end up right back at the beginning, meaning you can’t get to *any* of the main page content
- If you somehow manage to get keyboard focus on the main content, the currently focused links may be obscured by a massive banner ad that’s sticky to a certain point (even then, there are other loops that will trap you in certain areas)
- These pages have auto-playing, but silent, videos that appear and play clips from Honest Trailers for some reason. Good luck getting to those with the keyboard to close them
- 200% zoom is mostly fine (the navigation does not handle it well), but at 400%, there’s bi-directional scrolling and sticky floating elements, making it incredibly hard to read the content

## Teachable moment: how to use description lists

A [description list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) is made up of `dl`, `dt`, and `dd` elements. The `dl` is similar to a `ul` or `ol` element and encompasses the entire list. The [`dt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt) element represents the term that is going to be described or defined (these used to be called definition lists). The [`dd`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd) element does the describing. For a simple description list, the markup would look something like this:

```html
<dl>
	<dt>Description List</dt>
	<dd>A way to group terms and definitions, like in a glossary.</dd>
	
	<dt>Description Term</dt>
	<dd>A necessary component for descriptions. You can't very well describe nothing, can you?</dd>
	
	<dt>Description Details</dt>
	<dd>This is also necessary. A term without a description is just assumed knowledge.</dd>
</dl>
```

For styling purposes, you may wrap terms and descriptions in `div` elements. This is especially useful if you have a grid or flexbox layout that would otherwise put each `dt` and `dd` in a row or column that doesn’t visually make sense.

```html
<dl>
	<div>
		<dt>Description List</dt>
		<dd>A way to group terms and definitions, like in a glossary.</dd>
	</div>
	
	<div>
		<dt>Description Term</dt>
		<dd>A necessary component for descriptions. You can't very well describe nothing, can you?</dd>
	</div>
	
	<div>
		<dt>Description Details</dt>
		<dd>This is also necessary. A term without a description is just assumed knowledge.</dd>
	</div>
</dl>
```

You can group multiple terms together and use a single description that applies to each of them, or you can group multiple descriptions together if they apply to a single term.

```html
<dl>
	<dt>Final Fantasy X</dt>
	<dt>Final Fantasy X-2</dt>
	<dd>Games set in the world of Spira that focus on the Summoner Yuna and her companions as they try to save the world (twice).</dd>
	
	<dt>Baldur's Gate III</dt>
	<dd>A game set in Faerûn that uses rules from Dungeons and Dragons to manage character interactions and combat.</dd>
	<dd>The name references the city of Baldur's Gate, which frankly has too much stuff to do if you want to complete all quests before finishing the game.</dd>
</dl>
```

Nesting description lists is technically allowed, but just because you can do something doesn’t necessarily mean you should. You can nest a description list like so:

```html
<dl>
	<dt>Equipment</dt>
	<dd>
		<dl>
			<dt>Armor</dt>
			<dd>breastplate</dd>
			<dd>chain mail</dd>
			<dd>chain shirt</dd>
	
			<dt>Gloves</dt>
			<dd>leather gloves</dd>
			<dd>metallic gloves</dd>
	
			<dt>Shields</dt>
			<dd>metal shield</dd>
			<dd>scrapwood shield</dd>
			<dd>wooden shield</dd>
		</dl>
	</dd>
</dl>
```

However, it’s worth questioning whether this structure makes sense for this context. It may be more practical, understandable, and navigable to use headings and basic unordered lists to convey the same information.

```html
<h2>Equipment</h2>
<h3>Armor</h3>
<ul>
	<li>breastplate</li>
	<li>chain mail</li>
	<li>chain shirt</li>
</ul>

<h3>Gloves</h3>
<ul>
	<li>leather gloves</li>
	<li>metallic gloves</li>
</ul>

<h3>Shields</h3>
<ul>
	<li>metal shield</li>
	<li>scrapwood shield</li>
	<li>wooden shield</li>
</ul>
```

## Results

I give Fandom an F. Any site that breaks the tooling used to evaluate it is likely to get this score anyway, but the keyboard issues in particular seal the deal. Many of the issues are basic structural problems that are very easy to identify and mitigate, and yet they still exist, indicating a lack of prioritization for accessibility. I’m sympathetic to the communities that use Fandom and try to get things right, but the platform itself is lacking in a major way.

Next time, I’ll leave a review of Yelp. Turnabout’s fair play, after all.

{% include 'partials/article-pagination.njk' %}
