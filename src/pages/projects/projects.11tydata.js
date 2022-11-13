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
    description: 'Building out new versions of their home page, search features, product, and quote pages, among other things.',
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
];

const breakdown = projects.sort((a, b) => {
  if (a.startDate < b.startDate) {
    return 1;
  }

  if (a.startDate > b.startDate) {
    return -1;
  }

  return 0;
})
  .reduce((acc, project) => ({
    ...acc,
    [project.classification]: [
      ...(acc[project.classification] ?? []),
      project,
    ],
  }), {});

module.exports = {
  projects: projects.sort((a, b) => {
    if (a.startDate < b.startDate) {
      return 1;
    }

    if (a.startDate > b.startDate) {
      return -1;
    }

    return 0;
  }),
  breakdown: Object.entries(breakdown),
};
