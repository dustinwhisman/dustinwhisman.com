---
title: "How to avoid accessibility issues with interactive elements - Accessibility how-tos - Writing - Dustin Whisman"
description: "If there are semantic elements that provide the interactivity you need, use those. If the interactivity isn't essential, see if there's a simpler way to accomplish the same goal. Otherwise, proceed with caution with an ARIA approach."
articleTitle: "How to avoid accessibility issues with interactive elements"
layout: default
date: 2024-05-17T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues with interactive elements

{% include 'partials/published-date.njk' %}

“Interactive elements” is a broad term, but it mostly describes what you might call widgets, such as menus, tabs, dialogs, etc. If the controls don’t communicate [name, role, and value](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2#name-role-value) properly, it becomes hard to understand what they’re supposed to be or what they’re supposed to do. They may also be implemented in ways that don’t align with user expectations, like being able to cycle through options with arrow keys.

For example, for a button that shows or hides content, such as a dropdown menu or a hamburger menu, the button needs to communicate that that’s what it’s for by using [`aria-expanded`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded). It also needs to be a `button`, but that should be a given.

```html
<button aria-expanded="false">Menu</button>
<div>
	<!-- content meant to be shown or hidden -->
</div>
```

Note that `aria-expanded` belongs on the `button` element, not the content that is being shown or hidden—a lot of developers make that mistake. It’s also not necessary to change the text of the button when it is opened or closed, since `aria-expanded` will communicate that state to screen reader users. If you have an icon that changes when opened or closed, that’s fine, but it should be hidden from screen reader users with [`aria-hidden`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden) or if it’s an `img` element, `alt=""`.

Optionally, you can use [`aria-controls`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls) to associate the button with the content it shows or hides by setting the value to equal the ID of content’s element.

```html
<button aria-expanded="false" aria-controls="content">Menu</button>
<div id="content">
	<!-- content meant to be shown or hidden -->
</div>
```

However, only JAWS supports `aria-controls`, and [it doesn’t help much](https://heydonworks.com/article/aria-controls-is-poop/) when it is supported, so you may not want to include it all.

You may have noticed a lot of nuance for a pretty simple control. ARIA is hard! Which is why it’s so important that when it’s required, it’s used correctly—otherwise it will do more harm than good. Remember these axioms:

1. Never use ARIA when you don’t need to
2. Always use ARIA when you need to
3. You’re doing it wrong (probably)

To make life easier, it’s best to stay in the first zone, where you don’t need to use ARIA at all. For example, consider the tab widget. If you read the ARIA Authoring Practices Guide’s [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) documentation, you’ll find a long list of required attributes and keyboard behaviors to correctly wire up a tabs widget. There are plenty of things to get wrong, and even if you get everything right, users may still have a hard time using it because tabs are inherently complicated and users rarely encounter "correctly implemented" tabs.

What would be better? Doing much much less. Are tabs the best tool for the job? Probably not. If they reveal huge sections of content, those could probably be broken out into individual pages, letting you replace the tabs with much simpler navigation. If the content isn’t as substantial, you could refactor the tabs into basic headings and content.

```html
<!-- using pages with navigation -->
<nav aria-label="Secondary navigation">
	<a href="/page-1">Page One</a>
	<a href="/page-2">Page Two</a>
	<a href="/page-3">Page Three</a>
</nav>

<!-- using headings -->
<h2>Thing One</h2>
<!-- Thing One content -->

<h2>Thing Two</h2>
<!-- Thing Two content -->

<h2>Thing Three</h2>
<!-- Thing Three content -->
```

This is far easier to navigate for screen reader users (and everyone else), and it’s a thousand times easier to implement for developers.

Lately, HTML has introduced new elements to make it easier to develop these types of interactive elements, such as [`details`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) for show/hide functionality and [`dialog`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) for modal dialogs. Hopefully that trend continues, but for anything that isn’t supported by simple elements like these, make sure you do your homework and research all the ARIA roles and attributes and expected keyboard behavior when building interactive elements.

{% include 'partials/article-pagination.njk' %}
