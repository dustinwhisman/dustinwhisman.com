---
title: "How accessible is Facebook? - Writing - Dustin Whisman"
description: "How accessible is Facebook? This is part 4 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is Facebook?"
layout: default
date: 2024-04-14T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is Facebook?

_This is part 4 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at Facebook. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

Since Facebook requires an account to do anything, I tested the sign-up process. This includes the login page, the account creation steps, and the first page that shows up after signing up.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/facebook/pages-desktop.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/facebook/pages-desktop-vertical.png" alt="A composition of screenshots from the desktop version of facebook.com, showing the login page next to the same page with a sign-up modal dialog." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

Yet again, Facebook uses `m.facebook.com` to serve completely different code to mobile devices. I'll be thrilled when I get to a site on this list that uses basic responsive design.

<figure>
	<img src="/images/accessibility-top-100/facebook/pages-mobile.png" alt="A composition of screenshots from the mobile version of facebook.com, showing the login page next to one page that's part of the sign-up process." class="cmp-article__image">
	<figcaption>These are the pages that were tested on mobile.</figcaption>
</figure>

I evaluated Facebook on April 14th, 2024.

## Testing the login page

### Automated scans

#### Desktop

The login page has color contrast issues, mostly for the links in the footer. Those have a contrast ratio of 3.33:1 with the background, which would be fine for large text, but these are tiny links with `font-size: 12px`. And yes, the font size is declared in pixels, which does not bode well for zooming in.

There are a couple document structure issues as well. There’s no level one heading, even though the big blue “facebook” image seems like an ideal candidate.

<figure>
	<img src="/images/accessibility-top-100/facebook/logo-heading.png" alt="A screenshot of the Facebook logo above text that says 'Connect with friends and the world around you on Facebook.'" class="cmp-article__image">
	<figcaption>It's big. It's blue. It's the most obvious choice to be the heading.</figcaption>
</figure>

Let’s play a quick game. How many nested `<div>` elements deep is the `<img>` tag for that logo? Write your guesses in your notebook and then reveal the code to find the answer.

<details class="cmp-stack">
<summary>Reveal the answer</summary>

```html
<!-- other elements redacted for clarity -->
<div class="_li" id="u_0_1_Vr">
  <div id="globalContainer" class="uiContextualLayerParent">
    <div class="fb_content clearfix " id="content" role="main">
      <div>
        <div class="_8esj _95k9 _8esf _8opv _8f3m _8ilg _8icx _8op_ _95ka">
          <div class="_8esk">
            <div class="_8esl">
              <div class="_8ice">
	              <img class="fb_logo _8ilh img" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook">
              </div>
              <h2 class="_8eso">Connect with friends and the world around you on Facebook.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

The correct answer is 8.

</details>

Did you notice anything else unusual in there? The `<div>` with `role="main"` caught my eye. That could (and should) easily be replaced with the semantic `<main>` element. I checked the footer as well, and it used a `<div>` with `role="contentinfo"`, which is the correct way to avoid using the `<footer>` element even though there’s no reason to do so. What developer learns about the `contentinfo` role before they learn about the `<footer>` element? Oh, and they didn’t even put all the elements in the footer that look like they belong there, so we have about a dozen elements that aren’t in landmark regions.

Elsewhere, the form controls use placeholders as visual labels. They’re not even the type that use floating labels that move above the input when you start typing—they’re just placeholders, which are known to be harder to use since people forget what field they’re typing in. In this case, I doubt that’s much of an issue, since login forms are so straightforward, but still, how hard is it to use a normal label?

#### Mobile

The color contrast issues persist on mobile, but there are fewer elements affected because most of the links from desktop are removed completely or hidden behind a link that looks like a button that contains a `<div>` that incorrectly uses `aria-label` .

```html
<a href="/language/?next_uri=https%3A%2F%2Fm.facebook.com%2F%3Fwtsid%3Drdr_0vmKYj8gNU9QLOnVf&amp;page_style=1&amp;refid=8">
	<div class="_3j87 _1rrd _3ztd" aria-label="Complete list of languages" data-sigil="more_language">
		<i class="img sp_oGF7b0qQ4rN_3x sx_d0ecdc"></i>
	</div>
</a>
```

To avoid changing the existing approach, the `aria-label` should be moved to the `<a>` element. However `aria-label` text may not be translated by browsers, and without visible text, it’s harder for speech control users to specify the link, so having some visible text, even if it’s just “All languages” next to the button icon would help make this more usable. Either that or show all the languages that are available on the login page by default, but I can see how that would be overwhelming and hard to design around.

Great news! The mobile version of the page has a level one heading. Bad news! That heading element isn’t contained by a landmark region.

For some undiscernible reason, the `<body>` tag has a `tabindex="0"` attribute. This makes it so the body, which is not interactive, receives focus, and because it doesn’t have a role or accessible name, screen readers have no good way to communicate what the user is focused on or why.

In the login form, the `<button>` is given `type="button"`, which overrides the default behavior of buttons with `type="submit"` that allows forms to be submitted by pressing the “Enter” key from within an input. That behavior still seems to work, though, so I’m guessing they re-implemented that with JavaScript—seems brittle.

The worst issue is that Facebook disables zooming and scaling on mobile. I’m surprised this keeps popping up, especially for simple pages like this where it wouldn’t be at all difficult to make sure nothing breaks when zoomed in. There are plenty of techniques that help prevent issues with zooming, like using relative size units instead of pixels for font sizes and media queries. It seems weird to me to just not bother with it at all.

### Manual testing

#### Desktop

Keyboard focus indicators have good contrast and the focus order makes intuitive sense, although there are a couple visually hidden links at the end of the page that are focusable but do not become visible when focused.

<figure>
	<img src="/images/accessibility-top-100/facebook/keyboard-focus-order.png" alt="A screenshot of the login page with dots and lines connecting each element that would be focused in order. The last two links aren't visible, but have dots shown for them anyway." class="cmp-article__image">
	<figcaption>Note how numbers 49 and 50 don't correlate to anything visible.</figcaption>
</figure>

At 200% zoom, everything reflows well and nothing causes overflow. The text scales up despite the pixel sizing, but that may not be the case for other zooming/scaling software that specifically targets text rather than the entire page. For example, changing my browser settings to set the default text size to “Very Large” changes nothing about the page. Elements start to overflow at 400% zoom level, but because there are so few elements, the page is still navigable and usable.

<figure>
	<img src="/images/accessibility-top-100/facebook/400-percent-zoom.png" alt="A screenshot of the page zoomed into 400%. The form controls for email and password are mostly visible, but they are overflowing past the edge of the screen." class="cmp-article__image">
	<figcaption>It should be pretty easy to avoid this kind of overflow.</figcaption>
</figure>

#### Mobile

There’s a disclosure (show/hide) button on mobile that I only investigated because I couldn’t tab to it when testing with the keyboard. It looks like a link that says “More”, it acts like a button when tapped, but it’s written as a `<span>` element with absolutely no ARIA roles or attributes to signify its purpose or connect it to the content that is hidden or revealed. It turns out this is where all those links from the desktop version ended up.

```html
<!-- other elements redacted for clarity -->
<div class="_96qv _9a0a">
	<span class="_96qw" id="u_0_5_BA">More</span>
</div>
<div class="_96qv" style="display: none;" id="u_0_6_gG">
	<!-- a bunch of links not structured as a list -->
</div>
```

This ends up making all of those links completely inaccessible for some users, since a screen reader would either bypass the `<span>` entirely or announce it as plain text instead of a button. Doing it properly would look something like this:

```html
<button type="button" aria-expanded="false" aria-controls="more-links">
	More
</button>
<ul id="more-links" hidden>
	<!-- the list of links that are hidden by default -->
</ul>
```

Then whatever JS is already being used to handle the click event would need to toggle `aria-expanded` on the button and the `hidden` attribute on the list of links.

### Page weight and resource breakdown

#### Desktop

The desktop home page initially weighs 1.5 MB, which breaks down as follows for the major resource categories:

- 57.5 kB HTML
- 65.7 kB CSS
- 771 kB JS
- 6.6 kB images

It says something about modern web development that my reaction to a login page that uses 771 kB of JavaScript was “huh, surprisingly restrained.”

#### Mobile

The mobile home page initially weighs 1.8 MB, which breaks down as follows for the major resource categories:

- 59.6 kB HTML
- 66 kB CSS
- 1.0 MB JS
- 14.1 kB images

Not quite so restrained on mobile, are we? Good thing phones famously have more powerful processors and better network access than laptops/PCs to make up the difference.

## Testing the account creation process

The desktop and mobile versions of the site have fairly distinct flows for signing up. The desktop site uses a modal dialog with one big form on the login page, but the mobile site breaks the sign-up form into several pages that ask one or more questions at a time. I ended up evaluating the desktop form without submitting it and completed sign-up with the mobile version.

### Automated scans

#### Desktop

Ignoring the issues already present with the login page, the sign-up modal dialog and form introduce a few more issues. Again, the form controls use placeholders as their visual labels and the fine print at the bottom of the form has insufficient color contrast (4.48:1, which is super close, but still fails).

The links that are part of the paragraphs below the form do not have underlines or any other decoration, meaning that color is the only thing distinguishing them from the surrounding text. This is a problem for people with color blindness or low vision. Color must be used *in addition to* some other method for distinguishing content, not *instead of*.

The radio buttons for gender are not grouped together using a `<fieldset>`, making the relationship from those inputs less clear. The relationship gets even less clear if you choose the third gender, “Custom”, which reveals a `<select>` control with options for pronouns and another `<input>` for specifying a gender. That last field is optional, but the others aren’t, so I’m confused about what’s optional here. It seems like this whole thing could be simplified by having one field for pronouns, since it seems like that’s the only thing that Facebook uses for automated messages.

<figure>
	<img src="/images/accessibility-top-100/facebook/the-three-genders.png" alt="A screenshot of the confusing options for specifying a gender. Three radio buttons give the options Female, Male, and Custom, while a dropdown is shown for pronouns and an optional text input is shown for gender." class="cmp-article__image">
	<figcaption>"It's not othering, it's customizing." - someone at Facebook</figcaption>
</figure>

#### Mobile

In a reversal from desktop, the inputs on mobile have visual labels instead of placeholders. However, they do not use `<label>` elements and they aren’t associated to the `<input>` elements, meaning the inputs don’t have accessible names. I bet you can’t guess what element they used instead of a `<label>`. Write your guesses in your notebook and then reveal the code to find the answer.

<details class="cmp-stack">
<summary>Reveal the answer</summary>

```html
<!-- other elements and attributes redacted for clarity -->
<div>
	<div>
		First name
	</div>
	<div>
		<div>
			<input name="firstname"	value="" id="firstname_input" type="text">
		</div>
	</div>
</div>
```

Yeah, of course it’s a `<div>` , with a few other wrapping `<div>` elements thrown in for good measure.

</details>

Other issues that the login page had persist here as well, including color contrast, elements outside of landmark regions, and `tabindex="0"` being set on elements that either don’t need it or should be buttons.

### Manual testing

#### Desktop

Once you’ve opened the sign-up modal dialog, there’s no way to close it with the keyboard other than submitting the form or reloading the page. I would expect it to close after pressing the “Escape” key or at least for the close button to be focusable. Surprise surprise, it’s just a `<div>` with no ARIA roles or attributes. I don’t know if I’ve captured just how soupy this div soup is, but it’s quite bad.

There’s a lot of inline validation in this form, and basically none of it is set up correctly. For example, this popup appears when you’ve tabbed out of the “First name” field and then back to it.

<figure>
	<img src="/images/accessibility-top-100/facebook/whats-your-name.png" alt="A screenshot of error validation showing a message that says What's your name? next to the input for first name." class="cmp-article__image">
	<figcaption>Oh wow, such helpful validation instructions.</figcaption>
</figure>

For people who can see it, that works. However, the `aria-describedby` attribute points to an `<a>` tag with the inner text “Close popup and return” rather than the nearby `<div>` that says “What’s your name?” There’s also no way to get to the link that supposedly closes the popup via the keyboard.

People who use screen readers often cycle through all the fields in a form to understand what needs to be filled in before entering any information, so this inline validation can be quite disruptive (especially when it’s broken like this).

<figure>
	<img src="/images/accessibility-top-100/facebook/validation.png" alt="A screenshot of the sign-up form with nearly all form controls highlighted red with error icons to indicate required fields." class="cmp-article__image">
	<figcaption>Validating on submit tends to be more usable and easier to implement, just saying.</figcaption>
</figure>

Also, someone was really determined to avoid using a `<button>` for the tooltips for additional information.

```html
<div class="mtm mbs _2_68">
	Birthday
	<a
		class="_58ms mlm"
		id="birthday-help"
		href="#"
		title="Click for more information"
		role="button"
		aria-describedby="u_7_3_sr"
		tabindex="0"
	>
		<i class="img sp_98fCI7IVTTz sx_c4643a"></i>
	</a>
</div>
```

Use a `<button>`! It’s not that hard! And by the way, the tooltip uses the “dialog” role instead of, you know, the “tooltip” role that would be more appropriate.

#### Mobile

Once again, there are more buttons that aren’t buttons. Otherwise, there’s not much that’s notable until the phone number page, which has a link to “Sign Up With Email” that is not focusable. It at least is an `<a>` element, but it does not have an `href` attribute, so it gets treated as a non-interactive element. If I tap that link, it swaps the phone number field for an email field without performing navigation, which makes it a perfect candidate for… the `<button>` element!

Maybe Facebook is worried about browser support, I mean the `<button>` element was only added to the HTML spec around 1999 or so—it takes time for browsers to catch up to these newfangled elements, you know.

Anyway, in going through the sign-up process, I encountered more similar issues where elements weren’t focusable, or the document suddenly wouldn’t have a `<title>`, and at one point I pressed “Enter” to submit a form, but a different action was taken because the submit button wasn’t the one I expected it to be. I also ran into a CAPTCHA (always a barrier, even if done “correctly”), and then I had to enter my email again, despite having already given it, and then once I was done, rather than seeing more account setup stuff, I was notified that my account was suspended.

I guess they didn’t like that the sign-up process took me several hours and that I kept reloading the page and scanning it with extensions. Dang, I was looking forward to commenting “Amen” on AI generated pictures.

### Page weight and resource breakdown

The mobile sign-up pages are broken up, but the first one weighs 2.1 MB, which breaks down as follows for the major resource categories:

- 100kB HTML
- 23.1 kB CSS
- 1.3 MB JS
- 2.9 kB images

## Results

In terms of _volume_, Facebook had fewer accessibility errors than some of the other sites I’ve tested, but this is almost certainly due to the simplicity of the pages in question. It’s clear from even a cursory glance at the HTML for any given page that Facebook has a bad case of div-itis. They don’t appear to understand semantic elements, they certainly don’t understand ARIA, and I'd wager they don't care about accessibility all that much.

These pages are so simple that it should be trivial to fix all the accessibility issues I found. Nearly everything would be fixed by doing the following, none of which is hard to do:

- Use semantic elements
- Set appropriate color contrasts
- Label form controls correctly
- Use relative units for font sizes
- Don’t disable zooming

I never got into the core functionality of Facebook, but I have to assume it’s much much worse. Interestingly, I have another Meta product (Instagram) coming up pretty soon on the list, so I’m curious how much that will differ or if it will have the same types of issues. But next time, I’ll be evaluating X, née Twitter, a.k.a. The Everything App.
