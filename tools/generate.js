const fs = require('fs');
const path = require('path');
const prompts = require('prompts');

const today = () => {
	const date = new Date();
	date.setUTCHours(0, 0, 0, 0);
	return date.toISOString();
};

const collections = {
	LEARNING_IN_PUBLIC: 'learning in public',
	WAS_CERTIFICATION: 'WAS certification',
	CPACC_CERTIFICATION: 'CPACC certification',
	ELEVENTY_STARTER_TEMPLATE: 'eleventy starter template',
	ACCESSIBILITY_TOP_100: 'accessibility top 100',
	NONE: 'none',
};

const templates = {
	[collections.LEARNING_IN_PUBLIC]: (title, description) => `---
title: "${title} - Writing - Dustin Whisman"
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
	[collections.WAS_CERTIFICATION]: (title, description) => `---
title: "${title} - WAS Notes - Writing - Dustin Whisman"
description: "${description}"
articleTitle: "${title}"
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
	[collections.CPACC_CERTIFICATION]: (title, description) => `---
title: "${title} - CPACC Notes - Writing - Dustin Whisman"
description: "${description}"
articleTitle: "${title}"
layout: default
date: ${today()}
tags:
  - writing
  - CPACC certification
---

# CPACC Notes: ${title}

_I'm studying for the CPACC certification. These are some of the notes I've taken recently._

{% include 'partials/published-date.njk' %}
`,
	[collections.ELEVENTY_STARTER_TEMPLATE]: (title, description) => `---
title: "${title} - Writing - Dustin Whisman"
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
	[collections.ACCESSIBILITY_TOP_100]: (title, description) => `---
title: "${title} - Accessibility of the Top 100 Sites - Writing - Dustin Whisman"
description: "How accessible is ${title}? This is part ${description} of a series evaluating the accessibility of the top 100 websites in the US."
articleTitle: "Accessibility of the Top 100: ${title}"
layout: default
date: ${today()}
tags:
  - writing
  - accessibility top 100
---

# Part ${description}: ${title}

_I'm evaluating the accessibility of the top 100 websites in the US. This time I'll be taking a look at ${title}. Read the [methodology description](/writing/accessibility-top-100/methodology) to learn about my process._

{% include 'partials/published-date.njk' %}
`,
	DEFAULT: (title, description) => `---
title: "${title} - Writing - Dustin Whisman"
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

const resolveFilePath = (collection, slug) => {
	switch (collection) {
		case collections.WAS_CERTIFICATION:
			return path.join(
				process.cwd(),
				'pages',
				'writing',
				'web-accessibility-specialist-certification',
				`${slug}.md`
			);
		case collections.CPACC_CERTIFICATION:
			return path.join(
				process.cwd(),
				'pages',
				'writing',
				'certified-professional-in-accessibility-core-competencies-certification',
				`${slug}.md`
			);
		case collections.LEARNING_IN_PUBLIC:
			return path.join(process.cwd(), 'pages', 'writing', 'learning-in-public', `${slug}.md`);
		case collections.ELEVENTY_STARTER_TEMPLATE:
			return path.join(process.cwd(), 'pages', 'writing', 'eleventy-starter-template', `${slug}.md`);
		case collections.ACCESSIBILITY_TOP_100:
			return path.join(process.cwd(), 'pages', 'writing', 'accessibility-top-100', `${slug}.md`);
		default:
			return path.join(process.cwd(), 'pages', 'writing', `${slug}.md`);
	}
};

const formatSlug = (title) => {
	return title
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]/g, '-')
		.replaceAll('--', '-');
};

const resolveTemplate = (collection, title, description) => {
	return templates[collection]?.(title, description) ?? templates.DEFAULT(title, description);
};

const getDetails = async () => {
	const questions = [
		{
			type: 'text',
			name: 'title',
			message: 'What should be the title of this article?',
		},
		{
			type: 'text',
			name: 'description',
			message:
				'What should be the description for this article? Or part number if part of the top 100 series?',
		},
		{
			type: 'select',
			name: 'collection',
			message: 'Which collection should this article belong to?',
			instructions: false,
			choices: Object.entries(collections).map(([, value]) => ({
				title: value,
				value,
			})),
		},
	];

	const response = await prompts(questions);

	return response;
};

const generate = async () => {
	const { title, description, collection } = await getDetails();
	const slug = formatSlug(title);

	console.log('Thank you! Creating a new empty post for you now.');

	const template = resolveTemplate(collection, title, description);
	const file = resolveFilePath(collection, slug);

	fs.writeFileSync(file, template, { encoding: 'utf-8' });

	console.log(`Written to ${file}`);
};

generate();
