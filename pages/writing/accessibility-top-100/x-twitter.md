---
title: "How accessible is X/Twitter? - Writing - Dustin Whisman"
description: "How accessible is X/Twitter? This is part 5 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is X/Twitter?"
layout: default
date: 2024-05-11T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is X/Twitter?

_This is part 5 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at X/Twitter. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

Since, at time of testing, an account is required to use the site, I tested the signup flow. Mercifully, the site does not use adaptive design, so I can spend a little less time testing at small screen sizes. I also tested the home page after signup was complete.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/x-twitter/desktop-h.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/x-twitter/desktop-v.png" alt="A composition of screenshots from the desktop version of twitter.com, showing the login page, sign-up modal dialog, and home page." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

<figure>
	<img src="/images/accessibility-top-100/x-twitter/mobile.png" alt="A composition of screenshots from the mobile version of twitter.com, showing the login page, sign-up modal dialog, and home page." class="cmp-article__image">
	<figcaption>These are the pages that were tested on mobile.</figcaption>
</figure>

I tested X/Twitter on May 11th, 2024.

## Testing the login page

### Automated scans

The main login page fares pretty well, with the only critical issues being the color contrast on the “Create account” button (link) and disabling zoom on mobile devices. The contrast ratio in question is 3:1, so this could either be solved by adjusting the colors or by increasing the font size.

<figure>
	<img src="/images/accessibility-top-100/x-twitter/blue-contrast.png" alt="A screenshot showing the button with insufficient contrast." class="cmp-article__image">
	<figcaption>Large text (14pt bold or 18pt regular) would do it.</figcaption>
</figure>

As for disabling zoom, there’s no excuse for that, but attempting to zoom in does make it pretty obvious that the “Sign up with Google” button is third-party content, dropped in via `iframe`.

<figure>
	<img src="/images/accessibility-top-100/x-twitter/broken-zoom.png" alt="A screenshot showing the Twitter login page zoomed in. The only element that changed size is the Google sign-in button, which is heavily obscured." class="cmp-article__image">
	<figcaption>I'm sure this is what people want when they zoom in.</figcaption>
</figure>

As an aside, I can’t avoid the temptation to drag Google. What are they even doing over there?

```html
<!-- some attributes redacted for clarity -->
<div tabindex="0" role="button" aria-labelledby="button-label">
	<div class="nsm7Bb-HzV7m-LgbsSe-MJoBVe"></div>
	<div class="nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb oXtfBe-l4eHX">
		<div class="nsm7Bb-HzV7m-LgbsSe-Bz112c">
			<svg viewBox="0 0 48 48">
				<!-- redacted for clarity -->
			</svg>
		</div>
		<span class="nsm7Bb-HzV7m-LgbsSe-BPrWId">Sign up with Google</span>
		<span class="L6cTce" id="button-label">Sign up with Google</span>
	</div>
</div>
```

As far as document structure goes, Twitter is pretty `div`-heavy. I counted four nested `div` elements before the `main` element appeared. They also decided not to put their footer content in a `footer`, instead opting to put those links in a `nav` labeled as “Footer” within the `main` landmark region. Not technically inaccessible, but not super helpful either.

Also of note, they put `role="link"` on many links and `role="navigation"` on a `nav` element, which is redundant at best. Better to leave off the implicit roles to decrease the risk of someone breaking them in a future update.

### Manual testing

Focus styles are missing for some elements and incredibly subtle for others. I tried to emulate focus styles to grab a screenshot, but then I found that they’re not using `:focus` or `:focus-visible` in CSS to change the styles. That would be too easy. Instead, they’re toggling classes with JavaScript when links receive or lose focus. Baffling.

<figure>
	<img src="/images/accessibility-top-100/x-twitter/subtle-focus.png" alt="A screenshot showing how hard it is to tell which element has focus." class="cmp-article__image">
	<figcaption>Quick, tell me which element has focus.</figcaption>
</figure>

At least on desktop, the interface zooms well at 200% and 400%, with no content overflowing and all the text scaling up just fine.

### Page weight and resource breakdown

The login page initially weighs 7.4 MB, which breaks down as follows for the major resource categories:

- 302 kB HTML
- 533 B CSS
- 6.2 MB JS
- 188 kB fonts
- 172 B images

One of these numbers is not like the others. Take a wild guess what framework they’re using.

```html
<div id="react-root" style="height:100%;display:flex;"></div>
```

## Testing the account creation process

### Automated scans

I want to note that the big blue “Create account” button is a link (a.k.a. `a` tag) with `role="link"` and an `href` that points to [https://twitter.com/i/flow/signup](https://twitter.com/i/flow/signup). So what happens when you click that link? It opens a modal dialog of course.

You can open that link in a new tab and it does at least work. You see the same dialog but without the login page background, and when you close the dialog, you *might* get redirected back to the login page. I tried a couple times and sometimes it worked and sometimes it didn’t. It’s an odd choice and one that must be harder to maintain than picking one option over the other.

Re-running the scans after opening the dialog reveals that the dialog does not have an accessible name. There are also an awful lot of `div` elements with `tabindex="0"` that don’t have ARIA roles or labels that would indicate to screen reader users what they’re focused on and why. I’m guessing this is for focus trapping, but if focus is going to be managed through JavaScript, then `tabindex="-1"` would be more appropriate (or just moving focus to interactive elements only).

On closer inspection, there’s actually a dialog within a dialog. The outer one is the one that’s not labeled, while the inner one is labeled by the modal’s heading, which it turns out is the page’s `h1`. The dialog has several elements with [`role="group"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role), which are completely the wrong tool for the job. It would be better to use [`role="document"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/document_role), since that switches screen readers back into reading mode instead of more context specific modes they may be in because of the [dialog role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role).

Better yet at this point would be to use the [`dialog` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog), which has good browser support and would save a lot of trouble that this home-grown solution has. Or, you know, they could put it on a different page like the link implies.

IBM’s accessibility checker flags the interactive elements behind the modal as being focusable, but keyboard focus does seem to be trapped within the modal. It’s possible that screen reader users could escape the modal by using the virtual cursor, but I don’t know if that’s the case here.

IBM also flags the elements with `tabindex="0"` and/or `role="group"` for being focusable despite not having widget roles, as well as not having accessible names. In short, the modal dialog is a mess.

### Manual testing

As I mentioned earlier, keyboard focus is trapped within the modal dialog, so that’s good, but you can’t press “Esc” to close it. The focus states are much more visible for the form elements, but the “Next” button is disabled, and by disabled, I mean it isn’t a button at all.

```html
<!-- some attributes redacted for clarity -->
<div aria-disabled="true" role="button" tabindex="-1" >
	<div dir="ltr">
		<span>
			<span>Next</span>
		</span>
	</div>
</div>
```

This might explain why the page needs 6.2 MB of JavaScript—they need to replace the things that they could get for free by using the `button` element.

Speaking of which, while attempting to sign up using only the keyboard, I couldn’t activate the “button” to use email instead of a phone number. That’s because it too is a `div` with `role="button"` that does not handle keypress events for “Space” or “Enter”. When I finished filling in the form, I had to tab to the “Next” button, since typical form submit behavior was also not wired up. Come to think of it, I don’t remember seeing a `form` element at all. There might have been one buried in all the `div` soup somewhere.

I didn’t dig deep into the confirmation and basic account setup steps, but to summarize, I had to step through a series of modal dialogs to set a password, choose a few areas of interest, and choose at least one account to follow. On some of these interfaces, there were hundreds of options and no way to bypass them with the keyboard, so I had to tab through *all* of them. Maybe I could have used “Shift+Tab” at the start to go straight to the end, but that didn’t occur to me when I started tabbing through, and if a screen reader user didn’t know how many options there were (seems likely), I doubt it would occur to them either.

## Testing the home page

### Automated scans

Now that we’re in the meat of the site, there are more automatically detectable issues. We’ve got:

- Links without accessible names
- Missing ARIA attributes on the search input with [`role="combobox"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/combobox_role)
- A broken tab control due to ARIA misuse
- Invalid ARIA attributes (a pretty wide array of misused attributes)
- More blue buttons with insufficient contrast
- Unlabeled inputs and buttons
- Zooming and scaling disabled on mobile devices
- Nested interactive controls (buttons containing links or other buttons)
- Multiple navigation landmarks without unique names
- Elements not contained by landmark regions
- Accessible names not matching or including visual text
- Focusable elements that don’t have [widget roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#2._widget_roles)
- Invalid element IDs that are referenced by `aria-labelledby` attributes
- A `label` element that doesn’t contain any text
- More redundant ARIA roles on links, headings, and landmark regions

That’s more like what I was expecting going into this. The missing accessible names and broken ARIA widgets are the worst offenders here, as I could see those being pretty major blockers for authoring posts and navigating within the page.

The rest are generally uninteresting issues or ones I’ve covered in more detail in previous evaluations. My advice: use semantic elements, look up ARIA roles and attributes before using them, and make sure you actually label things.

### Manual testing

There are skip links at the start of the page, however they do not become visible when focused, so you’d never know they exist unless you were using a screen reader. They are also buttonized `div` elements instead of links, so that’s fun.

The keyboard focus order becomes an issue if you can’t use those skip links. There are two sidebars, and you can tab through the first one, no problem. Then when you get to the main content, you can tab indefinitely, which will continue to load more posts, making it impossible to ever get to the second sidebar. The “Accessibility” link is in that sidebar, which is very cool, great job.

<figure>
	<img src="/images/accessibility-top-100/x-twitter/focus-order.png" alt="A screenshot showing the dots and lines connecting each focusable element. Many of them are highlighted as having potential issues." class="cmp-article__image">
	<figcaption>In theory, you could get to that sidebar if you lost your internet connection.</figcaption>
</figure>

The “Post” button is actually a link that opens a modal dialog, just like on the login page, and this dialog has all the same issues as the other one had, but with the addition of an unnamed element with [`role="progressbar"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role). I’m guessing that’s to indicate progress when you click “Post”, which I didn’t do because I’d rather not post anything on this site, even with a burner account.

By the way, I think we have a new record for the soupiest `div` soup—I counted _45_ `div` elements between the textbox (which is a `div` with `role="textbox"`) and the `body` tag. Truly incredible.

I took a quick look at the search input to see whether it’s wired up even remotely correctly, and I can confirm that it absolutely is not. It’s missing ARIA attributes left and right, and the suggested options nest interactive controls—it’s pretty busted.

A cursory glance at images shows that they tend to have empty `alt` attributes despite not being decorative, or they default to `alt="Image"`, which is about as useless as alt text can be. The only “useful” alt text I found was for emojis, where the actual emoji itself would be used as the alt text. I’m unclear why the emoji couldn’t be used instead of an image of the emoji.

### Page weight and resource breakdown

The home page initially weighs 12 MB or more, depending on what posts appear above the fold, which breaks down as follows for the major resource categories:

- 184 kB HTML
- 0 B CSS (aggressive caching, perhaps?)
- 9.2 MB JS
- 178 kB fonts
- 404 kB images (depends on top posts on page load)
- 0 B media (if no videos are above the fold on page load)

## Results

Overall, things weren’t quite as bad as I expected, which isn’t to say that they were good. The login page would be passable if it weren’t for the modal dialog mess that is the signup flow. Given the choice between putting content in a modal dialog or on a standalone page with its own URL, I will pick the standalone page every time—it’s so much easier to not get wrong.

The home page after signing up had a lot of the common issues I’ve come to expect from these top 100 sites. I’m consistently surprised at how semantic elements are avoided in favor of ARIA monstrosities. Maybe I’m just lazy, but I’d much rather use the thing that does what I want by default rather than (unsuccessfully) recreating it from scratch. I guess I’m just not extremely hardcore enough.

X/Twitter gets a D for `div`.
