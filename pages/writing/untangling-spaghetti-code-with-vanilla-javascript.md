---
title: "Untangling spaghetti code with vanilla JavaScript - Writing - Dustin Whisman"
description: "Over the years, web development has gone all-in on frameworks that originally came about to solve the problem of spaghetti code. But is there a simpler, framework-free way to do it?"
articleTitle: "Untangling spaghetti code with vanilla JavaScript"
layout: default
date: 2025-06-02T00:00:00.000Z
tags:
  - writing
  - uncategorized
---

# Untangling spaghetti code with vanilla JavaScript

{% include 'partials/published-date.njk' %}

Back in the day, when jQuery was *the way* to write JavaScript, and “react” was only a verb, spaghetti code was a constant problem. At that time, the web had become capable enough to handle user interactions in the browser without needing to fully reload the page. You could submit a form using XHR (XMLHttpRequest) or AJAX (asynchronous JavaScript and XML), then use the result of the response to update the UI.

At the time, the mechanisms for doing those updates were pretty clunky. You would need to know what all of the pieces of the UI were that needed updating so you could call all the functions that made those updates, or if you wanted to live dangerously, make all those updates from one giant function. It might look a little something like this:

```js
function addToCart(item) {
	$.ajax({
		url: '/api/add-to-cart',
		type: 'POST',
		data: item,
		success: function(result) {
			// increment the quantity in the cart button in the header
			incrementHeaderCartButton(result.quantity);
			// show that the item's already in the cart
			updateAddToCartButton(true);
		}
	});
}
```

Admittedly, this doesn’t look so bad, and depending on who you are, it may invoke some nostalgia. However, the problem becomes obvious once you introduce something new that needs to be updated in addition to all the other things. Let’s say that new feature requirements are being requested: there’s a limited supply of certain items, so we need to show inventory info, and when users add items to the cart, they need to be shown a message about how long their item will be reserved before they check out.

Now we need to add more UI update functions:

```js
function addToCart(item) {
	$.ajax({
		url: '/api/add-to-cart',
		data: item,
		success: function(result) {
			// increment the quantity in the cart button in the header
			incrementHeaderCartButton(result.quantity);
			// show that the item's already in the cart
			updateAddToCartButton(true);
			// decrement the quantity shown for inventory
			decreaseInventory(result.quantity);
			// warn user that their item will only be reserved for so long
			showReservationWarning();
		}
	});
}
```

Oh and now the client wants the shopping cart button to have a dropdown that lists all the items in the cart, and users need to be able to change the quantity or remove items from there. What changes do we need to make now?

- We either need a `decrementHeaderCartButton` function or refactor `incrementHeaderCartButton` to accept positive or negative values
- `updateAddToCartButton` probably needs to accept a selector as an argument, since an item being removed from the cart dropdown *might* affect the add-to-cart button on the page
- `decreaseInventory` also needs to be more generic and will also probably need a selector
- `showReservationWarning` probably needs to be refactored into a `toggleReservationWarning` function that accepts a selector
- We need all new functions for handling quantity updates or removing items from the cart, and those also need to call our update functions

Hopefully it’s clear why “spaghetti code” is the term for this—every update makes this more and more of a tangled mess that gets harder to reason about.

## There’s got to be a better way!

The solution that caught on in the mid-2010s was React, or if not React, some state-based UI framework like Vue or Angular. These brought a lot of things to the table, like component-based architectures, data binding, and abstracted re-rendering so you could *declare* what the UI should look like without caring about how it gets there.

That involves a lot of architectural changes, though, and a lot of JavaScript. As these tools became more popular, so too did single-page applications (SPAs), which require even *more* architectural changes and JavaScript, with the end result being that you might have to wait a few seconds after loading a page before clicking a button does anything on your phone.

So let’s ignore the frameworks and see what other options we have for untangling this pasta.

## Using the document as an event bus

[Event-driven architecture](https://en.wikipedia.org/wiki/Event-driven_architecture) is a way to loosely couple components so that different pieces of software don’t need to know anything about each other. There are publishers that broadcast events and there are subscribers that listen for those events and ignore anything that isn’t relevant to them. To support the [publish-subscribe (or pub/sub) pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern), we can reach for [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), which has been widely supported since 2015.

Let’s go back to our example and see how using events can make things easier to manage. We’ll also swap out the jQuery code for vanilla JavaScript.

```js
const addToCart = async (item) => {
	const response = await fetch('/api/add-to-cart', {
		method: 'POST',
		body: item,
	});
	
	if (response.ok) {
		const addedToCartEvent = new CustomEvent('added-to-cart', {
			detail: { ...item },
		});
		
		document.dispatchEvent(addedToCartEvent);
	}
}

document.addEventListener('added-to-cart', updateHeaderCartButton);
document.addEventListener('added-to-cart', updateAddToCartButton);
```

Now when the new features are requested, we should have an easier time supporting them. The `addToCart` function already does everything that it needs to, so it’s just a matter of adding or updating functions to respond to events as needed.

```js
document.addEventListener('added-to-cart', updateInventory);
document.addEventListener('added-to-cart', toggleReservationWarning);

document.addEventListener('removed-from-cart', updateHeaderCartButton);
document.addEventListener('removed-from-cart', updateInventory);
document.addEventListener('removed-from-cart', toggleReservationWarning);

document.addEventListener('quantity-updated', updateInventory);
```

We’re sort of hand-waving away the details of what these event handler functions do, but it’s worth noting that each of them is assumed to accept the `event` object as its parameter, which includes `type` and `detail` fields that have all the data that those functions need so they can figure out what to change. For example, `updateInventory` might look something like this:

```js
const updateInventory = async (event) => {
	const inventoryElement = document.querySelector('[data-inventory]');
	if (!inventoryElement) return;
	
	const { quantity, sku } = event.detail;
	const inventory = Number.parseInt(inventoryElement.dataset.inventory, 10);
	let newInventory = inventory;
	switch (event.type) {
		case 'added-to-cart':
			// fewer items are available, since the user is buying some
			newInventory = inventory - quantity;
			break;
		case 'removed-from-cart':
			// more items are available, since the user decided not to buy them
			newInventory = inventory + quantity;
			break;
		default:
			// assume we can't optimistically update, ask the server
			newInventory = await fetchInventory(sku);
			break;
	}
	
	inventoryElement.dataset.inventory = newInventory;
	inventoryElement.textContent = `${newInventory} available`;
};
```

The primary advantages of the event-driven approach are that:

- Event handlers work on a need-to-know basis. Publishers don’t need to know about subscribers, who don’t need to know about other subscribers either
- It’s far easier to find event listeners for any given event (search “added-to-cart”) than it is to dig through a spaghetti code stack trace

The separation of concerns and encapsulation of logic makes it easy to update and maintain UI logic, all while keeping a super fast performance footprint (no virtual DOM diffing here). Can we take it further, though?

## Using web components to encapsulate logic

Up until now, we’ve been working with a presumably global script with some event listener initialization happening once the script loads. That’s all well and good, but we could opt in to some quality of life improvements by taking advantage of the web component lifecycle.

This concept may be familiar if you worked with early versions of React, but [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) support the following callbacks as part of their lifecycle:

- `connectedCallback`: called when the element is added to the document
- `disconnectedCallback`: called when the element is removed from the document
- `attributeChangedCallback`: called when attributes are changed, including adding or removing attributes

They also support `connectedMoveCallback` and `adoptedCallback`, but those are more niche and not necessary for what we’re going for here.

Let’s take our `updateInventory` function and refactor it so we have a custom element, `<available-inventory>` that can be used like so:

```html
<available-inventory data-inventory="256">
	<span data-amount>256</span> available
</available-inventory>
```

Note: we could set the `span` up as a [slot](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) by setting `slot="amount"`, but then we’d need to use [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), and that’s just not necessary for what we need.

To set up our custom element, we need to define it and then register the element like so:

```js
class AvailableInventory extends HTMLElement {
	// custom elements boilerplate, nothing special here
	constructor() {
		super();
	}
}

customElements.define('available-inventory', AvailableInventory);
```

We’ll need to set up a function to handle updating the inventory value. We’re going to set it up to change the `data-inventory` attribute on the element to demonstrate the `attributeChangedCallback`, but we could just as easily have it update the content directly.

```js
class AvailableInventory extends HTMLElement {
	constructor() {/*...*/}
	
	// indicate which attribute(s) should trigger attributeChangedCallback
	static observedAttributes = ['data-inventory'];
	
	attributeChangedCallback(name, oldValue, newValue) {
		// what should happen when the data-inventory attribute changes?
		if (name === 'data-inventory') {
			const amountElement = this.querySelector('[data-amount]');
			if (amountElement) {
				amountElement.textContent = newValue;
			}
		}
	}
	
	updateInventory(event) {
		const { quantity, sku } = event.detail;
		const inventory = Number.parseInt(this.dataset.inventory, 10);
		let newInventory = inventory;
		switch (event.type) {
			case 'added-to-cart':
				newInventory = inventory - quantity;
				break;
			case 'removed-from-cart':
				newInventory = inventory + quantity;
				break;
			default:
				// assume we can't optimistically update, let the server tell us
				newInventory = await fetchInventory(sku);
				break;
		}
		
		// update attribute, the attributeChangedCallback will take it from there
		this.dataset.inventory = newInventory;
	}
}

customElements.define('available-inventory', AvailableInventory);
```

From there, we can add a `connectedCallback` to initialize event listeners, and a `disconnectedCallback` to remove those listeners in the event that the element is removed from the document. One slightly awkward part of this is the need to use `.bind(this)` when setting up the event listeners, but that’s only because we’re using `this` as a quick way to get the current custom element. There are other ways around it, but `this` will have to do.

```js
class AvailableInventory extends HTMLElement {
	constructor() {/*...*/}
	
	connectedCallback() {
		// what are all the events that can cause changes for this element?
		document.addEventListener('added-to-cart', this.updateInventory.bind(this));
		document.addEventListener('removed-from-cart', this.updateInventory.bind(this));
		document.addEventListener('quantity-updated', this.updateInventory.bind(this));
	}
	
	disconnectedCallback() {
		// we can clean up lingering event listeners
		document.removeEventListener('added-to-cart', this.updateInventory.bind(this));
		document.removeEventListener('removed-cart', this.updateInventory.bind(this));
		document.removeEventListener('quantity-updated', this.updateInventory.bind(this));
	}
	
	static observedAttributes = ['data-inventory'];
	
	attributeChangedCallback(name, oldValue, newValue) {/*...*/}
	
	updateInventory(event) {/*...*/}
}

customElements.define('available-inventory', AvailableInventory);
```

Phew! That looks like a lot of code, to be sure, but it’s *way less* than the equivalent React version would be if you include library code, and we can dig in and find out exactly what’s happening if we run into unexpected behavior.

A nice benefit of the web component approach is that we don’t need to worry about when we should initialize event listeners or making sure to re-run the initialization when new elements are added. Once the element is added to the DOM, whether that happens from the initial HTML payload from the server or after the fact as the result of client-side JavaScript adding it, the lifecycle callbacks will run and take care of that for you.

## Working with the platform usually pays off

Not everyone enjoys working this close to the metal. I will admit that the ergonomics of web components aren’t as nice as the happy path of React or Vue or Svelte, but I will take that tradeoff for a few good reasons.

One, the web platform will outlast those frameworks. That’s baked into the design of the web. If you write vanilla HTML, CSS, and JavaScript, it will continue to work until the heat death of the internet. In fact, as browsers get better and devices get faster, your websites may even get performance improvements for free!

Two, reducing dependencies is one of the easiest ways to ensure your site is maintainable. Frameworks are generally built in such a way that they need frequent updates for performance improvements, bug fixes, security updates, and new features that may require major rewrites. If you’ve been using React since its inception, there’s a very good chance that you’ve gone through multiple rewrites or major refactors, changing from class-based components to functional components, and then again to adapt to hooks, Context, Suspense, etc. You can step off that treadmill by embracing the platform and limiting dependencies to the things that you can’t practically or securely do on your own.

Lastly, getting deeply familiar with the inner workings of the web makes you a better developer, even if you do end up assigned to a project that is using a framework. Forcing yourself to use browser APIs that are otherwise abstracted away by frameworks will let you recognize opportunities in the course of your regular work to do things a little bit better, a little more efficiently, a little more with the grain of the web.

With a little bit of effort, we can avoid the mistakes of the past while also avoiding mistakes from the present. No jQuery spaghetti, no React `div` soup, maybe we call it web component lasagna? Naming is hard, don’t yell at me.

{% include 'partials/article-pagination.njk' %}
