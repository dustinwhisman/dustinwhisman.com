---
title: "How to avoid accessibility issues with missing/improper alt text - Accessibility how-tos - Writing - Dustin Whisman"
description: "Always set an alt attribute on images, even if it's blank. Fewer images are purely decorative than you think. Keep alt text brief, falling back to long descriptions elsewhere if needed."
articleTitle: "How to avoid accessibility issues with missing/improper alt text"
layout: default
date: 2024-05-21T00:00:00.000Z
tags:
  - writing
  - accessibility how-tos
---

# How to avoid accessibility issues with missing/improper alt text

{% include 'partials/published-date.njk' %}

Images are everywhere on the web, and without good alt text, users can be left out. At a bare minimum, every `img` tag needs to have an `alt` attribute, empty or not. Without it, screen readers will fall back to using the file name when describing the image, and unless that file name happens to be descriptive, that’s not going to be helpful.

Images that are purely decorative can use `alt=""` to let screen readers know that there’s nothing to see here and just ignore the image. However, not all screen reader users are completely blind, so users with low vision may see that there is an image but be unable to make out the details. If the image is treated as decorative, they can’t satisfy their curiosity. Even if it is generic stock photography that doesn’t contribute much to the content, you can say as much in the alt text.

```html
<img src="/path/to/image.jpg" alt="Five hands placed on top of each other in a 'Go Team' gesture.">
```

For highly detailed images like charts, maps, or text-heavy info-graphics, you may need to summarize the gist of the image in the alt text, then supplement the image with a longer text description or text-equivalent that conveys all the necessary information. For example, a chart of the stock market could be summarized at a high level for the main takeaway from the image. Then it could be followed by a table that lists stock prices for every year or a link to a page that includes the raw data.

```html
<figure>
	<img src="/path/to/image.png" alt="Chart showing increasing stock prices over time, with notable dips during The Great Depression and The Great Recession.">
	<figcaption>
		On a large enough time scale, the market's value trends upwards (<a href="/historical-data">Full historical data</a>).
	</figcaption>
</figure>
```

For more middle-of-the-road images that aren’t decorative but don’t require long descriptions, it’s important to keep context in mind. Why are you including the image? What does it add to the rest of the content? A bone-dry, factual description of the image may not make sense in the middle of a lighthearted blog post. It’s important to consider the audience, the content, and the [emotion](https://jakearchibald.com/2021/great-alt-text/) when describing the image. Also, keep it brief because [really long alt text may do more harm than good](https://adrianroselli.com/2024/04/long-alt.html).

Also, images will be announced as images before reading the alt text, so avoid descriptions like “image of a really long cat” because they could be read as “image, image of a really long cat”.

{% include 'partials/article-pagination.njk' %}
