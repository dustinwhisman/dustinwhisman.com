---
title: "YouTube - Accessibility of the Top 100 Sites - Writing - Dustin Whisman"
description: "How accessible is YouTube? This is part 2 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "Accessibility of the Top 100: YouTube"
layout: default
date: 2024-02-17T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# Part 2: YouTube

_I'm evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at YouTube. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

For this evaluation, I focused on [YouTube’s home page](https://www.youtube.com/) and a video page, specifically the [_Godzilla x Kong_ trailer](https://www.youtube.com/watch?v=qqrpMRDuPfc) because it’s recent at time of writing and because movie trailers are largely visual, and I wanted to see how YouTube does with audio descriptions and transcripts (spoiler alert: not great).

<figure>
  <img src="/images/accessibility-top-100/youtube/pages-tested.png" alt="A composition of screenshots for two YouTube pages at desktop sizes." class="cmp-article__image">
  <figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

Similar to Wikipedia, YouTube uses adaptive design rather than responsive design to handle mobile browsers, so there’s the desktop [youtube.com](http://youtube.com) and the mobile [m.youtube.com](http://m.youtube.com) that serve completely different markup. I’ll start with the desktop version, then call out anything that’s substantially different for the mobile version.

<figure>
  <img src="/images/accessibility-top-100/youtube/pages-tested-mobile.png" alt="A composition of screenshots for two YouTube pages at mobile screen sizes." class="cmp-article__image">
  <figcaption>These are the pages that were tested on mobile.</figcaption>
</figure>

I evaluated YouTube on February 17th, 2024.

_Update: I went back to these pages on March 17th, 2024 to collect page weight info, which has been added for each page I tested. Interestingly, in the month since I evaluated the site, YouTube has changed their home page when you're not signed in to not show any video thumbnails. Instead, they show a message telling you to search before you get recommended anything. Keep that in mind when you see how many resources are used to show users more or less an empty screen._

## Testing the home page

### Automated scans

#### Desktop

I started by running IBM’s accessibility checker against the home page, and it took long enough that I thought it had crashed, so I restarted the browser and tried again. It turns out there are just so many errors that it takes a while. With IBM’s classification, there were 1,195 violations, 134 issues that need review, and 6 recommendations.

Let’s start small and work our way up. The recommendations were pretty minor, like suggesting that links shouldn’t open in a new tab by default, or that the search form should have an accessible name. The issues that need review are about color contrast and keyboard focus indicators (I’ll get to those with manual testing), elements with link or button roles that aren’t tabbable, along with a grab bag of minor issues.

The interesting things to point out have to do with links in the video and livestream thumbnails. The links that aren’t tabbable are linked images that are redundant with other text links in the same area. Setting `tabindex="-1"`, which YouTube does, is fine for this, but I’d also add `aria-hidden="true"` to remove it from the accessibility tree. I’ll note that [MDN’s documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden) says not to use `aria-hidden` on focusable elements, but since `tabindex="-1"` removes it from the tab order, this should be an acceptable use case.

<figure>
  <img src="/images/accessibility-top-100/youtube/video-thumbnail-avatar-code.png" alt="A screenshot of a video thumbnail with the redundant image link and the code for the image link's markup." class="cmp-article__image">
  <figcaption>There's no reason to focus on the image, since the channel link is right there.</figcaption>
</figure>

In the livestream thumbnails, there’s a red badge with an icon that says “LIVE” to indicate that it’s a livestream. However, YouTube sets `role="img"` on a `<div>` element that wraps a custom `<yt-icon>` element and a `<p>` tag, and paragraphs aren’t valid descendants of images. It’s a weird implementation for the very normal pattern of having an icon next to some text.

<figure>
  <img src="/images/accessibility-top-100/youtube/livestream-thumbnail-plus-code.png" alt="A screenshot of a livestream thumbnail showing the odd markup for the badge." class="cmp-article__image">
  <figcaption>How many custom elements does it take to put an icon next to some text?</figcaption>
</figure>

Moving on to the violations, the overwhelmingly most common issue, with 1,129 out of 1,195 issues, is reusing `id` values. This is surprising to me, since it’s HTML 101 to know that you can’t use the same `id` more than once per page, and yet YouTube uses values like “button”, “container”, and “items” with apparently no thought that there may indeed be more than one of those things on the page. This is more of a code smell than an accessibility violation, but misusing `id` attributes can break ARIA widgets that rely on them.

The next most frequent violation is using the wrong ARIA roles for elements or descendants, such as having an element with `role="img"` containing an element with `role="tooltip"` or using nonexistent roles, like putting `role="text"` on a `<span>` element. Remember kids, never use ARIA when you don’t have to.

Keeping on the trend of using ARIA incorrectly, each YouTube Short marks up its title as an `<h3>` , but they also wrap that heading element with a `<div>` that has `role="heading"` without the required `aria-level` attribute. Setting aside whether it even makes sense to treat these titles as headings, there’s no reason to use that role. I’ll repeat: never use ARIA when you don’t have to.

<figure>
  <img src="/images/accessibility-top-100/youtube/shorts-bad-headings.png" alt="A screenshot of YouTube Shorts along with the badly implemented heading code." class="cmp-article__image">
  <figcaption>Only you can prevent rampant ARIA misuse.</figcaption>
</figure>

There are other violations, like making sure buttons have accessible names (and that those accessible names include the visible text), making landmark regions distinguishable from each other, and color contrast, but those aren’t worth going into detail about.

#### Mobile

Interestingly, the mobile version of the home page has far fewer detected issues: 173 violations, 62 issues needing review, and 17 recommendations. The types of recommendations are largely the same as the desktop versions, but the issues needing review include some indications that the tab components used for navigation may not be up to snuff. In fact, I’m not clear on why one of them is even marked up as a tab control—a list of links wrapped in a `<nav>` element (and maybe a `<ul>`) would work just fine for a fraction of the work.

The number one violation on mobile is using invalid ARIA roles, all of which are for using `role="text"`, which isn’t a role that exists, so who knows where that came from. The next most frequent violation is content not being within a landmark region. It looks like instead of using the `<main>` element, YouTube opted to use a custom `<ytm-app>` element and then didn’t bother to give it `role="main"`.

Going down the list, it’s clear that ARIA is not well understood. We’ve got `aria-label` on generic `<div>` elements, focusable links within elements that have `aria-hidden="true"`, and then the tabs, which I’ll look into more closely with manual testing.

### Manual testing

#### Desktop

YouTube’s keyboard focus indicators are pretty inconsistent. Sometimes there’s a nice, obvious outline around a link, sometimes the border of a button or form control just slightly changes color or gets thicker, often times the background color changes slightly, and sometimes there’s simply no change to indicate focus. The instances where there are no changes violate [WCAG 2.2 success criterion 2.4.7 Focus Visible (AA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), and many of the other subtle changes violate [2.4.13 Focus Appearance (AAA)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html).

<figure>
  <img src="/images/accessibility-top-100/youtube/focus-before-after.png" alt="A side-by-side comparison of the non-focused menu button and the focused button." class="cmp-article__image">
  <figcaption>When you draw attention to it, it seems obvious, but I didn't notice the change when I started testing.</figcaption>
</figure>

There is some odd behavior with the main menu that’s worth calling out. By default, the menu is expanded and appears as a sidebar, but when you press the button, it collapses to show only a subset of icons. As an aside, I don’t really understand the utility of this feature. I guess it lets users de-clutter the interface a bit? It doesn’t really save that much space. Anyway, if you collapse the sidebar, your focus doesn’t move, allowing you to keep tabbing through the page as though you had done nothing. However, if the sidebar is collapsed and you activate the same button, it moves focus to the sidebar, bypassing the other navigation, whether you expected that to happen or not. It’s odd behavior, but I don’t think I can call it inaccessible, since users still *can* go back via `Shift`-`Tab`.

<figure>
  <img src="/images/accessibility-top-100/youtube/pointless-menu-collapse.png" alt="A screenshot of the menu before and after it's been collapsed." class="cmp-article__image">
  <figcaption>What is the point of saving this space?</figcaption>
</figure>

Another keyboard issue happens when you open the action menu for a video (three dots visually). When you activate the button, a menu shows up, and you can arrow up and down through it, or you can tab through it. The arrow buttons work fine, but when tabbing, you can go outside of the menu, and when you do that, there’s no way to tell what you’re focused on anymore. I can tell from the browser that I’m focused on links at times, but I have no way of knowing what those links are for.

It’s also worth noting that there’s zero ARIA roles or attributes to make this button/menu accessible to screen readers, so I guess `role="text"` was important enough to include for some `<span>` elements, but it wasn’t important enough for this more complex control. Never use ARIA when you don’t have to, but always use ARIA when you do have to.

<figure>
  <img src="/images/accessibility-top-100/youtube/options-button-dropdown.png" alt="A screenshot of the dropdown menu with options to add to queue, download, or share the video." class="cmp-article__image">
  <figcaption>If your keyboard focus escapes this dropdown, good luck finding it.</figcaption>
</figure>

The search input is set up as an ARIA combobox, but it’s missing the `aria-expanded` attribute, which is important for understanding the state of the control. The autocomplete suggestions are also marked up within a `<ul>` with `role="listbox"`, but each `<li>` element has `role="presentation"`, effectively making them invisible. My analysis: this thing is busted. The keyboard controls work about how you would expect, but your mileage may vary with screen readers.

Some other things of note: all the video thumbnails are given empty alternative text (`alt=""`), which is probably the right call, since the titles should describe the videos at least as well as a thumbnail would. When you hover over the thumbnails, however, they start playing with the sound turned off, and buttons for audio and subtitles appear that are only accessible by mouse. The video previews also seem to play regardless of your OS motion preferences.

#### Mobile

The mobile version’s `<html>` element doesn’t have a `lang` attribute, which is HTML 101 (again). Without setting the primary language of the page, it’s up to screen readers to guess the correct language, which can affect pronunciation. Even worse, YouTube disables zooming with `user-scalable=no` . They don’t do this on desktop, so they just didn’t bother to support zooming for small screens.

The desktop focus styles were bad, but the mobile ones simply do not exist, so forget about using any keyboard-like dongles with a device that’s going to get m.youtube.com. The search input is similarly busted, and the video previews still play regardless of your motion settings—this time on scroll rather than hover. There may be preferences to turn that off, though. I was getting inconsistent behavior on my phone compared to simulating mobile on my laptop.

Now about those tabs I mentioned earlier. The ones I want to look at first are the ones at the bottom of the screen for “Home”, “Shorts”, and “Library”.

<figure>
  <img src="/images/accessibility-top-100/youtube/navigation-tabs.png" alt="A screenshot of the navigation tabs, if you can even call them tabs." class="cmp-article__image">
  <figcaption>I guess they kind of visually resemble tabs? These should clearly just be links.</figcaption>
</figure>

Each of them is effectively a link containing an icon and some text, and clicking/tapping them loads a new page. This should be a simple control. Here, I’ll write up some HTML for it right now:

```html
<nav class="yt-nav" aria-label="Secondary navigation">
	<a href="/" class="yt-nav__link">
		<span class="yt-nav__icon" aria-hidden="true"><svg>...</svg></span>
		<span class="yt-nav__label">Home</span>
	</a>
	<a href="/shorts" class="yt-nav__link">
		<span class="yt-nav__icon" aria-hidden="true"><svg>...</svg></span>
		<span class="yt-nav__label">Shorts</span>
	</a>
	<a href="/feed/library" class="yt-nav__link">
		<span class="yt-nav__icon" aria-hidden="true"><svg>...</svg></span>
		<span class="yt-nav__label">Library</span>
	</a>
</nav>
```

You could quibble with whether the links should be in a list or if it’s better to set `role="presentation"` on the `<svg>` elements than `aria-hidden` on the `<span>` elements, but that’s going into the weeds. The point is it should be pretty easy to set up some simple navigation. Here’s YouTube’s markup, simplified for clarity:

```html
<ytm-pivot-bar-renderer role="tablist">
	<ytm-pivot-bar-item-renderer>
		<div class="pivot-bar-item-tab pivot-w2w" role="tab" aria-selected="true">
			<c3-icon icon-state-outline="">
				<yt-icon-shape class="yt-spec-icon-shape">
					<div style="width: 100%; height: 100%; fill: currentcolor;">
						<svg>...</svg>
					</div>
				</yt-icon-shape>
			</c3-icon>
			<c3-icon icon-state-filled="">
				<yt-icon-shape class="yt-spec-icon-shape">
					<div style="width: 100%; height: 100%; fill: currentcolor;">
						<svg>...</svg>
					</div>
				</yt-icon-shape>
			</c3-icon>
			<div class="pivot-bar-item-title pivot-w2w" aria-hidden="false">
				<span class="yt-core-attributed-string" role="text">Home</span>
			</div>
		</div>
	</ytm-pivot-bar-item-renderer>
	<ytm-pivot-bar-item-renderer>
		<div class="pivot-bar-item-tab pivot-shorts" role="tab" aria-selected="false">
			<c3-icon icon-state-outline="">
				<yt-icon-shape class="yt-spec-icon-shape">
					<div style="width: 100%; height: 100%; fill: currentcolor;">
						<svg>...</svg>
					</div>
				</yt-icon-shape>
			</c3-icon>
			<c3-icon icon-state-filled="">
				<yt-icon-shape class="yt-spec-icon-shape">
					<div style="width: 100%; height: 100%; fill: currentcolor;">
						<svg>...</svg>
					</div>
				</yt-icon-shape>
			</c3-icon>
			<div class="pivot-bar-item-title pivot-shorts" aria-hidden="false">
				<span class="yt-core-attributed-string" role="text">Shorts</span>
			</div>
		</div>
	</ytm-pivot-bar-item-renderer>
	<ytm-pivot-bar-item-renderer>
		<div class="pivot-bar-item-tab pivot-library" role="tab" aria-selected="false">
			<c3-icon icon-state-outline="">
				<yt-icon-shape class="yt-spec-icon-shape">
					<div style="width: 100%; height: 100%; fill: currentcolor;">
						<svg>...</svg>
					</div>
				</yt-icon-shape>
			</c3-icon>
			<c3-icon icon-state-filled="">
				<yt-icon-shape class="yt-spec-icon-shape">
					<div style="width: 100%; height: 100%; fill: currentcolor;">
						<svg>...</svg>
					</div>
				</yt-icon-shape>
			</c3-icon>
			<div class="pivot-bar-item-title pivot-library" aria-hidden="false">
				<span class="yt-core-attributed-string" role="text">Library</span>
			</div>
		</div>
	</ytm-pivot-bar-item-renderer>
</ytm-pivot-bar-renderer>
```

First, there isn’t an `<a>` tag in sight, and yet when you tap one of these—I guess let’s call them tabs—you are navigated to a new page with a new URL. That’s what links, a.k.a. `<a>` elements, are for. I guess they needed custom elements to backfill all the behavior that they would have gotten out of the box by using semantic elements.

Second, why are these tabs at all? As far as I can tell, there are no `tabpanel` roles to be found. Wait, didn’t I say there was another tab control earlier? Yes, yes I did. That is for these filter buttons at the top of the page that narrow down the videos that are shown. Those are also wrapped in an element with `role="tablist"` for unclear reasons, and there are no `<button>` elements for 40 miles. It’s a `<div>` and `<span>` party, where the rules are made up and the points don’t matter.

<figure>
  <img src="/images/accessibility-top-100/youtube/home-page-filters.png" alt="A screenshot of the other tabs, which don't really behave like tabs." class="cmp-article__image">
  <figcaption>Is anyone else tired? I’m tired.</figcaption>
</figure>

### Page weight and resource breakdown

#### Desktop

The home page initially weighs 16 MB, which breaks down as follows for the major resource categories:

- 487 kB HTML
- 2.8 MB CSS
- 12.1 MB JS
- 79.5 kB fonts
- 193 B images

#### Mobile

The home page initially weighs 4.6 MB, which breaks down as follows for the major resource categories:

- 224 kB HTML
- 1.2 MB CSS
- 3 MB JS
- 41.7 kB fonts
- 4.6 kB images
- 26.3 kB media

## Testing a video page

### Automated scans

#### Desktop

Right off the bat I should mention that YouTube, by default, will autoplay videos. I had forgotten this, since I immediately turn that setting off on every device that I end up watching YouTube videos on, so bad start.

I’m not going to cover all the issues that were also present on the home page but suffice it to say that they definitely could use a refresher on ARIA roles and attributes. Hell, even a link to [the spec](https://www.w3.org/TR/wai-aria-1.1/) or [MDN docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) would go a long way. Other than widespread ARIA misuse, the only automatically detected violations have to do with elements not having accessible names, which should be easy to spot and easy to fix.

For the video player itself, there are several inputs that don’t have visible labels. This covers the playback slider for scrubbing through the video, the volume slider, and a third mystery control that I couldn’t figure out what it was (maybe chapter selection?). It’s interesting to me that the automated tooling surfaced those and not all the other buttons that have no visual text label. They have `title` attributes, so maybe that’s satisfying the tool. Visual labels *may* not be necessary for these buttons because they’ve been widely used for many years now, but what’s the harm in having a little text? Just stick it under the icon, it’s fine.

<figure>
  <img src="/images/accessibility-top-100/youtube/player-controls.png" alt="A screenshot of the video player controls, none of which have visual labels." class="cmp-article__image">
  <figcaption>Imagine a world where you wouldn't need to guess what icons meant.</figcaption>
</figure>

#### Mobile

Autoplay is still an issue on mobile, but this time the video starts muted and you have to tap to unmute it. I suppose this is better than the desktop experience—you don’t want to accidentally start blasting a video in the waiting room at the dentist.

Again, a lot of the same issues from the home page are present here, but there are more focusable elements inside `aria-hidden` elements and links with no accessible names. These seem to be in the video thumbnails for suggested videos. Again, the `<html>` element does not have a `lang` attribute, they disable zooming, and there is no `main` region, but only for mobile versions of the site.

### Manual testing

#### Desktop

Keyboard focus starts on the video, which may be playing automatically. You can press the space bar to pause the video immediately, thereby succeeding [1.4.2 Audio Control (A)](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html) but violating the rule of “just don’t autoplay videos, man.” At least make it opt-in, not opt-out.

Keyboard focus indicators are about as bad as they are on the home page, but there are fewer that are outright invisible here. Within the video player itself, the keyboard controls are pretty good except for one spot where you can tab to nothing before tabbing again to get to the play button. This is, unfortunately, an improvement over the native `<video>` element, which has quite a few [accessibility issues](https://adrianroselli.com/2023/09/browser-video-players-review.html) due to browser implementations. Those issues are just one reason that you’re probably more likely to see a YouTube embed of a video than a `<video>` element on any given website.

#### Mobile

Again, focus indicators simply don’t exist on m.youtube.com, and all the other issues I’ve mentioned are still in place here. The video settings get reworked into a modal dialog, and there are some weird choices in there, like setting `tabindex="0"` on a `<div>` that’s also an ARIA live region for some reason. I’m going to stop digging because I’ll just keep finding things, and this is already way too long.

### Time-base media

I do want to spend a little time on aspects related to time-based media. YouTube is a platform that relies on user uploads, so it’s not necessarily their fault if users upload videos without accounting for accessibility. However, this makes YouTube an authoring tool, which means they need to give creators the means to make their videos accessible. So how do they do with captions, transcripts, and audio descriptions?

#### Captions

I’m not a YouTuber, so I haven’t seen the backend where users upload videos, but from what I understand, there’s a mechanism for auto-generating captions, which creators can edit before publishing the videos. This is good stuff, especially if the captions are accurate and synced up correctly. From the videos I’ve checked, they mostly seem to be of reasonable quality, or at least better than the “craptions” that some automated tools generate.

On the other side, there are options for caption font sizes, colors, and a variety of other tweaks that end users can make to improve their experience. So far, this is the best YouTube has done in terms of accessibility.

#### Transcripts

I picked a video that would have a lot of visual elements along with dialog so I could see whether the transcripts or audio descriptions did an adequate job of describing the visuals. For example, there’s a part in the trailer where a futuristic aircraft chases Kong into a whirlpool that turns into a wormhole with some trippy lighting effects. What does the transcript say for that part?

> 1:09 Oh my God!  
> 1:13 [soundwaves warbling]  
> 1:15 **♪♪♪**  


Okay, so the transcript seems to just be the captions. This sort of thing might be fine for your typical video essay or podcast of two dudes talking, but this transcript is definitely not an equivalent experience to watching the video. I suppose it’s up to creators to put the time in to get transcripts right, but I doubt many do.

#### Audio Descriptions

Oops, there aren’t any audio descriptions. There isn’t even a mechanism for them. I’m a little surprised at this, given that [1.2.5 Audio Description (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html) is a Level AA success criterion and YouTube has had well over a decade to implement support for them. With some light research, it seems YouTube may have had a beta version of audio descriptions that was only available for some creators, but I couldn't find anything indicating that it went anywhere.

So what are the options if you’re a creator? Well, you could bake audio descriptions into your videos from the start, or you could create a separate video that has audio descriptions baked in, and then link to that from the main video. Neither of these seem workable to me, either because people who don’t need audio descriptions probably wouldn’t want to watch videos with them, or because having two nearly identical videos would wreak havoc with YouTube’s algorithm and monetization while being a lot more work.

### Page weight and resource breakdown

#### Desktop

The video page initially weighs 18.8 MB, which breaks down as follows for the major resource categories:

- 886 kB HTML
- 3.2 MB CSS
- 12.1 MB JS
- 79.5 kB fonts
- 157 kB images

#### Mobile

The video page initially weighs 7.9 MB, which breaks down as follows for the major resource categories:

- 521 kB HTML
- 1.2 MB CSS
- 3.3 MB JS
- 41.7 kB fonts
- 90.9 kB images
- 26.3 kB media

## Results

I dug a little deeper into the technical issues than I intended, so I’ll summarize the worst accessibility issues based on the impact on users. The poor keyboard focus indicators, lack of zoom support on mobile, and nonexistent support for audio descriptions are among the worst offenders. Also, with all the ARIA misuse, there’s a high chance of content being incomprehensible to screen reader users. Either that or controls will behave in totally unexpected ways for them.

Ultimately, I think the most critical tasks can be achieved, but there are unnecessary hurdles in the way. What got under my skin the most during this evaluation was the utter lack of craftsmanship on display. So many of these issues are extremely easy to check for with automated tools—even Lighthouse, which is developed by their buddies/overlords at Google, gives [youtube.com](http://youtube.com) a score of 79 out of 100.

YouTube prints money for its parent company, whose value is measured in *trillions*. There simply is no excuse for not having accessibility experts on staff all the way from design to code who could catch these obvious issues. I know those people are available within the Google-verse. They’re out there writing tutorials so people can [learn about accessibility](https://web.dev/learn/accessibility/). Get them working with product teams!

*Sigh*. At least that’s done with. What’s next, Amazon?

😶
