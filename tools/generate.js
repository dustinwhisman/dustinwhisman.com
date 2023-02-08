const fs = require('fs');
const path = require('path');
const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const collections = {
  LEARNING_IN_PUBLIC: 'learning in public',
  WAS_CERTIFICATION: 'WAS certification',
  ELEVENTY_STARTER_TEMPLATE: 'eleventy starter template',
};

const resolveFilePath = (tags) => {
  // check for most specific, then less specific
  if (tags.includes(collections.WAS_CERTIFICATION)) {
    return path.join(
      process.cwd(),
      'src',
      'pages',
      'writing',
      'learning-in-public',
      'web-accessibility-specialist-certification',
    );
  }

  if (tags.includes(collections.LEARNING_IN_PUBLIC)) {
    return path.join(
      process.cwd(),
      'src',
      'pages',
      'writing',
      'learning-in-public',
    );
  }

  if (tags.includes(collections.ELEVENTY_STARTER_TEMPLATE)) {
    return path.join(
      process.cwd(),
      'src',
      'pages',
      'writing',
      'eleventy-starter-template',
    );
  }

  return path.join(process.cwd(), 'src', 'pages', 'writing');
};

const generate = async () => {
  const articleName = await readline.question(
    'What is the title of this article?\n',
  );
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
  console.log(`Writing to ${resolveFilePath(tags)}`);

  readline.close();
};

generate();
