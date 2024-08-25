---
title: "How accessible is IMDb? - Writing - Dustin Whisman"
description: "How accessible is IMDb? This is part 8 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is IMDb?"
layout: default
date: 2024-08-25T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is IMDb?

_This is part 8 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at IMDb. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

For IMDb, I tested the [home page](https://www.imdb.com/), the [search results page for “twisters”](https://www.imdb.com/find/?q=twisters&ref_=nv_sr_sm), and the [movie page for Twisters](https://www.imdb.com/title/tt12584954/?ref_=fn_al_tt_1) (no real reason, it’s just a recent movie at time of writing). In a deviation from the norm, I’m actually going to start with the movie page, then search, then the home page, since in my experience, few people go to IMDb’s home page, then search for a movie—they usually land there from some external search engine.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/imdb/desktop-h.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/imdb/desktop-v.png" alt="A composition of screenshots from the desktop version of imdb.com, showing the home page, the search page, and the movie page for Twisters." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

<figure>
	<img src="/images/accessibility-top-100/imdb/mobile.png" alt="A composition of screenshots from the mobile version of imdb.com, showing the home page, the search page, and the movie page for Twisters." class="cmp-article__image">
	<figcaption>These are the pages that were tested on mobile.</figcaption>
</figure>

I tested IMDb on August 25th, 2024.

## Testing a movie page

### Automated scans

Links on IMDb don’t use underlines or anything else besides color to distinguish them from text, which is usually only acceptable in navigation or other link-heavy contexts. There are also a couple links with an SVG that visually reads as “IMDbPro” but have no accessible text alternative. An SVG `title` would work, or an `aria-label` , visually hidden text, anything really.

It appears that most, if not all SVGs are given `role="presentation"`, which may cause them to still be announced by some screen readers, so `aria-hidden="true"` may be more appropriate. Whether the SVGs *should* be treated as decorative is another question, but cherry picking some examples, most of them are within links or buttons that use `aria-label` or otherwise have accessible names that would be redundant with a named icon.

The “Did you know” section has some… interesting design choices that lead to issues such as nested interactive controls.

<figure>
	<img src="/images/accessibility-top-100/imdb/goofs.png" alt="A screenshot of a problematic interface that has two links with button roles, partially obscured content, and two different buttons to expand that content, one of which is invisible." class="cmp-article__image">
	<figcaption>There are goofs here alright.</figcaption>
</figure>

This card is a `li` element with `role="presentation"` (so why even bother with list semantics?) that contains two `a` elements with `role="button"` ([don’t make me tap the sign](/writing/when-to-use-links-vs-buttons/)), and a `div` element with `role="button"` that contains an actual `button` element along with the content of the card. All of this is in service of implementing “See more” functionality to reveal one more paragraph than was already visible. I should note that these are already summaries of more detailed pages, so it would be way simpler and far less broken to just show the whole summary and add a single “See more” link, but with unique names like “See more goofs” or “See more quotes”, etc.

Clicking on those link-buttons will open a new page with more info, so they certainly should not be treated as buttons, and they both have the same accessible name (“See more”) as the button that reveals the missing paragraph. Not super helpful for finding your way around.

There are a lot of cases where the accessible names of interactive elements don’t begin with or match the visual text of those elements. For example, the harmburger menu, which visually reads “Menu”, has `aria-label="Open Navigation Drawer"`. This breaks speech controls, since software being told to click the menu button wouldn’t be able to find a button (or the correct button) called “menu.” The same goes for a link that visually reads “Writers” but has the accessible name of “See full cast and crew.” There are 45 total cases like this on one page.

Some quick hits for other issues:

- Not all `id` attributes are unique
- Some content is not contained by landmark regions
- Some `for` attributes don’t point to inputs with matching `id` attributes (that’s very bad)
- Some `label` elements have `role="button"` (why?!)
- The `html` element does not have a `lang` attribute
- There are some `span` elements with `aria-label` attributes
- Just a tiny bit of color contrast issues
- Several issues flagged for the search bar (I’ll get into that later)
- A whole lot of redundant ARIA roles for elements that have implicit roles, like `<button role="button">`
- Issues from advertising iframes not having accessible names

### Manual testing

This page includes a video that autoplays on mute and does not seem to care about reduced motion preferences. Clicking on the video does not pause it but instead restarts the video from the beginning with audio. You also can’t tab to the video to play/pause it with the keyboard. I hate it!

The keyboard focus indicators are pretty bad and inconsistent. They’re thin, dashed lines that are not offset from the controls they’re outlining, which in some cases leads to them blending in with the border. Some focusable elements also just don’t show the outline, so it’s very easy to lose where you are when using only the keyboard. Some controls are also just broken, like the dropdown next to the search input. I would expect that focusing on it and pressing “Enter” would reveal the menu, but it does nothing. Well, I say nothing, but it moves focus to *somewhere* that I can’t see. There are also a lot of sidebars and carousels that make the tab order hard to predict.

For the search bar, IBM Equal Access flagged it as using the ARIA 1.1 combobox pattern, which never worked or was supported by browsers (oops), and digging into the ARIA roles and attributes, there’s a lot that is close, but not quite right. These sorts of things are [hard to get right](/writing/accessibility-how-tos/how-to-avoid-inaccessible-missing-search-issues/), so I can respect the attempt. However, the attempt might not be fully baked, as it looks like they might have grabbed an off-the-shelf React library to handle it without properly evaluating whether it’s any good. Based on `react-autowhatever` being used as a prefix in ARIA attributes, it seems like they might be using [a library that hasn’t been updated since 2018](https://github.com/moroshko/react-autowhatever) (might want to check on that).

As for actual behavior with search, the keyboard controls are mostly sensible, with the arrow keys working how I’d expect to highlight suggestions. Tabbing is a little broken, though. Instead of tabbing to the submit button, focus disappears, and then when you tab again, the submit button is briefly outlined and then the outline disappears even though you’re still focused on the button. I didn’t test this with a screen reader, but given the ARIA situation, it’s probably not great.

Zooming in to 200% and 400% worked reasonably well on desktop—all the text scaled up as expected and there weren’t any obvious overflow or layout issues. The only issue at 400% was the “Back to top” button that floats over the content of the page, which ends up obscuring quite a bit at that size.

<figure>
	<img src="/images/accessibility-top-100/imdb/back-to-top.png" alt="A screenshot showing a zoomed in page with a large back-to-top button obscuring a significant amount of content." class="cmp-article__image">
	<figcaption>No way this could get annoying when trying to read the movie trivia I came here for.</figcaption>
</figure>

On mobile, despite not having zoom disabled via `meta` tag, I was not able to change the zoom level. I wasn’t sure whether that was an issue with emulating mobile on a desktop, so I tried changing the accessibility settings on my phone to try it out, and zooming even to 200% caused overflow/bi-directional scrolling, so bad job there.

## Testing the search results page

### Automated scans

A lot of the issues from the movie page were related to global elements in the header or from ads, so there aren’t actually any newly flagged issues on this page. Cool! It’s not actually that surprising once you look at the details of the main content—it’s pretty much just a list of links with some images and buttons to load more content. Do those buttons have redundant attributes? Yes, but I’ll take what I can get.

```html
<!-- don't do this -->
<button role="button" tabindex="0" aria-disabled="false">More popular matches</button>

<!-- this is effectively the same thing -->
<button>More popular matches</button>
```

### Manual testing

Keyboard focus indicators are slightly better on this page, but for some reason, the dashed lines don’t outline the links. Instead, they do a weird underline through the middle of the list item.

Looking at the code, they go a little overboard with lists while at the same time nuking the list semantics. It’s a whole lot of effort for absolutely no benefit. The site already has a bad case of div-itis and this doesn’t make it any better.

```html
<!-- a simplified example, don't do any of this -->
<ul role="presentation">
	<li>
		<a role="button" tabindex="0" aria-disabled="false" href="/title/tt12584954/">Twisters</a>
		<ul role="presentation">
			<li role="presentation">
				<span aria-disabled="false">2024</span>
			</li>
		</ul>
		<ul role="presentation">
			<li role="presentation">
				<span aria-disabled="false">Daisy Edgar-Jones, Glen Powell</span>
			</li>
		</ul>
	</li>
</ul>
```

Zoom is similarly good on desktop and similarly bad on mobile.

## Testing the home page

### Automated scans

A whole lot of generic elements have `aria-label` attributes on the home page, largely due to the big carousel at the top of the page. These same generic elements are given `tabindex` attributes to make them focusable, but they don’t have any corresponding ARIA roles to let screen reader users know what they’re supposed to be. The carousel also automatically rotates through its slides without any respect for reduced motion settings or a clear mechanism for pausing the animation. I took a peek at the markup for the carousel, and I won’t get into details other than to say it’s, uh, not good.

Side note: let’s stop building carousels, okay? Please and thank you.

There are color contrast issues flagged for offscreen elements that I couldn’t find, and there are also links inside of `aria-hidden` elements, also offscreen. I’m guessing they belong to some modal that I didn’t find.

All other issues are repeats from other pages.

### Manual testing

There are more keyboard-only access issues caused by the carousels that we really should stop building (I will fight any designer who suggests one). On the main carousel at the top of the page, if it has already animated a few slides by the time keyboard focus arrives in the carousel, the focus indicator will be invisible until you end up focused on the current slide. Then, if you keep going, you can end up in weird states where two slides are partially visible.

<figure>
	<img src="/images/accessibility-top-100/imdb/broken-carousel.png" alt="A screenshot showing two halves of images from different movies side by side with one of them including a link that is focused." class="cmp-article__image">
	<figcaption>It's okay, you'll be able to see the rest of the image eventually.</figcaption>
</figure>

Assuming you get past that carousel, there are many more sliders (slightly different carousels) that simply have too many links, buttons, and other tab stops. There’s no way to bypass them, and come to think of it, I never encountered a “skip to main content” link, so we’ll call that a general failure for [bypass blocks](https://www.w3.org/WAI/WCAG22/quickref/#bypass-blocks).

The same zoom issues happen here as well.

## Results

I wasn’t sure what to expect from IMDb. It’s a smaller operation than most of the other sites I covered, which could have gone either way: surprisingly competent or par for the course. Unfortunately, it was the latter, with so many issues caused from overcomplicating pretty basic interfaces and interactions without the skills to back those choices up. There are a lot of telltale signs of hiring React developers instead of front-end developers who actually know HTML.

The D in IMDb stands for the grade that I’m giving them. Next time, I’ll be taking a look at the first news site on the list, the New York Times. With any luck, I’ll be able to evaluate more than a paywall screen.

{% include 'partials/article-pagination.njk' %}
