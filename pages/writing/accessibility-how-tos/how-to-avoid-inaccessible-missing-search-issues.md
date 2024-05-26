---
title: "How to avoid inaccessible/missing search issues - Accessibility how-tos - Writing - Dustin Whisman"
description: "Provide search so it's easier for user to find things, and make sure it works without autocomplete. Be careful when implementing autocomplete/autosuggest functionality (it's complicated). If you're not building from scratch, make sure your library is accessible."
articleTitle: "How to avoid inaccessible/missing search issues"
layout: default
date: 2024-05-26T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid inaccessible/missing search issues

{% include 'partials/published-date.njk' %}

If a site does not provide a search mechanism, then the only way to find content is to navigate via links. Depending on the size of the site, that may or may not be workable, but there need to be [multiple ways](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&currentsidebar=%23col_overview#multiple-ways) to find content. A sitemap might meet this need, but search is often a more usable option.

Many search inputs are autocomplete controls that present options that can be selected via mouse or keyboard to theoretically make searching easier. As with other interactive elements, there are a _lot_ of ARIA roles and attributes that are required to wire one of these controls up correctly. I’ve seen implementations that try and fail to get those attributes right, others that are built completely wrong from the ground up, and others that don’t even bother trying to make the options accessible. The latter ironically end up being the most usable, since they end up behaving like a basic text input.

The easiest option for search is to keep it basic with no autocomplete behavior at all (screen reader or not).

```html
<form role="search" action="/search" method="GET">
	<label>
		Search
		<input type="search" name="q">
	</label>
	<button type="submit">Search</button>
</form>
```

This will work equally well for everyone, and it takes very little work to implement, since you don’t need to deal with all the ARIA roles/attributes or generating the list of suggested search terms or results.

A slightly higher effort version would use [`datalist`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) for the suggested search terms, but there are issues with the options not being styleable, and their text doesn’t scale up when zooming in. `datalist` also has somewhat inconsistent browser support and behavior. For example, at time of writing, the options just don’t appear at all on Firefox for Android. Hopefully browsers will improve support so this approach becomes more viable, but I wouldn’t hold my breath.

```html
<form role="search" action="/search" method="GET">
	<label>
		Search
		<input type="search" name="q" list="search-terms">
	</label>
	<datalist id="search-terms">
		<option value="thing one"></option>
		<option value="thing two"></option>
		<option value="thing three"></option>
	</datalist>
	<button type="submit">Search</button>
</form>
```

If you do need full autocomplete behavior that you can style and ensure works cross-browser and zoomed in, it gets substantially more complex. Here’s what a snapshot of the necessary HTML might look like when the list of suggestions is shown with the first item selected.

```html
<form role="search" action="/search" method="GET">
	<label>
		Search
		<input
			type="search"
			name="q"
			role="combobox"
			aria-expanded="true"
			aria-controls="search-terms"
			aria-autocomplete="list"
			aria-activedescendant="thing-one"
		>
	</label>
	<ul id="search-terms" role="listbox" aria-label="Search terms">
		<li id="thing-one" role="option" aria-selected="true">Thing one</li>
		<li id="thing-two" role="option" aria-selected="false">Thing two</li>
		<li id="thing-three" role="option" aria-selected="false">Thing three</li>
	</ul>
	<button type="submit">Search</button>
</form>
```

There’s a lot going on here, and I haven’t even covered how you would need to listen for keyboard events for arrow keys, “Enter”, and “Esc”. If you’re going down this road, you should read up on every role and attribute that relates to the [`combobox` role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Combobox_Role) _and_ test with real users to make sure everything is working how it is supposed to. There’s so much that can go wrong here, so it’s worth being diligent and careful. Automated tools aren't good at finding issues with these types of interactive elements, so you'll need to manually test and inspect attributes to make sure everything is wired up as it should be.

Since this pattern is so complicated, there’s a good chance that you’re using a library or some third-party component to handle it. If that’s the case, be sure to inspect whether they’ve implemented it correctly and file bug reports/issues if not, or you can try switching to another library that handles it better.

{% include 'partials/article-pagination.njk' %}
