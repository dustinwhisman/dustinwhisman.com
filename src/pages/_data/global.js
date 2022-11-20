/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const commonAspectRatios = [
  1 / 1,
  3 / 2,
  4 / 3,
  16 / 9,
  9 / 16,
  3 / 4,
  2 / 3,
];

const closestAspectRatio = (width, height) => {
  const rawAspectRatio = width / height;
  let resultIndex = 0;
  let difference = Number.POSITIVE_INFINITY;

  commonAspectRatios.forEach((aspectRatio, index) => {
    const currentDifference = Math.abs(aspectRatio - rawAspectRatio);
    if (currentDifference < difference) {
      difference = currentDifference;
      resultIndex = index;
    }
  });

  return commonAspectRatios[resultIndex];
};

const getImagePaths = () => {
  const directoryPath = path.join(__dirname, '../../public/images/cats');
  const files = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((file) => !file.isDirectory() && file.name.endsWith('.jpg'))
    .sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }

      if (a.name > b.name) {
        return -1;
      }

      return 0;
    })
    .map((file) => {
      const STANDARD_WIDTH = 400;
      const { width, height } = sizeOf(`${directoryPath}/${file.name}`);
      const aspectRatio = closestAspectRatio(width, height);
      const adjustedHeight = STANDARD_WIDTH / aspectRatio;
      return {
        name: file.name,
        width,
        height,
        aspectRatio,
        rowSpan: Math.ceil(adjustedHeight / 10),
      };
    });

  for (let i = 0; i < files.length; i += 1) {
    const previousInColumn = files[i - 2];
    if (!previousInColumn) {
      files[i].rowStart = 1;
    } else {
      files[i].rowStart = previousInColumn.rowStart + previousInColumn.rowSpan + 2;
    }
  }

  return files;
};

const picturesOfCats = getImagePaths();
const catPictureRows = Math.max(
  ...picturesOfCats.map((picture) => picture.rowStart + picture.rowSpan),
);

const projects = [
  {
    name: 'Cash Cache',
    repoLink: 'https://github.com/dustinwhisman/cashcache',
    siteLink: 'https://cashcache.io/',
    description: 'This is how I keep track of what I spend my money on. Why use a popular budgeting app when you can build your own, right?',
    startDate: '2020-12-21',
    classification: 'Side Projects',
    roles: ['Individual Contributor'],
  },
  {
    name: 'Spacedoor!',
    repoLink: 'https://github.com/dustinwhisman/rpg-spacedoor',
    siteLink: 'https://rpg-spacedoor.netlify.app/',
    description: "A totally homebrewed RPG system for a sci-fi adventure setting. We could call this version 3, and there's very likely to be a version 4 within a year.",
    startDate: '2022-03-13',
    classification: 'Side Projects',
    roles: ['Individual Contributor'],
  },
  {
    name: 'Fellowship Availability',
    repoLink: 'https://github.com/sparkbox/team-availability',
    siteLink: 'https://fellowship-availability.netlify.app/',
    description: "One does not simply walk into Mordor without checking everyone's schedules first.",
    startDate: '2022-04-12',
    classification: 'Apprenticeship Capstone Projects',
    roles: ['Tech Lead'],
  },
  {
    name: 'Accessible Components Cheatsheet',
    repoLink: 'https://github.com/sparkbox/accessible-components',
    siteLink: 'https://accessible-components-cheatsheet.netlify.app/',
    description: 'Building things accessibly is hard, so why not make it a little easier?',
    startDate: '2022-09-29',
    classification: 'Apprenticeship Capstone Projects',
    roles: ['Tech Lead', 'Product Owner'],
  },
  {
    name: 'Eleventy Starter Template',
    repoLink: 'https://github.com/dustin-jw/eleventy-starter',
    siteLink: 'https://sparkbox.com/foundry/series/building_an_eleventy_starter_template',
    description: 'How do you set up a project for success? Using Eleventy as an example, this Foundry series explores common architectural decisions that need to be made when starting a project.',
    startDate: '2022-03-22',
    classification: 'Side Projects',
    roles: ['Individual Contributor'],
  },
  {
    name: 'Unnamed Client Project',
    description: 'Building out new versions of their home page, search features, and product/quote pages, among other things.',
    startDate: '2021-04-19',
    classification: 'Client Projects',
    roles: ['Individual Contributor', 'Tech Lead'],
  },
  {
    name: 'Mysterious UI Component Library',
    description: 'Built a handful of components for their design system, most notably the checkbox and radio group form components, as well as supporting color themes.',
    startDate: '2022-05-16',
    classification: 'Client Projects',
    roles: ['Individual Contributor', 'Tech Lead'],
  },
  {
    name: 'Secretive CMS Migration',
    description: 'Helped with the migration of thousands of pages from their old CMS, Drupal 7, to their new one, Contentful. This involved content modeling, building new components, and lots of scripting.',
    startDate: '2022-08-01',
    classification: 'Client Projects',
    roles: ['Individual Contributor', 'Feature Lead'],
  },
].sort((a, b) => {
  if (a.startDate < b.startDate) {
    return 1;
  }

  if (a.startDate > b.startDate) {
    return -1;
  }

  return 0;
});

const breakdown = projects
  .reduce((acc, project) => ({
    ...acc,
    [project.classification]: [
      ...(acc[project.classification] ?? []),
      project,
    ],
  }), {});

module.exports = {
  // generate a random string for service worker versioning, such as "36f4-1234-8c7a"
  random() {
    // eslint-disable-next-line no-bitwise
    const segment = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

    return `${segment()}-${segment()}-${segment()}`;
  },
  year() {
    return new Date().getFullYear();
  },
  recentProjects: projects.slice(0, 4),
  breakdown: Object.entries(breakdown),
  picturesOfCats: getImagePaths(),
  catPictureRows,
};
