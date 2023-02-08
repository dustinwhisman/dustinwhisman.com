const fs = require('fs');
const path = require('path');
const readline = require('readline/promises').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const collections = [
  'learning in public',
  'WAS certification',
  'eleventy starter template',
];

const generate = async () => {
  const articleName = await readline.question(
    'What is the title of this article?\n',
  );
  const description = await readline.question(
    'What is the description for this article?\n',
  );
  const tags = [];
  for (let i = 0; i < collections.length; i += 1) {
    const includeInTags = await readline.question(
      `Should this go in the ${collections[i]} collection? y/N?\n`,
    );
    if (includeInTags.toLowerCase() === 'y') {
      tags.push(collections[i]);
    }
  }

  console.log('Thank you! Creating a new empty post for you now.');

  readline.close();
};

generate();
