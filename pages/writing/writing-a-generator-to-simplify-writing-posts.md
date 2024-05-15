---
title: "Writing a Generator to Simplify Writing Posts - Writing - Dustin Whisman"
description: "Rather than copy-paste an old article and update it, which is what I have been doing, I decided to write a generator to do most of that work for me."
articleTitle: "Writing a Generator to Simplify Writing Posts"
layout: default
date: 2023-02-08T00:00:00.000Z
tags:
  - writing
---

# Writing a Generator to Simplify Writing Posts

{% include 'partials/published-date.njk' %}

I recently started learning Angular for a new client project I'll be working on soon, and the Angular CLI makes great use of generators to speed up creating new components and such. Inspired, I figured I would try my hand at writing some generators for my own site.

## The Old Process

Typically, this process is what I would do whenever I wanted to post something on my site. I would:

1. Copy and paste an existing article
2. Rename the file with the slug that I wanted
3. Update the front matter, including title, description, and the current date
4. Update the `h1` heading and delete the body of the post
5. Start writing the thing

How hard could it be to replace most of that work with a generator script?

## Establishing Requirements

For this new generator to be worth it, it needed to be simple yet flexible enough to support some different variations. For example, I use tags to organize articles, but I also put articles in different folders representing the URL structure. So, if I set the `learning in public` tag, the new file needs to be written to the `pages/writing/learning-in-public` folder.

I also didn't want to specify title, description, and tags through command line arguments or flags, since that would be cumbersome and error-prone. Prompts seem like a better option there, allowing me to default to empty strings or "no" if I just hit "enter".

I also didn't want to introduce any more dependencies to the project, so I'll be using only Node.js modules.

## Outlining the Approach

Here's the basic flow of what I wanted the script to do.

- ask what to use for the title
- ask what to use for the description
- ask which tags to apply to the article
- create the template data to be written to the file
- determine where to write the file
- write the file

### Asking Questions

I used Node's `readline` module for the prompts, since it seemed easy enough to write and supported my use case well enough. I used the `readline/promises` variation so I could use `async`/`await`.

```js
const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generate = async () => {
  const title = await readline.question('What is the title of this article?\n');
  const description = await readline.question('What is the description for this article?\n');

  readline.close();
};
```

For the tags, I considered allowing free-form input, but then I'd have to add in some string-splitting logic, and I'd have to worry about typos causing havoc. Instead, I decided to loop over a list of known tags, letting the user opt-in `y/N` style for each one.

```js
const collections = {
  LEARNING_IN_PUBLIC: 'learning in public',
  WAS_CERTIFICATION: 'WAS certification',
  ELEVENTY_STARTER_TEMPLATE: 'eleventy starter template',
};

// ...later
const tags = [];
for (const [, collection] of Object.entries(collections)) {
  const includeInTags = await readline.question(
    `Should this go in the ${collection} collection? y/N?\n`,
  );
  if (includeInTags.toLowerCase() === 'y') {
    tags.push(collection);
  }
}
```

The main trade-off for this approach is that whenever I add a new collection, I'll need to update that list, but I'll likely be updating plenty of other things in that scenario, so I'm okay with it.

### Writing the Templates

There are enough minor differences between templates that I decided it would be easier to treat them all as separate things instead of trying to account for every possible variation in one function. I created a template object where each type has a function that returns the string of what to write to the file.

For the date, I wrote a small utility function to format the current date like `2023-02-08T00:00:00.000Z`. A lot of my existing posts use shorter dates like `2023-02-08`, but having the time included doesn't hurt anything, and it makes it easier to establish chronological order if I post multiple things on the same day (it's been known to happen).

```js
const today = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

const templates = {
  LEARNING_IN_PUBLIC: (title, description) => `...stuff`,
  WAS_CERTIFICATION: (title, description) => `...stuff`,
  ELEVENTY_STARTER_TEMPLATE: (title, description) => `...stuff`,
  DEFAULT: (title, description) => `---
title: "${title} - Writing - Dustin Whisman"
description: "${description}"
articleTitle: "${title}"
layout: layout.njk
date: ${today()}
tags:
  - writing
---

# ${title}

{% raw %}{% include 'published-date.njk' %}{% endraw %}
`,
};
```

With that object set up, I can use it in conjunction with the tags I opted into using to figure out which template to use.

```js
const resolveTemplate = (tags, title, description) => {
  if (tags.includes(collections.WAS_CERTIFICATION)) {
    return templates.WAS_CERTIFICATION(title, description);
  }

  if (tags.includes(collections.LEARNING_IN_PUBLIC)) {
    return templates.LEARNING_IN_PUBLIC(title, description);
  }

  if (tags.includes(collections.ELEVENTY_STARTER_TEMPLATE)) {
    return templates.ELEVENTY_STARTER_TEMPLATE(title, description);
  }

  return templates.DEFAULT(title, description);
};
```

Note that I start with the most specific tags first, then move down to the default case, which would be used if I didn't specify any tags.

### Figuring Out the File Path and Writing the File

With a pattern already in place based on tags, I ended up doing basically the same thing to return the path to where I wanted the file to be written.

```js
const resolveFilePath = (tags, slug) => {
  if (tags.includes(collections.WAS_CERTIFICATION)) {
    return path.join(process.cwd(), 'src', 'pages', 'writing', 'learning-in-public' 'web-accessibility-specialist-certification', `${slug}.md`);
  }

  if (tags.includes(collections.LEARNING_IN_PUBLIC)) {
    return path.join(process.cwd(), 'src', 'pages', 'writing', 'learning-in-public', `${slug}.md`);
  }

  if (tags.includes(collections.ELEVENTY_STARTER_TEMPLATE)) {
    return path.join(process.cwd(), 'src', 'pages', 'writing', 'eleventy-starter-template', `${slug}.md`);
  }

  return path.join(process.cwd(), 'src', 'pages', 'writing', `${slug}.md`);
};
```

Provided I have a template and a file path, all that's left to do is write the file!

```js
fs.writeFileSync(file, template, { encoding: 'utf-8' });
```

## Putting It All Together

In the end, here's the core of the generator to create empty articles. The only part I haven't mentioned so far is using the title to create the slug, which is done by kebab-casing the title.

```js
const formatSlug = (title) => {
  return title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
};

const generate = async () => {
  const title = await readline.question('What is the title of this article?\n');
  const slug = formatSlug(title);

  const description = await readline.question(
    'What is the description for this article?\n',
  );

  const tags = [];
  for (const [, collection] of Object.entries(collections)) {
    const includeInTags = await readline.question(
      `Should this go in the ${collection} collection? y/N?\n`,
    );
    if (includeInTags.toLowerCase() === 'y') {
      tags.push(collection);
    }
  }

  console.log('Thank you! Creating a new empty post for you now.');

  const template = resolveTemplate(tags, title, description);
  const file = resolveFilePath(tags, slug);

  fs.writeFileSync(file, template, { encoding: 'utf-8' });

  console.log(`Written to ${resolveFilePath(tags, slug)}`);

  readline.close();
};
```

I also added an npm script called "generate" that runs `node ./tools/generate`, since I prefer npm scripts over remembering the file path of scripts I've written. Now all I need to do to start writing a new article/post is type `npm run generate` and answer a few questions.

In fact, this very article was created using the script!

{% include 'partials/article-pagination.njk' %}
