---
title: "Wikipedia | Accessibility of the Top 100 Sites | Writing | Dustin Whisman"
description: "How accessible is Wikipedia? This is part 1 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "Accessibility of the Top 100: Wikipedia"
layout: default
date: 2024-01-15T00:00:00.001Z
tags:
  - writing
  - accessibility top 100
---

# Part 1: Wikipedia

_I'm evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at Wikipedia. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

Wikipedia sort of has two home pages: [wikipedia.org](http://wikipedia.org) and language-specific home pages after you’ve chosen a language, like [en.wikipedia.org](http://en.wikipedia.org). I evaluated both, since they’re both likely entry points for people visiting the site and they’re notably different from each other.

I also evaluated the page for [computer accessibility](https://en.wikipedia.org/wiki/Computer_accessibility) because why not? The only other notable feature I tested was the search form, since that’s more or less global and essential to how people use the site.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/desktop.png" alt="A composition of screenshots for three Wikipedia pages." class="cmp-article__image">
  <figcaption>These are the pages that were tested.</figcaption>
</figure>

I evaluated Wikipedia on January 14th and 15th, 2024.

## Testing wikipedia.org

### Automated scans

The only automatically detected issues on [wikipedia.org](http://wikipedia.org) at desktop sizes were related to the lack of a `<main>` element. The first issue is that there should be a main landmark, and the other issues are that all content should be contained by landmarks. The impact of this is fairly low, at least for this page. Landmarks are mostly useful for screen reader navigation, and there’s not so much content on this page that a user would need to rely on that navigation to get around quickly.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/no_landmarks.png" alt="" class="cmp-article__image">
  <figcaption>The markup for the home page does not include any landmark elements.</figcaption>
</figure>

On mobile, there’s another issue detected where the search input does not have a label. This is because the `<label>`, which is explicitly associated with the `<input>` by `for`/`id` attributes, is set to `display: none` rather than visually hidden in the same way as it is at larger screen sizes. This affects the accessible name of the search input, preventing screen readers from announcing it correctly.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/hidden_label.png" alt="A screenshot showing the search control without a label along with the CSS code that causes the issue." class="cmp-article__image">
  <figcaption>Note how <code>.screen-reader-text</code> is already visually hiding the label.</figcaption>
</figure>

The search form includes the search input and a `<select>` control which are grouped by a `<fieldset>` that does not have a `<legend>` or any other mechanism for setting its accessible name. This makes the grouping more or less useless.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/fieldset_no_legend.png" alt="A screenshot showing the markup for the fieldset." class="cmp-article__image">
  <figcaption>Without a <code>&lt;legend&gt;</code>, this might as well be a <code>&lt;div&gt;</code>.</figcaption>
</figure>

### Manual testing

The first thing I noticed for keyboard accessibility is that focus starts on the search input when you load the page because of the `autofocus` attribute. In general, I would not recommend this because this can negatively impact screen reader users, who will not hear anything about the page before being taken straight to the search input. This makes it highly likely that they won’t navigate backwards to access previous parts of the page.

Wikipedia’s decision to use `autofocus` does make some sense, though. Search is likely to be the thing that the vast majority of users do on this page, and the next element in the focus order is a `<select>` control with the list of languages, which more or less accomplishes the same goal as the preceding links that would be skipped.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/focus_mid_page.png" alt="A screenshot showing the focused search input, which appears after ten different language links." class="cmp-article__image">
  <figcaption>The language links may never be announced, but the language dropdown allows users to change languages if they need to.</figcaption>
</figure>

Aside from that, the focus order makes sense and there aren’t any controls that can’t be operated with a keyboard. Focus indicators are visible and meet the requirements in the new WCAG 2.2 success criteria, namely 2.4.13 Focus Appearance.

The search control behaves like a combobox (a text input with suggestions that appear as you type), and the `Esc`, `Enter`, `Down Arrow`, and `Up Arrow` keys all behave as expected, but there are no ARIA attributes to communicate the control’s behavior to screen reader users. Since this is a case where there’s no attempt to create an ARIA combobox, I have to assume that Wikipedia is expecting screen reader users to simply type their search term and submit the form without interacting with the autocomplete suggestions.

This may honestly be preferable to using incorrect ARIA, since the suggestions don’t appear in the tab order and would not be announced–effectively the equivalent of just using a text input. It’s arguable that this *could* make searching harder, but this behavior doesn’t seem likely to block users from finding what they’re searching for. In this case, I would let user testing determine what the best approach here is rather than assume that an ARIA combobox would be better.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/combobox-ish.png" alt="A screenshot showing the search suggestion list and the markup that does not include ARIA roles or attributes to announce the combobox elements or behavior." class="cmp-article__image">
  <figcaption>It looks like a combobox but is not announced like a combobox.</figcaption>
</figure>

At zoom levels 200% and 400%, everything was still accessible and no content overflowed or got lost.

## Testing en.wikipedia.org

### Automated scans

There’s a fair amount of ARIA misuse on [en.wikipedia.org](http://en.wikipedia.org). The worst offender is setting `role="button"` on checkbox inputs, which is not valid. It looks like Wikipedia is using the [checkbox hack](https://css-tricks.com/the-checkbox-hack/) to support show/hide functionality in case JavaScript isn’t loaded, then progressively  enhancing them, although it seems like the only change when JavaScript is loaded is toggling `aria-expanded="true"` on the checkbox when it is clicked. Interestingly, the button role breaks the explicit labeling by `for`/`id` attributes, meaning that if there wasn’t an `aria-labelledby` attribute, the control would not have an accessible name.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/checkbox_hack.png" alt="A screenshot showing the checkbox hack HTML and CSS code used for the show/hide functionality." class="cmp-article__image">
  <figcaption>The checkbox hack in action.</figcaption>
</figure>

I can understand using this technique, since Wikipedia needs to support older browsers that don’t support the `<details>`/`<summary>` elements, and the decision to leave them as inputs instead of buttons may be based on the reality of what screen readers announce rather than theoretical purity. As long as screen reader users can perceive them as menu buttons, the impact is low for this issue, but it would be more correct to use buttons.

Another ARIA issue is using `aria-labelledby` on a generic `<div>` element. If that was changed to be a `<section>`, it would be treated as a landmark region that would be useful for screen reader users. There are also a handful of redundant roles set on landmark elements, such as `<nav role="navigation">` that could be removed, but there’s no harm in keeping them.

IBM’s accessibility checker flagged the search input as using only the placeholder as the visible label, but since the input has an `aria-label`, and there’s a search icon and a button that says "search" in close proximity to the input, I think it’s clear enough that this is a search input without including a visual label.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/search_context.png" alt="A screenshot showing the search input without a label but surrounded by indications that it is a search input." class="cmp-article__image">
  <figcaption>Mister Police, I gave you all the clues.</figcaption>
</figure>

### Manual testing

Again, the tab order and focus indicators are good, and there isn’t anything that’s mouse or touch-oriented. This time, focus starts at the beginning of the page, and we have a “jump to content” link to bypass the header. This page would benefit from a table of contents, since it is organized into sections and each of them contains many links. For example, I had to tab about 70 times to get to the first link in the “On this day” section.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/so_many_links.png" alt="A visualization of the tab order, with a total of 276 focusable elements detected." class="cmp-article__image">
  <figcaption>So many links to tab through.</figcaption>
</figure>

Small previews of pages would appear whenever I focused on a link, too, which could get annoying for a user who just trying to navigate to the link they want. These popup previews are also not dismissible without moving keyboard focus or pointer hover, which violates WCAG 2.2 success criterion 1.4.13 Content on Hover or Focus. I also do not see anything in the markup that would cause the popups to be announced by screen readers. Again, this may be an intentional move to avoid annoying screen reader users with unnecessary information, but then maybe it shouldn’t be there to annoy sighted users either. 🤷

<figure>
  <img src="/images/accessibility-top-100/wikipedia/link_preview.png" alt="A screenshot of the link preview that appears on focus or hover." class="cmp-article__image">
  <figcaption>Without a way to access its content or dismiss the preview without moving focus, this is a problem.</figcaption>
</figure>

Interestingly, the search control on this page _does_ implement an ARIA combobox, and at a glance, all the roles and properties are set up correctly. I’m curious why this differs from the other home page, though, since presumably the same pros and cons would apply. It could be that Wikipedia eventually wants them to match, one way or another, but there may be other priorities or technical challenges to explain the mismatch.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/combobox.png" alt="A screenshot of the search control along with the markup that will cause the combobox behavior to be announced by screen readers." class="cmp-article__image">
  <figcaption>Note how this combobox includes ARIA roles and attributes to make the suggestions accessible to screen reader users.</figcaption>
</figure>

Zooming to 200% presented no issues, but horizontal scrolling became necessary at 400%. This doesn’t violate any A or AA WCAG 2.2 success criteria, but it could impact low vision users.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/overflow_400.png" alt="A screenshot of the Wikipedia page zoomed in at 400% with content overflowing, causing scrolling in both vertical and horizontal directions." class="cmp-article__image">
  <figcaption>This only becomes a problem at 400% on a relatively large screen.</figcaption>
</figure>

## Testing an article

### Automated scans

The [article page for computer accessibility](https://en.wikipedia.org/wiki/Computer_accessibility) has more issues than either home page did. Here are the biggies:

- A few links with insufficient color contrast
- Images without alt text, which causes the links that contain them to not have accessible names
- More checkbox hack show/hide controls
- On mobile, there are multiple `<nav>` elements without unique accessible names
- On mobile, the hamburger menu includes a `<label>` with `role="button"`, which is not valid

The color contrast issues are likely widespread, since they occur in an accordion-style control at the bottom of the page with related topics. There’s a light blue background that doesn’t have enough contrast with the blue links, so either lightening the background or darkening the links would solve this problem.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/color_contrast.png" alt="A screenshot of a section where a light blue background causes color contrast issues with the darker blue links." class="cmp-article__image">
  <figcaption>The contrast ratio would be sufficient for large text, but this is not large text.</figcaption>
</figure>

The images that are missing alt text are all wrapped by `<figure>` elements, which all have `<figcaption>` elements, so at first glance, it seems like it would make sense to set `alt=""` on them to mark them as decorative. However, they’re wrapped by links, so this would mean that the links don’t have accessible names. On further inspection, the links point to the file paths of the images themselves, so you can see the image at full size or download it. This may be a rare case where the file name may actually be the most useful alternative text, but it would be better to set that explicitly using an `alt` attribute than to fall back on the default behavior when alt text is missing.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/image_missing_alt.png" alt="A screenshot of an image and its markup that does not include alt text." class="cmp-article__image">
  <figcaption>You gotta put an <code>alt</code> attribute on your <code>&lt;img&gt;</code> tags. It's really not optional.</figcaption>
</figure>

It’s useful to set an `aria-label` on each `<nav>` element to make it easier for screen reader users to distinguish between different navigation menus. Not doing that won't block users from doing what they need to do, but it’s a fairly trivial thing to implement.

Again, the checkbox hack controls could use some improvement. I’m not sure why they set `role="button"` on a `<label>` when they already did so (incorrectly) on the `<input>`, or why it only applies in the mobile version of the page. It’s worth noting that Wikipedia uses adaptive design rather than responsive design, meaning they serve up completely different markup on [en.m.wikipedia.org](http://en.m.wikipedia.org) than [en.wikipedia.org](http://en.wikipedia.org). It’s an old-school choice, and one that introduces a fair amount of maintenance problems. Given Wikipedia’s age and size, changing that approach would likely be a *massive* undertaking–it would be far easier to fix the bug.

### Manual testing

Keyboard accessibility largely matches the localized home page. There are still the annoying popup previews, but article pages do have tables of contents. However, if you select a link from the table of contents, there’s not an easy way to get back to the table of contents. I’d recommend adding a link back to the table of contents at the end of each section and maybe even add a “skip to next section” link at the start of each one as well. This wouldn’t be strictly necessary, but making it easier to get around would be helpful for keyboard-only users who need to exert a lot of energy just to tab through links.

On mobile, I noticed that focus indicators weren’t shown for links. Granted, I’m emulating mobile on a desktop, but `outline: 0` should generally be avoided. The selector `.touch-events` gets set on the `<body>` element, and `.touch-events :focus` is used to completely wipe out default focus styles. It would be better to use a selector like `:focus:not(:focus-visible)` and let browser heuristics determine whether focus indicators need to be shown. `outline-color: transparent` would also be better than `outline: 0`, since the former would show outlines with Windows High Contrast Mode where users are more likely to rely on those indicators.

<figure>
  <img src="/images/accessibility-top-100/wikipedia/removing_focus.png" alt="A screenshot of the CSS used to remove focus indicators." class="cmp-article__image">
  <figcaption>Don't do this!</figcaption>
</figure>

Zoom levels behaved the same as the localized home page. Since the size was about the same, I suspect there’s a global element in the header or footer overflowing and causing the horizontal scrolling. Again, not an essential fix, but one that would benefit low vision users.

## Results

Overall, the pages that I checked for Wikipedia are pretty solid in terms of accessibility, which isn’t super surprising to me. Wikipedia’s whole deal is providing free access to information to as many people as possible, so it seems natural that they would prioritize accessibility. There’s some room for improvement, but the foundation is really strong, and the changes I identified are relatively low impact.

A lot of the success here stems from Wikipedia’s super simple design. It’s mostly text with links and some images thrown in, which makes it quite a bit easier to not get things wrong. The most complex controls are the show/hide “buttons” and the autocomplete search control. Those are tricky to get right, and while I don’t think they nailed it, it’s very possible that user testing would justify the implementations that they have.

This is a good start as far as the top 100 websites in the US goes. I’m expecting it to get much worse from here.
