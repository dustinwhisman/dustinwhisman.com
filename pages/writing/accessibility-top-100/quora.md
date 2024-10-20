---
title: "How accessible is Quora? - Writing - Dustin Whisman"
description: "How accessible is Quora? This is part 10 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is Quora?"
layout: default
date: 2024-10-20T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is Quora?

_This is part 10 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at Quora. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

Quora is kind of a strange case in that you can view questions if you find them through search engines, but if you visit [quora.com](https://quora.com), you get a login/signup screen. There’s no front page like what reddit has for unauthenticated users. For that reason, I’ll test a question and answer page that I found by searching “quora how to cook ramen” (should be an easy answer, no?), and then I’ll test the signup process.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/quora/desktop-h.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/quora/desktop-v.png" alt="A composition of screenshots from the desktop version of quora.com, showing a question and answer page and the signup page." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

<figure>
	<img src="/images/accessibility-top-100/quora/mobile.png" alt="A composition of screenshots from quora.com on mobile, showing a question and answer page and the signup page." class="cmp-article__image">
	<figcaption>These were the pages tested on mobile.</figcaption>
</figure>

I tested Quora on October 20th, 2024.

## Testing a question and answer page

### Automated scans

Each answer, related question, or promoted question/answer (what is this site? people use this?) that appears under the main question has an avatar image and a username, both of which are `div` elements with `aria-expanded="false"` and `aria-haspopup="dialog"` attributes, as well as `tabindex="0"`. Based on that, I’d assume they meant to use a `button`, but when you click on one, it opens a different page in a new tab. If that’s the goal, then why not use an `a` element with `target="_blank"` ? Not that I’m advocating for forcing links to open new tabs, it’s just the easiest way to do it—easier than misusing ARIA at least.

Elsewhere, there are a few lists of related links. Should be easy, I’d expect something like this:

```html
<ul>
	<li>
		<a href="/path/to/question">Should I rinse my ramen noodles before cooking them?</a>
	</li>
	<li>
		<a href="/path/to/another-question">Can you leave cooked ramen noodles out overnight?</a>
	</li>
</ul>
```

Here’s what they actually did, and I’m hiding it behind a `<details>`/`<summary>` because you can’t unsee certain things.

<details>
  <summary>Horrendous HTML, reveal at your own risk</summary>

```html
<!-- I included the classes and inline styles to paint the full picture -->
<div class="q-box" role="list" style="box-sizing: border-box;">
	<div>
		<a class="q-box qu-cursor--pointer qu-display--block qu-hover--textDecoration--none b2c1r2a puppeteer_test_link"
			target="_blank" href="https://www.quora.com/unanswered/Should-I-rinse-my-ramen-noodles-before-cooking-them"
			style="box-sizing: border-box; border-radius: inherit;">
			<div
				class="q-box qu-hover--textDecoration--undefined qu-tapHighlight--none qu-display--flex qu-alignItems--center"
				style="box-sizing: border-box; position: relative;">
				<div class="q-flex qu-alignItems--center qu-py--tiny qu-flex--auto qu-overflow--hidden"
					style="box-sizing: border-box; display: flex;">
					<div class="q-box qu-flex--auto qu-overflow--hidden" style="box-sizing: border-box;">
						<div class="q-text qu-color--gray_dark" style="box-sizing: border-box;">
							<div class="q-box qu-py--tiny qu-px--medium qu-hover--bg--darken" style="box-sizing: border-box;">
								<span class="q-text qu-color--blue_dark" style="box-sizing: border-box;">
									<div class="q-flex qu-flexDirection--row" style="box-sizing: border-box; display: flex;">
										<div class="q-inline qu-flexWrap--wrap"
											style="box-sizing: border-box; display: inline; max-width: 100%;">
											<div class="q-text qu-truncateLines--2 puppeteer_test_question_title ttkyqwz"
												style="box-sizing: border-box;">
												<span class="q-box qu-userSelect--text" style="box-sizing: border-box;">
													<span style="background: none;">
														Should I rinse my ramen noodles before cooking them?
													</span>
												</span>
											</div>
										</div>
									</div>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</a>
	</div>
	<div>
		<a class="q-box qu-cursor--pointer qu-display--block qu-hover--textDecoration--none b2c1r2a puppeteer_test_link"
			target="_blank" href="https://www.quora.com/Can-you-leave-cooked-ramen-noodles-out-overnight"
			style="box-sizing: border-box; border-radius: inherit;">
			<div
				class="q-box qu-hover--textDecoration--undefined qu-tapHighlight--none qu-display--flex qu-alignItems--center"
				style="box-sizing: border-box; position: relative;">
				<div class="q-flex qu-alignItems--center qu-py--tiny qu-flex--auto qu-overflow--hidden"
					style="box-sizing: border-box; display: flex;">
					<div class="q-box qu-flex--auto qu-overflow--hidden" style="box-sizing: border-box;">
						<div class="q-text qu-color--gray_dark" style="box-sizing: border-box;">
							<div class="q-box qu-py--tiny qu-px--medium qu-hover--bg--darken" style="box-sizing: border-box;">
								<span class="q-text qu-color--blue_dark" style="box-sizing: border-box;">
									<div class="q-flex qu-flexDirection--row" style="box-sizing: border-box; display: flex;">
										<div class="q-inline qu-flexWrap--wrap"
											style="box-sizing: border-box; display: inline; max-width: 100%;">
											<div class="q-text qu-truncateLines--2 puppeteer_test_question_title ttkyqwz"
												style="box-sizing: border-box;">
												<span class="q-box qu-userSelect--text" style="box-sizing: border-box;">
													<span style="background: none;">
														Can you leave cooked ramen noodles out overnight?
													</span>
												</span>
											</div>
										</div>
									</div>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</a>
	</div>
</div>
```

</details>

If I were evaluating a code sample for an applicant and saw anything even close to that, they’d be disqualified immediately, regardless of experience level. For reference, this is what that list looks like.

<figure>
	<img src="/images/accessibility-top-100/quora/simple-list.png" alt="A list of simple blue hyperlinks, barely different from what user agent styles would provide." class="cmp-article__image">
	<figcaption>It took all that code to create this?</figcaption>
</figure>

In case you skipped the code sample, the part that makes this an accessibility issue is using `role="list"` on the parent `div` without applying `role="listitem"` to the list items, or you know, using semantic elements like `ul` and `li`. The div-itis just causes me immense pain.

There are couple skip links at the top of the page (”Skip to content”, “Skip to search”) followed by a “Close” button that has no accessible name and no discernable utility. The other skip links are only visible when focused, so tabbing away from them hides them already. This button is useless *and* inaccessible, what a combination.

The “Sign In” link uses white text on an orange background, which gets flagged for low contrast, but orange and white are notorious for failing the mathematical contrast requirements while being generally fine in user testing. After checking against the [APCA contrast method](https://www.color-contrast.dev/?txtColor=FFFFFF&bgColor=F52936), I’d give it a pass.

Most, if not all, user-submitted images don’t have alt text, and they don’t even have empty `alt` attributes. I don’t know if Quora supports alt text and users don’t supply it or if there’s simply no mechanism for adding alt text to images on the site. Both are bad, but the latter is worse.

On mobile, the only notable new issue is that scaling and zooming is disabled, which any accessibility professional would tell you is a bad idea, and yet I keep encountering it on these extremely popular websites.

All of the issues mentioned so far were detected by axe DevTools, which tends to be conservative in avoiding reporting issues that might not actually be issues. IBM Equal Access reports everything that it detects as a potential error and categorizes them as recommendations, things that need review, and violations. I bring this up because I started running IBM Equal Access, and it took more than 10 minutes before crashing the browser, which usually means that it found more issues than it could handle.

After a second attempt at scanning the page, IBM Equal Access flagged the following additional issues:

- Tons of elements are not contained by landmark regions
- Tons of SVG elements that may or may not be decorative don’t have accessible names (alt text)
- Tons of focusable elements using `tabindex` don’t have valid widget roles (putting `tabindex` on a `div`, for example)
- Invalid ARIA attributes for the element roles they’re paired with, mainly `aria-label` on `span` elements
- Accessible names don’t match the visual text of some elements
- Form controls don’t have associated labels

There are many more, but I don’t have the time or patience to dig into all of them. Suffice it to say, Quora is more than a little busted.

### Manual testing

This site’s user experience is so weird. How is it as popular as it is? I have to assume the unauthenticated experience is deliberately bad to force people to sign up.

Anyway, the keyboard-only experience isn’t great. Because of all the `tabindex` shenanigans and the total lack of semantic elements, there are a lot of redundant tab stops. For example, those avatar images that open a new page will receive focus twice when tabbing through, as will the usernames that are also redundant for keyboard-only users, since they achieve the same goals. That’s four tab stops when one would do. There are also sticky/fixed positioned elements that obscure focus at times.

The site does not respond well to zooming in, as even at 200%, content overflows in a way that causes scrolling both horizontally and vertically. At 400%, the site is borderline unusable, as you would need to scroll back and forth just to read the main question. Taking a brief look at the CSS, it doesn’t even seem like media queries are used to change the layout, and the main content and sidebar sections have explicit widths in pixels set on their `style` attributes. Incredible.

The site uses adaptive design rather than responsive design to serve the page differently for mobile devices, which is why the fixed widths don’t cause the same issues on small screens, but as mentioned before, zooming and scaling is disabled.

## Testing the signup process

### Automated scans

At least the signup page is simple. The only issue flagged by axe DevTools is that links are only distinguishable by color. How hard is it to use underlines, really? This comes up all the time, and it’s such a simple fix.

As usual, IBM Equal Access found more issues, including the following:

- Content not contained by landmark regions
- ARIA properties reference IDs of elements that do not exist
- More unnamed SVG elements and focusable `div` elements

Again, zooming is disabled on mobile, and although the automated tools couldn’t pick it up, I’m certain that there are color contrast issues with the white text on the light background. The background image appears to be implemented differently as well, and it’s composed of two images without alt text (or `alt=""`).

<figure>
	<img src="/images/accessibility-top-100/quora/poor-contrast.png" alt="The signup page for Quora, which has obviously poor color contrast that goes undetected because automated tools have trouble with background images." class="cmp-article__image">
	<figcaption>Some of the white text might be borderline, but it's obviously not enough contrast for the links.</figcaption>
</figure>

### Manual testing

When you load the page, keyboard focus is immediately moved to the email input of the login form, which could be disorienting for screen reader users who haven’t even gotten the context of what the page is. I’m surprised that they managed to not screw up the label for the input, given how disorganized the markup is. The inputs and “Login” button aren’t even wrapped by a `form` element, so good luck signing in if JavaScript fails to load.

Aside from the autofocus issue (they don’t even use the `autofocus` attribute, so I have to assume some JavaScript hack), the focus order doesn’t totally match the visual order of elements on the screen, most notably in the localization links, where the second link receives focus before the first, then moving on to the third and so on.

Activating the “Sign up with email” button opens a modal dialog (an ARIA dialog, not a `dialog` element), which only sort of traps focus correctly. There are a few links that are not visually in the modal that receive focus, but you can’t get to the rest of the page beside those. Once again, the form inside the dialog does not use a `form` element, so pressing “Enter” after filling it out does not submit the form, and the focus indicator on the submit button is nearly indiscernible compared to its default state.

The signup process involves entering a confirmation code into an input that appears in place of the previous form, as well as filling out a CAPTCHA, and we know [how I feel about those](/writing/accessibility-how-tos/how-to-avoid-accessibility-issues-with-captchas/). Because of the bad focus indicator, I ended up accidentally opening the Terms of Service page instead of submitting this form, so I had to go back and try again.

This led to a “One Last Step” page where you pick topics of interest to you before you can resume normal question and answer activities. However, this page is absolutely inaccessible via keyboard. No matter how much I tabbed or shift-tabbed, nothing changed on the page. No links or buttons received focus from what I could tell, so without a mouse, I’d be stuck here indefinitely.

<figure>
	<img src="/images/accessibility-top-100/quora/one-last-step.png" alt="A grid of topics with representative images for things like sports, movies, science, etc. followed by a continue button that is disabled until 5 topics are chosen." class="cmp-article__image">
	<figcaption>This is indeed the last step, since no other steps can be accessed beyond this.</figcaption>
</figure>

I could do more scans and dig into this page to see exactly what’s going wrong, but I think I have more than enough info to reach a verdict.

## Results

Quora gets an F. Even the easiest things, like a list of links, are built completely wrong, which makes the more difficult things even more wrong. It’s also just a baffling user experience, even if you don’t need assistive tech to use it. It’s shocking to me that something so broken is so popular. Did Yahoo! Answers leave that big a void? I can only imagine how busted that site was—it would have been fun to test.

Next time, I’ll wade into the world of sports by testing ESPN’s website.

{% include 'partials/article-pagination.njk' %}
