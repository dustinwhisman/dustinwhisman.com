---
title: "How to avoid common keyboard accessibility issues - Accessibility how-tos - Writing - Dustin Whisman"
description: "Use semantic elements when applicable, since they handle keyboard interactions by default. Use only your keyboard while testing your interface to make sure everything functions."
articleTitle: "How to avoid common keyboard accessibility issues"
layout: default
date: 2024-05-20T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid common keyboard accessibility issues

{% include 'partials/published-date.njk' %}

Broken keyboard accessibility may tie into the issues mentioned with interactive elements, but it could also refer to basic things like links, buttons, or forms being broken. Using the wrong element is the most likely cause for keyboard access being broken.

For example, any of the following will trigger a `button` element’s `click` event, which can be listened for in JavaScript:

- clicking the button with a mouse or tapping on it on a touch screen
- pressing “Space” while focused on the button
- pressing “Enter” while focused on the button

However, if you code the button as a `div` or a `span`, the keyboard behavior needs to be re-implemented.

```html
<div role="button" tabindex="0">Click me!</div>
```

Setting [`role="button"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role) does not turn an element into a button. It just makes the element tells users that it is a button. It is making a promise that it can’t keep without a hefty amount of JavaScript—only the mouse click or touch screen tap will work on this `div` unless you set up event listeners for the “Space” and “Enter” keys.

I'll also note that without the `tabindex="0"`, this would not be keyboard-focusable, meaning that screen reader users and keyboard-only users would have no way to interact with it at all. In general, if you find yourself needing to add `tabindex` to generic elements to make them focusable, you should double check that there's not a better way to accomplish your goal.

Using a broken button like this in a form will further break keyboard accessibility, since the form can’t be submitted without clicking on the button. Even using a `button` with `type="button"` instead of `type="submit"` will cause issues, since the form can’t be submitted without clicking the button. Needless to say, the same form submission behavior also won't work if you don't have a `form` element.

The best way to avoid these issues is to get familiar with [semantic HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) and learn when to use them. It’s extremely rare that setting a [widget role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#2._widget_roles) on a `div` or `span` element will _improve_ accessibility.

Automated testing _may_ flag bad practices, but it won't be able to catch everything. It should be pretty easy to manually test for these issues, though. Put your mouse aside and use only the keyboard to check that everything interactive still works.

{% include 'partials/article-pagination.njk' %}
