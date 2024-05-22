---
title: "How to avoid accessibility issues from complex/difficult forms - Accessibility how-tos - Writing - Dustin Whisman"
description: "Only ask for the information you need, break long forms into smaller parts to avoid overwhelming users, make sure all inputs are labeled and are the right type, and make sure your validation is more helpful than harmful."
articleTitle: "How to avoid accessibility issues from complex/difficult forms"
layout: default
date: 2024-05-22T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues from complex/difficult forms

{% include 'partials/published-date.njk' %}

There are a lot of factors that can make forms difficult to use, but the main ones to look out for are the length of the form, validation/input constraints, and error messages (or lack thereof). Keeping forms short by only asking for the information you need is a good start. If the necessary information requires a lot of form fields, you can try to break it up into multiple steps so that it doesn’t all need to be filled in correctly at once. For example, the checkout flow for an e-commerce site may be broken into steps like the following:

1. Contact info (email and/or phone number)
2. Shipping address
3. Billing address (if different from shipping address)
4. Payment info

Rather than needing to fill in 20 fields at once, breaking it up limits each form to a more reasonable 2-6 fields, and it lets users pause and continue later without losing progress.

Inline validation can be tricky for screen reader users, who often tab through all the inputs in a form to figure out how long it is and what information they need. It can be really distracting to show an error message for an empty field when it loses focus, making it harder to fill out the form.

This is made worse if the submit button is disabled until all fields are “correct”, since the button won’t be focusable and won’t be announced by screen readers. Attributes like `maxlength` can also cause issues, since they don’t notify users when they’ve surpassed the character limit. It’s often better to perform validation when the form is submitted, and then if there are issues, show error messages.

To make forms easier to fill in, make sure you’re using the correct [input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types), use the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute to make auto-filling the form easier, and group and label related fields with [`fieldset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) and [`legend`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) elements. [Radio buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) and [checkbox groups](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) in particular benefit from `fieldset` groupings.

```html
<!-- the legend provides additional context for each announced input -->
<fieldset>
	<legend>Character Class</legend>
	<label>
		<input type="radio" name="class" value="fighter">
		Fighter
	</label>
	<label>
		<input type="radio" name="class" value="mage">
		Mage
	</label>
	<label>
		<input type="radio" name="class" value="rogue">
		Rogue
	</label>
</fieldset>
```

Error messages can be handled in different ways, but it’s important for them to be programmatically associated with the inputs that need attention. This can be achieved with [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby).

```html
<form action="/signup" method="POST">
	<p id="email-error">Enter a valid email address.</p>
	<label>
		Email Address
		<input type="email" name="email" aria-describedby="email-error">
	</label>
</form>
```

This association is important because many screen readers have a “form” mode that ignores content other than form controls like inputs and buttons. If the error message is added without the `id` or the input doesn’t have the `aria-describedby` attribute, the user may never hear the error message.

Focus management is also important when there are errors. To notify users of the errors, you can move focus to an element containing the text of error messages, or you could move focus to the first form control that has an error. Otherwise, the user may submit the form and hear nothing, and silence is bad when you’re using a screen reader.

Up to this point, the assumption has been that forms are handled asynchronously with JavaScript, since that seems to be the norm these days. If you allow form submissions to cause page reloads, you don’t need to manually move focus, but depending on the contents of your page, you may still want to, though. The sooner a user is made aware that there was an issue submitting their form, the better.

{% include 'partials/article-pagination.njk' %}
