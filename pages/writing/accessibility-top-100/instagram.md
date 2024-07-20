---
title: "How accessible is Instagram? - Writing - Dustin Whisman"
description: "How accessible is Instagram? This is part 7 of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "How accessible is Instagram?"
layout: default
date: 2024-07-20T00:00:00.000Z
tags:
  - writing
  - accessibility top 100
---

# How accessible is Instagram?

_This is part 7 of a [series](/writing/accessibility-top-100/) evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at Instagram. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}

## What I tested

Unless you have a direct link to a post or reel or whatever, you need an account to use Instagram in any real way, so I tested the signup process, similar to what I did for [Facebook](/writing/accessibility-top-100/facebook/). Spoiler alert, I was able to sign up successfully this time, so I also tested the home page for logged in users.

<figure>
	<picture>
		<source srcset="/images/accessibility-top-100/instagram/desktop-h.png" media="(min-width: 50rem)">
		<img src="/images/accessibility-top-100/instagram/desktop-v.png" alt="A composition of screenshots from the desktop version of instagram.com, showing the login page, a page for following accounts, and the home page for logged in users." class="cmp-article__image">
	</picture>
	<figcaption>These are the pages that were tested on desktop.</figcaption>
</figure>

The mobile pages were just different enough to need some extra testing, although those differences were mainly on the login and signup pages.

<figure>
	<img src="/images/accessibility-top-100/instagram/mobile.png" alt="A composition of screenshots from the mobile version of instagram.com, showing the login page, a page for following accounts, and the home page for logged in users." class="cmp-article__image">
	<figcaption>These are the pages that were tested on mobile.</figcaption>
</figure>

I tested Instagram on July 20th, 2024.

## Testing the login page

### Automated scans

#### Desktop

When opening developer tools to run the automated scans as I usually do, I noticed this subtle message in the console, which definitely inspires confidence in Meta’s ability to build and operate a secure website.

<figure>
	<img src="/images/accessibility-top-100/instagram/security-warning.png" alt="A developer tools console with this message: Stop! This is a browser feature intended for developers. If someone told you to copy-paste something here to enable an Instagram feature or 'hack' someone's account, it is a scam and will give them access to your Instagram account. See https://www.facebook.com/selfxss for more information." class="cmp-article__image">
	<figcaption>You could use two-factor authentication, or you know, you could do this.</figcaption>
</figure>

The home page has relatively few outright failures. The “Sign up” link doesn’t have sufficient color contrast, the “Phone number, username, or email” input has a `dir` attribute with no value, and the `contentinfo` role is redundantly applied to the `footer`. That last one is not recommended, which is different from not allowed, but IBM Equal Access treats it as a violation. Other redundant roles, like `role="link"` on `a` tags are treated as recommendations for things to change, so I’m curious why there’s a distinction here.

The weirdest issue, though, is the Instagram logo above the login form, which I would have expected to be an `img` tag with maybe a wrapper `div` or something for layout purposes, but there's gotta be a reason Meta developers make the big bucks. They went with this:

```html
<div aria-disabled="false" role="button" tabindex="0" style="cursor: pointer;">
	<i
		data-visualcompletion="css-img"
		aria-label="Instagram"
		class=""
		role="img"
		style="background-image: url(&quot;https://static.cdninstagram.com/rsrc.php/v3/yM/r/8n91YnfPq0s.png&quot;); background-position: 0px -52px; background-size: auto; width: 175px; height: 51px; background-repeat: no-repeat; display: inline-block;"
	></i>
</div>
```

Where to begin…

1. If you want something to be a button, use a `button` element ([don’t make me tap the sign](/writing/when-to-use-links-vs-buttons/))
2. This “button” doesn’t do anything when clicked, unless I failed to discover the condition where it becomes functional
3. The `i` tag historically was used to italicize text and is now meant to indicate text that is somehow distinct from the surrounding text. That’s not what it’s being used here for—my guess is they used it because it’s shorter than `span`
4. If you’re going to set `role="img"`, give it an `aria-label`, and inline the path to the image on the `style` attribute, then why not just use an `img` tag? There are cases where CSS background images make sense, and this is not one of them

#### Mobile

More elements have insufficient color contrast in the mobile design, mainly the light blue against white used for links and buttons. Instagram also disables zooming and scaling, which is straight up indefensible, especially for a page as basic as this. What, you couldn’t figure out how make sure one sentence followed by three links worked when zoomed in? Get outta here.

The same issues found on desktop apply here as well, plus there are now multiple elements with the “navigation” role that aren’t labeled to be distinguishable from each other. Those are the language selector and the set of icon-only links at the bottom of the page.

### Manual testing

#### Desktop

There are a couple keyboard access issues, one being the broken “button” containing the Instagram logo, the other being the language selector, which does not get any visual focus indicator when you tab to it. Weirdly, some of the footer links get a black focus outline and other ones get blue outlines—not exactly a problem, but it is indicative of an inconsistent approach to building even simple things. As much as component-based architecture helps developers organize and reuse code, you do need someone looking at the big picture of how these components are being put together.

The images of phones next to the login form rotate through a set of totally real screenshots of real people saying things like “Reels just keep getting better”, but there’s no way to pause the animation and reduced motion settings have no effect. Granted, it’s a cross-fade animation rather than a carousel-slider animation, so there’s technically not “motion” happening, but it’s still distracting.

If you were wondering whether those images had alt text, the answer is no, of course not. They’re treated as decorative, but I’d argue that they’re effectively a sales pitch of the kinds of things you can do or expect to find if you sign up, which doesn’t seem decorative to me.

In the login form, the submit button is disabled until you fill out all the fields, which is a [bad practice](https://adamsilver.io/blog/the-problem-with-disabled-buttons-and-what-to-do-instead/) that causes issues for all kinds of users. The form fields have floating labels that look like placeholders until you start typing, which isn’t great for usability since it’s hard to tell at a glance whether you already filled out a field or if you’re looking at placeholder text. Technically speaking, this doesn’t fail any WCAG success criteria, but it’s not great.

When I attempted to login with a made-up username and password, I expected to get an error message like “That password is incorrect” or something to that effect. Instead, I was redirected to a page with a CAPTCHA that wasn’t keyboard-accessible for the visual method (click on all the images with cars), so I tried the audio method. It played an inscrutable sound clip that I had to guess what was being said and type it into a form. I think I could have typed anything, and it would have accepted it, but anyway, only after having done all that, did I get the message saying “Sorry, your password was incorrect. Please double-check your password.” Those steps are in the wrong order, and [don’t make me tap the other sign about using CAPTCHAs](/writing/accessibility-how-tos/how-to-avoid-accessibility-issues-with-captchas/).

<figure>
	<img src="/images/accessibility-top-100/instagram/failed-login.png" alt="A screenshot of the error message, post-CAPTCHA, with a wall of text about weak passwords and the merits of CAPTCHAs to combat harmful conduct." class="cmp-article__image">
	<figcaption>They couldn't have figured out the password was wrong before all this?</figcaption>
</figure>


When zooming in, the “decorative” images are hidden and the Instagram logo gets blurry, but otherwise, everything scales up and works how I’d expect.

#### Mobile

The mobile experience is essentially the same as desktop, but the focus indicators are orange now (except for the ones that are randomly blue). At least this time when I tried a bogus login, the incorrect password message appeared right away instead of after going through a CAPTCHA. Unfortunately, the color contrast on the red text against the background is too low and there are no programmatic associations between the form or any inputs and the error message, so it’s unlikely a screen reader user would know about the error message.

### Testing the signup process

### Automated scans

#### Desktop

Again, the light blue brand color doesn’t have sufficient contrast with the white background or text in buttons. There are also links in the signup form that only use color to indicate that they are links since they don’t have underlines, and the color difference is absolutely minimal between the surrounding text and the links. So far, so bad in terms of using color.

Otherwise, the same issues from the home page apply here as well.

#### Mobile

The only noteworthy automatically detected issues on mobile were from placeholder text (functioning as a label) not matching the `aria-label` for the phone number or email address inputs. This can cause issues for speech control users, who say “click phone number” but the accessible name is “mobile number”. Visual labels should match at least the beginning of the accessible name to avoid that kind of issue.

### Manual testing

I only wanted to test the signup process once, so I opted to do it at desktop size. I figure if you’re signing up on mobile, you’re more likely to be using the native app anyway, so why not go full weirdo and sign up on desktop.

I have a hunch that I won’t be allowed to sign up, since Facebook decided I hadn’t done enough to prove I’m a “real person” or whatever, and that burner email is the same one I plan on using here. (Minutes later) I was allowed to sign up this time. I guess because enough people set up Instagram for their pets that being a real person matters less here?

I signed up by exclusively using the keyboard and didn’t run into any issues. Disabled submit buttons aside, the forms at least have the basics in place to not be totally broken. It’s a low bar, but they cleared it.

### Testing the home page

Immediately after signing up, I was presented with a very iOS-looking prompt (I used a Windows PC) for allowing notifications, which feels deceptive, and I instinctively dismissed it before I thought to evaluate it for accessibility. I was still going keyboard-only, though, and the prompt received focus first and responded as expected, so that’s something.

There’s effectively no difference between desktop and mobile now, so I’ll lump all the findings together now.

### Automated scans

As expected, after the relatively simple interfaces for login and signup, the main content of the site has way more detected issues. Part of that is more instances of color contrast issues because there are more links and buttons. The other part is worse because there are now tons of nested interactive controls, in this case buttons wrapping links. In case you were wondering, the “buttons” and “links” are actually role’d up `div` elements.

It’s unclear what the purpose of the buttons is supposed to be, since activating any of these button-link combos acts as following a link. There are hover interactions to show popover-type content, so maybe the buttons were supposed to reveal those popovers. They don’t, though, so oops.

<figure>
	<img src="/images/accessibility-top-100/instagram/hover-interaction.png" alt="A screenshot of the popover that appears on hover and focus. There are a handful of links, buttons, and images that are completely inaccessible via keyboard or screen reader." class="cmp-article__image">
	<figcaption>The popover also appears on keyboard focus, but there's no way to tab to any of the interactive content it contains.</figcaption>
</figure>

There are a few other issues with invalid IDs being used for some `aria-describedby` attributes, but otherwise, there aren’t any novel issues to dig into, at least not until after following some accounts. I randomly picked Sabrina Carpenter and The Rock and then re-scanned the home page.

The new issues are mainly with ARIA usage (not surprising). Some focusable elements are contained by elements that are `aria-hidden`, `aria-label` is used on elements with the “generic” role, and there’s an element with `role="menu"` and an element with `role="menuitem"` that are set up totally wrong and not associated with each other. Also, the [menu role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/menu_role) doesn’t do what you think it does, so you should probably avoid using it.

The main navigation is not contained by any landmark elements, which is a pretty fundamental mistake, since `nav` is right there. There are only `div` elements as far as the eye can see, with the occasional `a` tag with redundant `role="link"` and `tabindex="0"` attributes thrown in here and there.

The loading indicator that is apparently always at the bottom of the page waiting to be pushed down by newly loaded content is marked up with `role="progressbar"`, which is absolutely not what that role is for. It would be way better to treat it as decorative or use visually hidden text that says “loading more posts” or something like that.

### Manual testing

The infinite scrolling makes the footer utterly pointless and inaccessible to everyone except screen reader users. It gets pushed down further and further by new posts, so it’s effectively never in view, which is bad for keyboard-only users who won’t be able to see what element has focus and worse for mouse/touch users who will be unable to see or click any of the links.

There are no skip links to bypass repeated content like the main menu or the “Suggestions for you” section, which makes tabbing to the first post very tedious.

Stories are implemented as carousels or sliders, but the arrows to navigate back or forward aren’t keyboard focusable, so there’s no way to navigate through them with the keyboard. This gets worse when there are videos intermixed with photos, because the mute/play audio button will receive focus if you’re tabbing through, jumping you to whatever slide in the story has the video. It’s a mess. Bad job, Instagram.

Videos also autoplay (on mute at least) with no regards to reduced motion preferences, and there aren’t any keyboard focusable or visible play/pause controls for them.

Alt text seems to be automatically generated if account owners don’t write it (I’m assuming you can write alt text for your own images, I don’t use Instagram). For example, this alt text is used for an image of Sabrina Carpenter wearing a red one-piece swimsuit and sitting in a cabana: “Photo by Sabrina Carpenter on July 13, 2024. May be an image of 1 person, outdoors and text.” Wow, it’s like I’m there in person.

At least when I zoom the page on desktop (where it’s allowed), nothing overflows and the text scales up or gets swapped with icon only links that have accessible names.

### Results

If I had stopped at the login or signup page, I might have given Instagram a C, but there are so many more problems with the logged in experience, that I have to knock it down to a D-. Setting up a login form should be a slam-dunk, but they managed to screw it up pretty badly with the CAPTCHA and error messaging, and there are so many things that are fundamentally broken when logged in that it’s hard to ignore.

It’s not the worst I’ve seen, but it’s far from the best. Next time, we’ll see if IMDB can do any better.

{% include 'partials/article-pagination.njk' %}
