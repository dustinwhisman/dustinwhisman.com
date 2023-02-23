const fs = require('fs');
const path = require('path');
const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const today = () => {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
};

const collections = {
  LEARNING_IN_PUBLIC: 'learning in public',
  WAS_CERTIFICATION: 'WAS certification',
  ELEVENTY_STARTER_TEMPLATE: 'eleventy starter template',
};

const templates = {
  LEARNING_IN_PUBLIC: (title, description) => `---
title: "${title} | Writing | Dustin Whisman"
description: "${description}"
articleTitle: "${title}"
layout: default
date: ${today()}
tags:
  - writing
  - learning in public
---

# ${title}

{% include 'partials/published-date.njk' %}
`,
  WAS_CERTIFICATION: (title, description) => `---
title: "WAS Notes: ${title} | Writing | Dustin Whisman"
description: "${description}"
articleTitle: "WAS Notes: ${title}"
layout: default
date: ${today()}
tags:
  - writing
  - WAS certification
---

# WAS Notes: ${title}

_I'm studying for the WAS certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}
`,
  ELEVENTY_STARTER_TEMPLATE: (title, description) => `---
title: "${title} | Writing | Dustin Whisman"
description: "${description}"
articleTitle: "${title}"
layout: default
date: ${today()}
tags:
  - writing
  - eleventy starter template
---

# ${title}

{% include 'partials/published-date.njk' %}
`,
  DEFAULT: (title, description) => `---
title: "${title} | Writing | Dustin Whisman"
description: "${description}"
articleTitle: "${title}"
layout: default
date: ${today()}
tags:
  - writing
---

# ${title}

{% include 'partials/published-date.njk' %}
`,
};

const resolveFilePath = (tags, slug) => {
  if (tags.includes(collections.WAS_CERTIFICATION)) {
    return path.join(
      process.cwd(),
      'src',
      'pages',
      'writing',
      'web-accessibility-specialist-certification',
      `${slug}.md`,
    );
  }

  if (tags.includes(collections.LEARNING_IN_PUBLIC)) {
    return path.join(
      process.cwd(),
      'src',
      'pages',
      'writing',
      'learning-in-public',
      `${slug}.md`,
    );
  }

  if (tags.includes(collections.ELEVENTY_STARTER_TEMPLATE)) {
    return path.join(
      process.cwd(),
      'src',
      'pages',
      'writing',
      'eleventy-starter-template',
      `${slug}.md`,
    );
  }

  return path.join(process.cwd(), 'src', 'pages', 'writing', `${slug}.md`);
};

const formatSlug = (title) => {
  return title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
};

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

generate();
