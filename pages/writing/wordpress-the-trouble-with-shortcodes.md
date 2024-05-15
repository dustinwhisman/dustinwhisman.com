---
title: "WordPress: the trouble with shortcodes - Writing - Dustin Whisman"
description: "Taking a look at shortcodes in WordPress and some usability problems for content editors."
articleTitle: "WordPress: the trouble with shortcodes"
layout: default
date: 2023-11-03T00:00:00.000Z
tags:
  - writing
  - uncategorized
---

# WordPress: the trouble with shortcodes

{% include 'partials/published-date.njk' %}

Shortcodes are a feature of WordPress that allows developers to write handlers to generate content that gets rendered within posts or pages. This is a powerful tool for developers, since it allows them to execute whatever back-end code is necessary to generate the end result. However, their unusual syntax creates a barrier for content editors with less technical experience (you know, the people who are generally responsible for creating posts).

For illustration purposes, let’s pretend we’ve created a shortcode called `latest-posts` that, by default, gets the latest 5 posts and displays their titles as a list of links. But maybe we want the content editor to be able to choose which category, tag, or post type to show results from, and they should probably be able to change the number of posts. And for good measure, maybe they should be able to set some text to use as a heading above the list of posts. This shouldn’t be too hard for a decent developer to implement, but how easy is it to use?

## The simple case

For our simplest usage, all a content editor needs to do is drop `[latest-posts]` into the post. Actually, hang on a second, first they need to choose the “Shortcode” block if they’re using Gutenberg. *Then* they can set `[latest-posts]` in the text box that appears. Or maybe they don’t actually need the Shortcode block? It seems like just typing “[latest-posts]” also works. Could they put the shortcode in the middle of a paragraph then? Hmm…

There’s already some non-intuitive stuff going on here, and there’s a definite chance that a content editor could accidentally add a shortcode in a way that subtly breaks things. We’ll just be sure to document that and add a note in any demos or training sessions that we do.

## Using attributes

Cool, now that the basic needs are met, let’s try setting some attributes to control which posts are displayed. For that, our content editor will have some options:

```markdown
[latest-posts category="news"]

[latest-posts tag="tech"]

[latest-posts post-type="recipes" tag="cookies"]

[latest-posts order-by="popularity" order="desc" number-of-posts="20"]
```

Okay, that’s actually a lot of different things to keep track of. How will the content editors know what the valid attributes are, let alone what the valid values for those attributes are? And how will they know what they got wrong when they look at the site and just get a “No results found” message from our very good error handling?

Add it to the documentation and training notes.

## Using content

For the dynamic heading above the latest posts, let’s assume we decided to use the contents of the shortcode, otherwise known as the stuff between the opening/closing tag. Something like this:

```markdown
[latest-posts category="news"]Breaking News[/latest-posts]
```

Alright, that’s not too much harder to understand than anything else up until now. It does seem like it would be easy for someone unfamiliar with HTML to miss the `/` in the closing tag, though.

At this point, it seems like the best course of action is to give the content editor some example shortcodes to copy-paste. Either that or spend the time to create a custom block that does the same thing.

## Use shortcodes with caution

I think the simplicity of shortcodes is appealing to developers, since it takes relatively little code to get something useful working. However, they are so developer-centric that I wouldn’t recommend them unless the people editing content are also developers or at least have some experience writing HTML.

Shortcodes have been around since WordPress 2.5, so they may just be hanging around for legacy reasons, but I think shifting them to custom blocks is probably the way to go moving forward. The biggest issue with that is that custom blocks are more complicated to implement and have a steeper learning curve for developers, but shifting complexity away from content editors to developers seems better to me than the other way around.

{% include 'partials/article-pagination.njk' %}
