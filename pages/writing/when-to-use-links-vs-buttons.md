---
title: "When to use links vs. buttons - Writing - Dustin Whisman"
description: "A lot of websites get this seemingly simple question wrong, so let's see if we can establish some rules for when to use links vs. buttons."
articleTitle: "When to use links vs. buttons"
layout: default
date: 2024-05-03T00:00:00.000Z
tags:
  - writing
  - uncategorized
---

# When to use links vs. buttons

{% include 'partials/published-date.njk' %}

One thing that’s stood out to me over my past few evaluations of popular websites and their (many) accessibility issues is that it’s surprisingly common to see buttons and links used interchangeably and often incorrectly. So how can we succeed where trillion dollar companies fail? How can we decide whether an element should be a link or a button?

## When links are best

If you answer yes to any of these questions, you should probably use a link.

### Can you open it in a new tab?

Links, otherwise known as [anchor tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a), have the default behavior of opening a context menu if you right click them with a mouse or long press on a touch screen. One of the options in that menu is to open the link in a new tab.

If a user were to choose that option, would it make sense for a new tab to open, and would that new tab navigate to the correct page or have the correct behavior? If so, use a link.

### Does navigation happen when you click it?

By navigation, I mean moving to a new page or moving to a section of the current page. The URL should be different after you click it, either by having a completely different path if it’s a new page or by having a fragment that matches an element’s ID on the page, like `#main`. The latter is mostly used for skip links or table of contents links. Note how I keep saying “links”. That’s because these should be links, not buttons.

You could use buttons to navigate to new pages by wiring up event listeners to do something like `window.href = newURL`, but then you’d need JavaScript to be enabled, loaded, parsed, and ready before the user clicked the button. Why do that when links work with only HTML? Likewise, you could use buttons for skipping to sections, but again you’d need JavaScript to:

- Listen for the `click` event
- Find the element that the button is targeting
- Scroll the element into view
- Update the URL to append the `#<element-id>` so that the back/forward/reload behavior works as expected (assuming you remember to do this)

Again, links do all this for free with only HTML. If you want to get fancy, you can add some smooth scrolling with CSS, but maybe only if the user doesn’t prefer reduced motion.

## When buttons are best

If you answer yes to any of these questions, you should probably use a button.

### Are you submitting a form?

Most buttons either submit a form or perform an action. Submit buttons, using `type="submit"` or by omitting the `type` attribute if in a `form`, are used for, you guessed it, submitting forms. By having a submit button in a form, users can hit “enter” to submit the form without needing to click the button or tab to it from the last input.

I can’t say that I’ve seen links misused to submit forms, so I’ll warn against using the wrong types of buttons instead. Don’t use `type="button"` on a submit button—that’ll just make it so you have to recreate the automatic submit behavior with JavaScript, and nobody wants that. There’s also `type="reset"`, which should only be used if you want to actively antagonize your users.

If your submit button is enclosed by a `form` tag, but you want to handle the submission asynchronously with JavaScript instead of the default behavior that causes a full page load, you should listen to the form’s `submit` event, rather than the button’s `click` event.

### Are you showing or hiding content?

There are many ways to show or hide content, including hamburger menus, drawers, accordions, tabs, dialogs, tooltips, etc. Most of these should be triggered by buttons, with some exceptions if you’re using something like the `details` and `summary` elements. None of them should be triggered by links.

### Are you performing an in-page action?

This is super broad, but in-page actions could mean anything like showing the next slide in a carousel, playing or pausing a video, loading more content in an infinite scroll scenario, etc. If you click it and it does *something* in the page that isn’t covered by anything above, then it should probably be a button instead of a link. Sometimes it should be a form control, but that’s a topic for another day.

## But what about styling?

It doesn’t matter. Like, at all. You can make a link look like anything with CSS, and you can do the same to buttons. Whether links should look like buttons or vice versa is a user experience or usability question more so than an accessibility or semantics question. If you want an `as-button` CSS class to add to links and an `as-link` class for buttons, you can—just make sure the element itself is the right one for the job.

## Signs that something has gone wrong

If you have written or discover any code like the following, there has been a mistake.

```html
<div role="button" onClick="doSomething()">Do something</div>

<span role="button" tabindex="0">Do something</span>

<a href="#">Do something</a>

<a href="javascript:void()">Do something</a>

<a onClick="doSomething()">Do something</a>

<a href="" disabled>
	<button>Do something</button>
</a>

<label>
	<input type="checkbox" role="button">
	Do something
</label>

<a href="javascript:void()" onClick='window.location="/"'>Home</a>
```

## Links go places, buttons do things

If you want a quick rule of thumb, remember that links go places and buttons do things. And please don’t ever write anything like whatever this is:

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

It haunts my dreams.

{% include 'partials/article-pagination.njk' %}
