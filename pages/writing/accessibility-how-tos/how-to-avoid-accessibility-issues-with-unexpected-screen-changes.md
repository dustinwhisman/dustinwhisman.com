---
title: "How to avoid accessibility issues with unexpected screen changes - Accessibility how-tos - Writing - Dustin Whisman"
description: "Maybe don't use SPA architecture, or failing that, make sure you move focus when content changes or use ARIA live regions to announce those changes."
articleTitle: "How to avoid accessibility issues with unexpected screen changes"
layout: default
date: 2024-05-19T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues with unexpected screen changes

{% include 'partials/published-date.njk' %}

When navigating to a new page on a traditional website, or what you might call a Multi-page App (MPA) these days, the new page loads, and focus moves to the start of the page. Screen readers announce the page’s title, and then users can navigate or read from there. With client-side routing, all of that goes out the window unless developers manage navigation very carefully.

With a Single-page App (SPA), it’s very likely that a screen reader user will activate a link and then… nothing will happen. Silence. That’s usually because the new content is loaded and replaces the old content without notifying the user. Focus remains on the link that the user just activated and there’s no indication that the page has changed.

The best way to avoid this would be to work with the grain of the web and use MPA architecture. If you’re stuck with SPA architecture, though, you can make sure that on navigation, you move focus to a relevant area. That could be the top of the page or the beginning of the new page’s content.

For cases where only part of the page is updated, the best way to announce the new content depends on the situation. For something like search results, where content is loaded when the user submits a search form, it may be best to move focus to the search results or the first result in the list.

When moving focus to a non-interactive element, it’s important to make it clear what’s going on, both to keyboard-only users and screen reader users. Set `tabindex="-1"` on the element so that focus styles will be shown when the element receives focus. If you’re moving focus to a [`section`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) element, make sure it has a label, either from [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) or [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby).

```html
<!-- without an accessible name, this might as well be a div -->
<section tabindex="-1">
	<h2>Search Results</h2>
	<!-- search results -->
</section>

<!-- now this will be announced as a region with the name "Search Results" -->
<section tabindex="-1" aria-labelledby="search-results-heading">
	<h2 id="search-results-heading">Search Results</h2>
	<!-- search results -->
</section>
```

If the element is more generic, like a `div` element, set [`role="region"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role) and `aria-label` so that screen reader users will hear the name of the region announced when the element receives focus. If the element you’re moving focus to is already interactive, like a link or a button, you don’t need to do all this extra stuff.

In other cases, [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) may be the way to go, although it’s worth being aware of [things that can cause live regions to not work](https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/). Live regions need to exist on the page before content is updated, and their updates may be skipped depending on user actions and the politeness setting of the alerts.

```html
<!-- live region before content changes -->
<div role="log" aria-live="polite"></div>

<!-- live region after a change happens that needs to be announced -->
<div role="log" aria-live="polite">
	<p>
		You have 3 new messages.
	</p>
</div>
```

Given the flakiness of live regions and the fact that they can be skipped by users, only reach for them as a tool of last resort or if their messages are unimportant enough that missing them doesn't matter. Automated tests won't be able to catch these types of issues, so be sure to manually test your navigation and in-page content updates.

{% include 'partials/article-pagination.njk' %}
