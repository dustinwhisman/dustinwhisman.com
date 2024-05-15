---
title: "Improving My Site's Performance - Writing - Dustin Whisman"
description: After auditing my site for performance and making some changes, has anything improved?
articleTitle: Improving My Site's Performance
layout: default
date: 2023-02-04
tags:
  - writing
  - uncategorized
---

# Improving My Site's Performance

{% include 'partials/published-date.njk' %}

I recently [audited my site for performance issues](/writing/auditing-my-sites-performance/), and I made some changes to fix things up a bit. In case you missed it, I had planned on doing the following:

- Replace my third party fonts with similar system font stacks
- Fix the Cumulative Layout Shift (CLS) issue with my navigation links
- Update links throughout the site to include trailing slashes
- Lazy load the cat pictures on the home page
- Add pagination for the cat pictures
- Try other `display` values in my site manifest

Let's see how that went!

## Switching to System Fonts

All I had to do for this was delete the `link` tag that referenced the third party fonts and update my font-stack variables to remove the references to those fonts. I already had fallback fonts in place that were reasonably similar (a designer would probably disagree about that), so I didn't need to adjust much beyond that. However, I did find that my `--sans` variable was using serif fonts, and my `--serif` variable was using sans-serif fonts. Oops! I went ahead and swapped those while I was in there.

Already this solved most of the issues flagged by Lighthouse and WebPageTest. My Lighthouse performance score went from 99 to 100, and the numbers look much better (to me) when used in certain contexts.

<img src="/images/improving-my-sites-performance/improved-fonts.png" alt="A screenshot of text demonstrating that numbers have the same height and position when arranged side-by-side." class="cmp-article__image">

## Fixing CLS in the Navigation

My old styles for the current page's link in the navigation caused a layout shift, so I had to rethink my styles a bit. I played around with adding a gradient underline using an `::after` pseudo-element, but I wasn't happy with the magic numbers necessary to line it up with the other underlines in nearby links.

After much futzing, I ended up styling the `text-decoration` to give it a pop of color and a distinct pattern to differentiate it from other links.

```css
a[aria-current='page'] {
  --underline-color: hwb(240deg 50% 0%);

  text-decoration-color: var(--underline-color);
  text-decoration-thickness: 0.125em;
  text-decoration-style: dotted;
}

@media (prefers-color-scheme: dark) {
  a[aria-current='page'] {
    --underline-color: hwb(300deg 50% 0%);
  }
}
```

Aesthetics aside, this resolved the CLS issue.

## Updating Links to Include Trailing Slashes

This was pretty basic find-and-replace work. Luckily, I only had a handful of links that would be impacted, so it was easy enough to change. I don't expect massive performance improvements, but the consistency is nice.

## Lazy Loading Images

One issue that I needed to address was lazy loading the pictures of cats on the home page. I used the same component there as I did on the [`/cats` page](/cats/), which was set up to eagerly load the first 6 images, then lazy load the rest. This meant the home page was eagerly loading those images, even though they were below the fold.

To fix this, I adjusted the component to accept another parameter to specify the threshold where lazy loading should kick in. By the way, when I say component here, I'm talking about a Nunjucks macro, not a JavaScript/React type of component, so it's all handled at build time.

```html
{% raw %}{% macro catPicture(image, index, lazyThreshold) %}
<div
  class="cmp-pictures-of-cats__cell"
  style="--aspect-ratio: {{ image.aspectRatio }}"
>
  <picture>
    <source
      srcset="/images/cats/avif/{{ image.name.replace('.jpg', '.avif') }}"
      type="image/avif"
    />
    <source
      srcset="/images/cats/webp/{{ image.name.replace('.jpg', '.webp') }}"
      type="image/webp"
    />
    <img
      src="/images/cats/{{ image.name }}"
      alt=""
      width="{{ image.width }}"
      height="{{ image.height }}"
      class="cmp-pictures-of-cats__image"
      {% if index > lazyThreshold %}loading="lazy"{% endif %}>
  </picture>
</div>
{% endmacro %}{% endraw %}
```

I updated each instance of the component to use a threshold that made sense in context—0 for the home page and 6 for the `/cats` page.

## Adding Pagination for the Pictures of Cats

This was the heaviest lift out of all the changes. I had to:

1. Refactor my Eleventy data to group images by month
2. Limit the number of images shown on the `/cats` page to 3 months at a time
3. Create a template for Eleventy to use to build individual pages for each month's pictures
4. Adjust my layout to support overriding the title and description
5. Add previous/next links to each page
6. Update the sitemap to include the dynamically generated pages

I won't go into detail about all the changes, but if you're curious, you can take a look at the [pull request where it happened](https://github.com/dustinwhisman/dustinwhisman.com/pull/101). I'm pretty happy with the results, as it addresses the last outstanding performance issue, which would only have gotten worse over time. Now I can keep adding cat pictures week after week without needing to worry about a single page getting too big.

## Trying Other Display Values

I mentioned before that I didn't think it made sense to change my site manifest's `display` value just to appease Lighthouse, and I stand by that. I tried "minimal-ui", which is the next closest value to "browser", and I couldn't stand it when I installed the deploy preview on my phone. The "minimal" UI was actually _more_ intrusive than the browser chrome, overlapping the site's footer with no way to dismiss the UI.

I already knew I didn't want "fullscreen" or "standalone", so yeah, I decided to leave it as "browser" and ignore Lighthouse on this one.

## The Final Results

Now when I run WebPageTest, the only issue that gets reported is that my `/styles.css` is a blocking resource, which I mentioned last time is fine by me. It will sometimes also complain that I'm eagerly loading too many images, but that only happens when testing for mobile, not desktop. I'm fine with this since I'm targeting my lazy loading thresholds based on the maximum number of above-the-fold images that can appear.

As for Lighthouse, it's 100s all around, no matter which page I've tested on. I also went ahead and enabled the Lighthouse integration in Netlify, so I'll at least see how the home page's performance changes on each deployment. And for what it's worth, that version gives me the green checkmark for PWA support 🤷

<img src="/images/improving-my-sites-performance/lighthouse-after.png" alt="A screenshot of Lighthouse scores, showing 100 for each category and an icon representing full PWA support." class="cmp-article__image">

This was a fun exercise, and I think the biggest takeaway for me is that no matter how good you think your site's performance is, it doesn't hurt to check every once in a while. You might find some low-hanging fruit or a lingering bug that would be way easier to fix now than when it's causing real problems down the road.

{% include 'partials/article-pagination.njk' %}
