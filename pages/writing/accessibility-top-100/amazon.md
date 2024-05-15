---
title: "How accessible is Amazon? - Dustin Whisman"
description: "How accessible is Amazon? This is part 3 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is Amazon?"
layout: default
date: 2024-03-17T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is Amazon?

_This is part 3 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at Amazon. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

For this evaluation, I tested Amazon’s [home page](https://www.amazon.com/), a [search results page for the term “4k tv”](https://www.amazon.com/s?k=4k+tv&crid=1JZ5MJBDJIGSQ&sprefix=4k+tv%2Caps%2C108&ref=nb_sb_noss_1), and the [first product details page](https://www.amazon.com/INSIGNIA-43-inch-Class-Remote-NS-43F301NA25/dp/B0CMDJ8TK3/ref=sr_1_3?crid=1JZ5MJBDJIGSQ&dib=eyJ2IjoiMSJ9.S4RDQMDihLopk6k4Ng_-pySTQKeS3rNaNbpphgVsppbEIG1wmm8rkg9rFVzGl-_4DR4BbA1sHDN9r3ajgCVh09_AxmBD_-x3tJ1qPmO6meAKy-fZUS6AbCVrmfuiDzMxXE6Ta2Bkca0hHVfMXY7_nHVAbnaqWHaSSdexHwQpJplBgrHPn_Kh7QNZj6bsfyXrXe6cNwN1MbLtvDWjLEKcnxSErXFcvu6qIgw_SOktoV4.OgDO2YJpxNUL3xb-z6MBxj66pvFGzvdLwpyjkyYy83U&dib_tag=se&keywords=4k+tv&qid=1710687772&sprefix=4k+tv%2Caps%2C108&sr=8-3) from that search results page that wasn’t an ad. I’m not endorsing the TV in any way—I just wanted a representative page of a common thing that people might buy on Amazon.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/amazon/pages-tested-h.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/amazon/pages-tested-v.png" alt="A composition of screenshots from the desktop version of amazon.com, showing the home page, a search results page, and a product page." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop</figcaption>
</figure>

Once again, I am cursed to test duplicate versions of each of these pages because Amazon uses adaptive design rather than responsive design, serving up different versions of the page based on some sort of device detection. This seems to be a trend with sites that have been massive since before 2011.

<figure>
	<img src="/images/accessibility-top-100/amazon/pages-tested-mobile.png" alt="A composition of screenshots from the mobile version of amazon.com, showing the home page, a search results page, and a product page." class="cmp-article__image">
	<figcaption>These are the pages that were tested on mobile.</figcaption>
</figure>

I evaluated Amazon on March 17th, 2024.

## Testing the home page

I was immediately confronted with a CAPTCHA, so bad start. Most likely this is because I use an incognito browser for testing, but [CAPTCHAs are the number one complaint for screen reader users](https://webaim.org/projects/screenreadersurvey10/#problematic). Regardless of whether they are technically accessible by having an audio version, they are a user-hostile experience that should be avoided. What follows are the results after bypassing the CAPTCHA.

### Automated scans

#### Desktop

We have the usual suspects for accessibility issues for the home page: missing or inappropriate alt text, ARIA misuse, missing accessible names and labels, and content not being contained by landmark regions.

For the alt text issues, there is one image that has no `alt` attribute (or `aria-label` or `title`), and it is wrapped by a link that also does not have an accessible name, so that’s sort of a double whammy. A screen reader user might hear something like “link, 351212e6-d905-4397-8838-b9a5bc65ffd3.jpg” or just “link” instead of anything useful. There are also a series of images that have alt text that matches visible text *and* the accessible name of the link wrapping the image, while *also* not describing the image at all.

<figure>
	<img src="/images/accessibility-top-100/amazon/inappropriate-alt-text.png" alt="A screenshot showing a grid of images that each have short captions that, by themselves, don't describe the images." class="cmp-article__image">
	<figcaption>A good test for whether you can treat images as decorative: if you remove the image, do you still have all the information you need?</figcaption>
</figure>

Since some of these images have additional context, like the Mean Girls link showing the cover of a book and the Aquaman link showing an action figure rather than a movie poster, I don’t think treating them as decorative is appropriate here. The link wrapping the image and visible text has an `aria-label` to set the link’s accessible name, so the alt text might get swallowed as-is, but the component could be reorganized to break the image out of the link while still having it be clickable by sighted users. That way, screen reader users could hear the description of the image immediately followed by the more concise link description, giving them more context about what the link will lead to.

Looking into the content that isn’t contained by landmark regions, most of it is in the footer of the page, and for some reason, Amazon marks up a section as a `<table>` without a header row within a `<div>` with `role="navigation"`. It would be pretty trivial to style a `<nav>` full of the same links with CSS grid, so this choice doesn’t make sense to me and makes it much harder to understand and navigate via assistive tech.

<figure>
	<img src="/images/accessibility-top-100/amazon/unnecessary-table.png" alt="A screenshot of part of amazon.com's footer that has no reason to be a table other than laying out items in a grid." class="cmp-article__image">
	<figcaption>CSS grid has been widely supported for many years.</figcaption>
</figure>

There are a handful of links that have accessible names that don’t match the visible text, which makes it harder for people using speech control software to select those elements. For example, one of them is a link with an American flag and the letters “EN”, but its accessible name is “Choose a language for shopping.” Side note: languages aren’t the same as countries.

The language selection link also has hover-only behavior that allows users to quickly choose supported languages, but none of that is exposed to keyboard users or screen reader users. Clicking the link goes to a page that achieves the same goal, so it’s not necessarily a blocker, though.

<figure>
	<img src="/images/accessibility-top-100/amazon/country-link-with-hover-behavior.png" alt="A screenshot of a dropdown menu where the button shows an American flag and the language code for English." class="cmp-article__image">
	<figcaption>Do you have to choose a different region to choose languages other than English or Spanish?</figcaption>
</figure>

A lot of elements were flagged for color contrast issues and needing review to confirm that they were visible and focusable. These appear to be elements that are hidden by default, like for dropdown menus or a drawer component that is positioned off screen until the button to reveal it is pressed.

<figure>
	<img src="/images/accessibility-top-100/amazon/hidden-elements.png" alt="A composition of screenshots showing the menus and drawers that become visible when hovered or clicked." class="cmp-article__image">
	<figcaption>Color contrast seems fine, but the mechanism for hiding content gets flagged by tooling.</figcaption>
</figure>

Once visible, I didn’t find any obvious contrast or keyboard access issues for these controls. However, I did find some classic cases of using the wrong tool for the job. For example, here’s the markup for the “button” that reveals the drawer.

```html
<a href="javascript: void(0)"
	 id="nav-hamburger-menu"
	 role="button"
	 aria-label="Open Menu"
	 data-csa-c-type="widget"
	 data-csa-c-slot-id="HamburgerMenuDesktop"
	 data-csa-c-interaction-events="click"
	 data-csa-c-id="tbmmmn-87cdnz-cakots-6nwsb9"
>
	<i class="hm-icon nav-sprite"></i>
	<span class="hm-icon-label">All</span>
</a>
```

There’s no reason this couldn’t be a `<button>` , but since they opted to use an `<a>` tag, they needed to hack it by setting `href="javascript: void(0)"` and `role="button"`, and then they needed to make sure that pressing the space key activated the button. They forgot to do that last part, though, so pressing space does nothing. Oh, and they didn’t do anything about the context menu that shows up when you right click links, so if you right click to open in a new tab, you’re taken to `about:blank#blocked` because the `href` is that JavaScript statement.

<figure>
	<img src="/images/accessibility-top-100/amazon/context-menu-oops.png" alt="A screenshot of a context menu with the option to open a link in the new tab." class="cmp-article__image">
	<figcaption>If you can't open it in a new tab, it really shouldn't be a link.</figcaption>
</figure>

Most of the ARIA misuse stems from setting `aria-label` attributes on elements with the “generic” role, like `<span>` and `<div>` elements, but there are a few links with the `aria-disabled` attribute set, which isn’t valid for the “link” role. Those links are for the “previous” and “next” buttons in the carousel at the top of the page. Note how I called them buttons—that’s because they should be `<button>` elements.

Those carousel buttons also have `tabindex="0"` set on them, and so do over 150 other elements. I’d wager that nearly all of them could remove the `tabindex` attribute entirely and be fine. In general, setting the `tabindex` should be avoided unless it’s an element that shouldn’t receive focus or only needs to programmatically receive focus, like a modal dialog (`tabindex="-1"`), or if it is a non-interactive element that needs to be added to the tab order (`tabindex="0"`). The latter case requires more care. Chances are you’re using the wrong element if you need to add it to the focus order, with [some exceptions](https://adrianroselli.com/2022/06/keyboard-only-scrolling-areas.html). And PSA: don’t set positive `tabindex` values. Just don’t.

#### Mobile

Automated tests flagged fewer issues with the mobile version of the page, and the issues are mostly the same. One new issue that IBM Equal Access called out was the use of `line-height` with `!important` in `style` attributes on a few elements. This prevents users from adjusting spacing on their own. The takeaway is to not mess with typography in inline styles, especially not if you need `!important` to do it.

The site disables zooming/scaling content, so that’s an instant fail.

### Manual testing

#### Desktop

The skip-to-content link does not have an `href`, which causes it to have a role of “none”, causing it to be announced incorrectly by screen readers. Several other links have this same problem and have their default behavior overridden by JavaScript, which causes obvious problems when JS isn’t available for whatever reason.

Perhaps most ironically, the link to `/gp/help/customer/accessibility` remains invisible when focused. This seems intentional, since nearly all other links and controls have good visible focus indicators. My assumption is that someone conflated users with disabilities with people who use screen readers, so good luck finding that help page if you have motor disabilities or low vision or any number of other disabilities that don’t require a screen reader to help access the web.

The search control, similar to Wikipedia’s, does not make any attempt to follow ARIA practices for a combobox, essentially just treating it as an input. I’d like to see some user testing research on this pattern. It might very well be a better experience for screen reader users, but it certainly isn’t equivalent.

<figure>
	<img src="/images/accessibility-top-100/amazon/search-control.png" alt="A screenshot of amazon.com's search control showing a list of suggested search terms." class="cmp-article__image">
	<figcaption>If the experience without the suggested terms is so good, maybe this could just be a basic input for everyone?</figcaption>
</figure>

Keyboard access is mostly good—I didn’t find any focus traps, and while there were a few elements that did not get focus styles, those were the exception, not the rule. There are just so many links, though, so having more skip links would be a nice enhancement, even if they’re not technically required for bypass blocks.

The page does not handle zooming well at all. Even at 200%, there are scrollbars in both horizontal and vertical directions. At 400% it becomes borderline unusable. No content is technically lost, but if you have low vision, it’s going to be incredibly difficult to find your way around. I have to imagine Amazon’s adaptive design is a major factor here. Basic media queries would go a long way toward fixing the zoom issues.

<figure>
	<img src="/images/accessibility-top-100/amazon/home-page-zoom-issues.png" alt="A composition of screenshots showing amazon.com's home page zoomed in to 200% and 400% levels with bad results." class="cmp-article__image">
	<figcaption>Approximately zero care went into making sure things worked well at different zoom levels.</figcaption>
</figure>

#### Mobile

In a nice change of pace from YouTube, the mobile version of the site does have focus styles, although focus gets lost more often than it does on desktop. Nearly everything that was a dropdown on desktop is simplified to just a link on mobile, so there’s less to go wrong. Aside from not being able to zoom, everything is generally passable.

### Page weight and resource breakdown

#### Desktop

The home page initially weighs 8.9 MB, which breaks down as follows for the major resource categories:

- 623 kB HTML
- 590 kB CSS
- 3.4 MB JS
- 220 kB fonts
- 4 MB images

#### Mobile

The home page initially weighs 7.1 MB, which breaks down as follows for the major resource categories:

- 456 kB HTML
- 373 kB CSS
- 3.8 MB JS
- 152 kB fonts
- 2 MB images

## Testing the search results page

### Automated scans

#### Desktop

I want to give a little context before diving into the search results page. On the desktop home page, axe DevTools found 52 issues and IBM Equal Access found 58 violations. On the desktop search results page, axe DevTools found 722 issues and IBM Equal Access found 717 violations. This is part of why I wanted to go beyond just home pages for this series. Home pages tend to be simpler than core features, so if the [WebAIM Million](https://webaim.org/projects/million/) reports that 96% of home pages have detectable errors and that the average is 50 errors, then accessibility issues are likely way more widespread than that.

I’m going to gloss over the details for anything that’s similar to the home page issues. There are way more elements not in landmark regions (there’s not even a “main” landmark), `aria-label` is still misused on elements with generic roles, accessible names still don’t match visible labels, alt text is still repetitive and non-descriptive, and links are still missing `href` attributes.

Most new issues have to do with form controls for all of the filters and such that appear in the sidebar. Checkboxes in particular are a disaster.

```html
<span class="a-list-item">
	<a data-routing="" class="a-link-normal s-navigation-item" tabindex="-1" href="/s?k=querystring">
		<div class="a-checkbox a-checkbox-fancy s-navigation-checkbox aok-float-left">
			<label>
				<input type="checkbox" name="" value="">
				<i class="a-icon a-icon-checkbox"></i>
				<span class="a-label a-checkbox-label"></span>
			</label>
		</div>
		<span class="a-size-base a-color-base">Samsung</span>
	</a>
</span>
```

Where to even begin… Interactive content isn’t allowed within links, there’s no text in the label to give it an accessible name, and the negative `tabindex` removes the link from the focus order, making it so you can only focus on the input, which can’t be announced correctly because it isn’t labeled. Amazon couldn’t decide if they wanted checkboxes that acted like links or vice versa, so they chose the worst of both worlds. For the record, clicking the link reloads the page with different query parameters, so using just a link would be the correct way to go. They could use a `::before` pseudo element to make them look like checkboxes, I don’t care, just not this abomination.

Filtering by star ratings isn’t much better. For some reason, they decided the best way to set the accessible name for the link was to use a `<section>` element with an `aria-label`.

```html
<a data-routing="" class="a-link-normal s-navigation-item" href="/s?k=querystring">
	<section aria-label="4 Stars &amp; Up">
		<i class="a-icon a-icon-star-medium a-star-medium-4">
			<span class="a-icon-alt">4 Stars &amp; Up</span>
		</i>
		<span class="a-size-small a-color-base">&amp; Up</span>
	</section>
</a>
```

Like, why? That’s not what sections are for at all, and they could have easily just set the `aria-label` on the `<a>` tag instead.

Then there are a handful of mundane issues, like poor color contrast and ARIA headings missing `aria-level`, and elements reusing `id` attribute values or landmark region labels. Also, the pagination control stuffs an unordered list with a handful of buttons (marked up as `<span role="button" tabindex="0">`) not contained by `<li>` tags.

#### Mobile

Most of the issues are the same on mobile, but they don’t have the horrendous checkboxes, so that’s an improvement. However, there’s no `h1` heading and zooming/scaling is disabled here as well.

Each product has a thumbnail and a product description, either of which you can click to get to the product details page. However, only one of those links (the one wrapping the image) has an accessible name. The other one is there for the convenience of sighted users so they can just kinda tap wherever and get to the product. In that case, the redundant link should have `aria-hidden="true"` and `tabindex="-1"` because otherwise, users just end up focused on an ambiguous link (that doesn’t have focus styles).

There are also `<div>` elements given the role “img” that wrap actual `<img>` elements and are meant to behave like buttons. They should just be `<button>` elements. I don’t know how many more times I need to say that. It’s pretty simple.

### Manual testing

#### Desktop

Keyboard access is not as good on the search results page as it was on the home page. I noticed more instances where focus would get lost, and I thought that I had missed a link to skip to the filters. I didn’t miss it; it just turns out that it’s placed after all the results on the page. That means to get to the filters, you first have to tab through all the stuff that doesn’t match your criteria because you haven’t filtered anything yet. I kid you not, the last link you tab to before you get to the filters says, “Go back to filtering menu”. The link after that says, “Skip to main search results”. Based on the language of those links, they put the sections in the *wrong order*.

<figure>
	<img src="/images/accessibility-top-100/amazon/links-in-wrong-order.png" alt="A side-by-side visual of two links. The first says go back to filtering menu. The second says skip to main search results." class="cmp-article__image">
	<figcaption>How can you go back if you were never there? Can you skip backwards?</figcaption>
</figure>

There isn’t much else that’s new to report from manual testing. Zooming in is still awful and they could use more bypass links, same as the home page.

#### Mobile

Remember those images I mentioned earlier that should have been buttons? Those aren’t focusable at all, so that functionality just isn’t available if you’re using keyboard-like tools. Otherwise, it’s all the same issues as the home page, but with more instances where focus disappears.

### Page weight and resource breakdown

#### Desktop

The search results page initially weighs 8.8 MB, which breaks down as follows for the major resource categories:

- 1 MB HTML
- 1.2 MB CSS
- 2.7 MB JS
- 50.4 kB fonts
- 830 kB images
- 2.9 MB media

### Page weight and resource breakdown

#### Mobile

The search results page initially weighs 6.3 MB, which breaks down as follows for the major resource categories:

- 1.5 MB HTML
- 640 kB CSS
- 2.5 MB JS
- 99.8 kB fonts
- 1.1 MB images
- 459 kB media

## Testing the product page

### Automated scans

#### Desktop

Skipping all the repeated issues, here are the new ones:

- `aria-expanded` is misused all over the place
- `aria-hidden` elements contain focusable elements (this is the main product image section, so really not ideal)
- Someone got confused and thought `role="textbox"` was useful for indicating video durations and titles in thumbnails
- They use `role="progressbar"` for the percentage of reviews for each star level (debatable whether that makes sense) but didn’t give them accessible names
- There are links that aren’t visually distinct from plain text
- Heading levels are skipped
- ARIA is misused in various minor ways

I’m not going to dig into all of those, just know that these are new errors on top of the existing errors that the previous pages have, so in reality there’s even more going on here. I do want to highlight one example, though. This is the code used to mark up one of the image preview buttons that switches the main image so you can get a closer look.

```html
<span class="a-list-item">
	<span class="a-button a-button-thumbnail a-button-toggle" id="a-autoid-10">
		<span class="a-button-inner">
			<input class="a-button-input" type="submit" aria-labelledby="a-autoid-10-announce">
			<span class="a-button-text" aria-hidden="true" id="a-autoid-10-announce">
				<img src="https://m.media-amazon.com/images/I/51jKXi9a3QL._AC_US40_.jpg">
			</span>
		</span>
	</span>
</span>
```

Why use `input[type="submit"]` instead of a `<button>`? Why does the image not have alt text? Why is the image that doesn’t have alt text being used as the accessible name for the input that should be a `<button>`? By the way, this whole thing is inside the aforementioned element that is `aria-hidden`.

#### Mobile

There are fewer issues identified on mobile, likely because some of the more problematic elements are simplified for the mobile version, but the same basic categories of issues are there. In a way, it’s cohesive—you can tell that it’s probably the same people working on desktop/mobile features. If only there were more accessibility experts on those teams.

### Manual testing

#### Desktop

The tab order is a bit annoying and unpredictable on the product details page. When you skip to the main content, you end up in a secondary navigation menu that you can’t skip past, and then you end up on the “Add to Cart” section, which I’m fine with. Let people get to the important thing faster. After that, focus disappears briefly before moving to the image preview buttons that aren’t buttons. The focus styles on these are totally insufficient. They’re very light and subtle, so I missed them entirely at first, thinking focus was just gone.

<figure>
	<img src="/images/accessibility-top-100/amazon/wheres-the-focus.png" alt="A screenshot of the main product image with one of the thumbnail images focused with a nearly imperceptible outline." class="cmp-article__image">
	<figcaption>Give me thick, chunky outlines over subtle gradients any day.</figcaption>
</figure>

There’s also no way to zoom in on the image with just a keyboard—that’s a hover-only interaction, and the “Click image to open expanded view” text doesn’t apply to keyboard users since there’s no way to click the image without a mouse/touch pointer.

Again, more links to skip sections would be nice, especially past the product details, where there’s a bunch of stuff that just gets in the way if you’re trying to find reviews, for example.

Zooming is as busted here as it is on the other pages.

#### Mobile

A not-insignificant number of links and controls are completely missing from the focus order. The most concerning example is the “Report” links in the product reviews, which seems like something that would be bad to not be able to do.

Again, zooming doesn’t work, and focus seems to get lost more often on the mobile version of the page.

### Page weight and resource breakdown

#### Desktop

The product page initially weighs 31.3 MB 🤯, which breaks down as follows for the major resource categories:

- 1.7 MB HTML
- 1.3 MB CSS
- 5.9 MB JS
- 151 kB fonts
- 1.5 MB images
- 8.5 MB media

#### Mobile

The product page initially weighs 19.3 MB, which breaks down as follows for the major resource categories:

- 1.3 MB HTML
- 1.3 MB CSS
- 8.3 MB JS
- 221 kB fonts
- 1.2 MB images
- 188 kB media

## Results

Amazon’s accessibility is pretty bad on these pages, but a lot of the issues here stem from not using semantic elements correctly. I feel like if they figured out when to use buttons vs. links vs. checkboxes, they’d fix like half of these issues right away. A good lesson on ARIA wouldn’t hurt either.

As with YouTube, there’s just no excuse to be this bad when your company’s worth over a trillion dollars. Amazon could easily afford more accessibility experts and prioritize the front-end, but they don’t because they don’t have to in order to remain competitive. Must be nice having a captive market.

For some reason, I’m less bothered by the poor craftsmanship here than I was for YouTube. I can just tell from the `<div>` soup that they threw a bunch of “full stack” developers at it, so what else would you expect. Amazon gets an F.

{% include 'partials/article-pagination.njk' %}
