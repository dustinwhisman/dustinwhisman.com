---
title: "WordPress: The Good, the Bad, and the Ugly | Writing | Dustin Whisman"
description: "What's good about WordPress? What isn't? And what are the most baffling things for a developer to figure out?"
articleTitle: "WordPress: The Good, the Bad, and the Ugly"
layout: default
date: 2023-11-07T00:00:00.001Z
tags:
  - writing
  - learning in public
---

# WordPress: The Good, the Bad, and the Ugly

{% include 'partials/published-date.njk' %}

I’ve been working with WordPress for a little while now, and while I’m sure I’ve only seen the tip of the iceberg, I thought I’d write about my experience with it and what I like about it or find frustrating.

## The Good

### The authoring experience

Having worked with a handful of CMSes, I think WordPress, hands down, has the best authoring experience. For simple cases like blog posts, it feels pretty similar to writing in any other document/text editor or notes app. You just type out what you want, hit enter to start a new paragraph, drop in images where you want them, and boom, you got a page. Admittedly, landing pages and more complex layouts are trickier, but the core blocks do a decent job of giving you the tools you need to make it happen.

In terms of giving a non-technical person a login and telling them to start adding pages to the site, WordPress requires far less training than any other CMS I’ve worked with. Sure, there are a few things you’d need to explain, like how to use categories and tags or how to manage menus, but for the most part, a user can figure things out by browsing the admin for a while.

### Flexibility

Through the WordPress ecosystem, users have access to _tons_ of themes and plugins to extend the capabilities of their site. Is that maybe a little overwhelming? I’ll get to that, but the model of having themes to control presentation and plugins to control functionality is helpful and feels like good old fashioned separation of concerns to me.

You can also choose how much you want to micromanage the site, ranging from using WordPress as a headless CMS all the way to just using [wordpress.com](https://wordpress.com) and letting that handle all the technical stuff.

Blocks are also generally simple enough for authors to figure out, even if under the hood they’re super weird. Their composability is a huge advantage compared to other CMSes with rigid templates. And if you hate blocks, you can enable the classic editor with a plugin.

## The Bad

### Quality control

Since WordPress gives authors and admins a great deal of flexibility, that means it also gives them a lot of opportunities to get themselves into trouble. For example, handling URLs and redirects can become a mess if users add content the “wrong” way, like by using a page template instead of a custom post type or not using parent-child pages correctly. I’ve seen pages 404 because admins used custom links instead of adding a post or page to a navigation menu.

Then there’s the wider ecosystem. With 11,455 free themes and 59,706 free plugins available at time of writing, it’s overwhelming to find themes or plugins that are high quality and will work for your site. You can lean on social proof from reviews or the number of active installations, but there’s no great way to evaluate plugins other than by trying them out, and if they don’t work for your needs, remembering to deactivate and uninstall them.

### Documentation

WordPress has been around for decades, and it’s evolved a lot over that time, especially recently with the shift from the classic editor and themes to blocks. Given how search engines tend to favor older content, it’s hard to find updated information unless you’re starting from the [developer docs](https://developer.wordpress.org/).

WordPress also caters to different audiences with different needs, so developers might find documentation that was written for non-technical content authors or vice versa. Community help through blogs or Stack Overflow answers can be hit or miss as well. There used to be trend of answers saying “just use jQuery” and it feels like the equivalent for WordPress is “just use this plugin”.

In my experience, the documentation is very fragmented and often leaves out important context, which makes it hard to solve problems. I think the documentation could benefit from more end-to-end tutorials or guides, or at least more examples that show the bigger picture. Documentation is hard, though, so I get it.

## The Ugly

### Blocks are so weird

Let me try to explain, to my understanding, how blocks work. They are written in React with two main functions to render them based on context. The `edit` function is for the editor view and will include controls for settings for the block and show a preview of what the block will look like on the page. Then, the `save` function is used for the main site, when people are viewing the published page. So far, so good.

However, the `save` function does not work like a normal React component. The JavaScript that you write is used to serialize HTML that gets saved in the database and sent to the client from the server. This means you can’t write your React components to take advantage of, you know, *reactivity* with things like state or `useEffect` hooks or anything that would require JavaScript in the front end. For that, you need a `view.js` file, but again, you can’t really take advantage of React, so you’re probably better off writing vanilla JS event handlers and such.

The HTML that is serialized also includes special comments, like so:

```html
<!-- wp:paragraph {"align":"right"} -->
<p>This is a paragraph</p>
<!-- /wp:paragraph -->
```

The comments give WordPress context about what the block is and what settings apply to that instance of the block. You’d better hope that any updates to your data or the blocks themselves don’t introduce changes. Since the blocks are saved to the database instead of dynamically rendered at runtime, any time that WordPress can’t reconcile your markup with blocks will result in a warning about invalid block contents, which you can attempt to fix by attempting block recovery. Sometimes that works, and other times, your block gets converted to HTML, making it harder for non-technical users to manage and understand. Block developers can address changes with a deprecation and migration strategy, but it’s [not a particularly straightforward process](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/).

### Block themes: also weird

I’ve been digging through the [Theme Handbook](https://developer.wordpress.org/themes/) to better understand the best practices around theme development, and I plan to do the same for the [Plugin Handbook](https://developer.wordpress.org/plugins/), and some things just strike me as weird about [block themes](https://developer.wordpress.org/themes/block-themes/).

For one, there are only two required files to make a theme: `style.css` and `templates/index.html`. However, the `style.css` file in all the examples I’ve seen _does not contain CSS_. Instead, it has metadata in a comment for defining things like the theme name, author, description, etc. So where are you supposed to define style information? Why, `theme.json` of course. What?!?

I’m sure there’s a historical reason for this setup, but it just makes no sense to me. Surely JSON is a better format for metadata than a comment in a CSS file. I sort of understand why the styling info is in JSON–it allows for sharing “tokens”, more or less, between CSS and JS, which is useful for blocks, but boy do I not like looking at it.

Maybe `templates/index.html` is better. Let’s take a look at the HTML for the Twentytwentythree theme.

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
	<!-- wp:query {"query":{"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":true,"taxQuery":null,"parents":[]},"displayLayout":{"type":"flex","columns":3},"align":"wide","layout":{"type":"default"}} -->
	<div class="wp-block-query alignwide">
		<!-- wp:post-template {"align":"wide"} -->
			<!-- wp:post-featured-image {"isLink":true,"width":"100%","height":"clamp(15vw, 30vh, 400px)","align":"wide"} /-->
			<!-- wp:post-title {"isLink":true,"align":"wide"} /-->
			<!-- wp:post-excerpt /-->
			<!-- wp:post-date {"isLink":true} /-->

			<!-- wp:spacer {"height":"var(--wp--preset--spacing--70)"} -->
			<div style="height:var(--wp--preset--spacing--70)" aria-hidden="true" class="wp-block-spacer"></div>
			<!-- /wp:spacer -->
		<!-- /wp:post-template -->

		<!-- wp:query-pagination {"paginationArrow":"arrow","align":"wide","layout":{"type":"flex","justifyContent":"space-between"}} -->
			<!-- wp:query-pagination-previous /-->
			<!-- wp:query-pagination-next /-->
		<!-- /wp:query-pagination -->
	</div>
	<!-- /wp:query -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

Oh boy.

What I gather from this is that if you want to develop a block theme, you can’t just write HTML and CSS, at least not without taking a great deal of psychic damage. It seems like the intended process is to spin up WordPress with a minimal theme, then put stuff together in the editor and copy the resulting markup to paste into your theme’s files. That’s certainly a workflow, just not one that I can see many developers being thrilled to adopt.

## The end (for now)

There’s a lot of ground I didn’t cover here, and I’m still in the middle of learning all of the intricacies of old and new WordPress, so I’m sure I’ll have more thoughts as I go. I’ll certainly be taking notes and trying to distill my learning into something more actionable than this, which is all just, like, my opinion, man.
