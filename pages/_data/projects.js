const projects = [
	{
		name: "Cash Cache",
		repoLink: "https://github.com/dustinwhisman/cashcache",
		siteLink: "https://cashcache.io/",
		description:
			"This is how I keep track of what I spend my money on. Why use a popular budgeting app when you can build your own, right?",
		startDate: "2020-12-21",
		classification: "Side Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "Spacedoor!",
		repoLink: "https://github.com/dustinwhisman/rpg-spacedoor",
		siteLink: "https://rpg-spacedoor.netlify.app/",
		description:
			"A totally homebrewed RPG system for a sci-fi adventure setting. We could call this version 3, and there's very likely to be a version 4 within a year.",
		startDate: "2022-03-13",
		classification: "Side Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "Fellowship Availability",
		repoLink: "https://github.com/sparkbox/team-availability",
		siteLink: "https://fellowship-availability.netlify.app/",
		description:
			"One does not simply walk into Mordor without checking everyone's schedules first.",
		startDate: "2022-04-12",
		classification: "Apprenticeship Capstone Project",
		roles: ["Tech Lead"],
	},
	{
		name: "Accessible Components Cheatsheet",
		repoLink: "https://github.com/sparkbox/accessible-components",
		siteLink: "https://accessible-components.sparkbox.com/",
		description:
			"Building things accessibly is hard, so why not make it a little easier?",
		startDate: "2022-09-29",
		classification: "Apprenticeship Capstone Project",
		roles: ["Tech Lead", "Product Owner"],
	},
	{
		name: "Eleventy Starter Template",
		repoLink: "https://github.com/dustin-jw/eleventy-starter",
		siteLink:
			"https://sparkbox.com/foundry/series/building_an_eleventy_starter_template",
		description:
			"How do you set up a project for success? Using Eleventy as an example, this Foundry series explores common architectural decisions that need to be made when starting a project.",
		startDate: "2022-03-22",
		classification: "Side Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "Automotive Retail Site",
		description:
			"Building out new versions of their home page, search features, and product/quote pages, among other things.",
		startDate: "2021-04-19",
		classification: "Client Project",
		roles: ["Individual Contributor", "Tech Lead"],
	},
	{
		name: "UI Component Library",
		description:
			"Built a handful of components for their design system, most notably the checkbox and radio group form components, as well as supporting color themes.",
		startDate: "2022-05-16",
		classification: "Client Project",
		roles: ["Individual Contributor", "Tech Lead"],
	},
	{
		name: "CMS Migration (Drupal to Contentful)",
		description:
			"Helped with the migration of thousands of pages from their old CMS, Drupal 7, to their new one, Contentful. This involved content modeling, building new components, and lots of scripting.",
		startDate: "2022-08-01",
		classification: "Client Project",
		roles: ["Individual Contributor", "Feature Lead"],
	},
	{
		name: "dustinwhisman.com",
		repoLink: "https://github.com/dustinwhisman/dustinwhisman.com",
		siteLink: "/",
		description: "Hey, that's what this is! You're looking at it right now!",
		startDate: "2022-11-12",
		classification: "Side Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "Conundrum",
		repoLink: "https://github.com/dustinwhisman/conundrum",
		siteLink: "https://conundrum.dustinwhisman.com",
		description:
			"A set of letters and numbers games following a well-established quiz show format. Mostly an excuse to learn Angular.",
		startDate: "2023-02-10",
		classification: "Side Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "Trivia11y",
		repoLink: "https://github.com/sparkbox/trivia11y",
		siteLink: "https://trivia11y.com",
		description:
			"A trivia game for testing and improving your web accessibility knowledge.",
		startDate: "2023-04-10",
		classification: "Side Project",
		roles: ["Product Owner", "Individual Contributer"],
	},
	{
		name: "CMS Migration (Expression Engine to Contentful)",
		description:
			"Wrote migration scripts, React components, and GraphQL queries to assist in the migration of an Expression Engine site to a Contentful/Next.js site.",
		startDate: "2023-04-11",
		classification: "Internal Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "CMS Migration (Drupal to WordPress)",
		description:
			"Led the replatforming of a university website from Drupal 7 to WordPress. This included building out the theme as well as automated content migrations from their old system.",
		startDate: "2023-06-28",
		classification: "Client Project",
		roles: ["Tech Lead", "Individual Contributor"],
	},
	{
		name: "Sparkpress",
		repoLink: "https://github.com/sparkbox/sparkpress-wordpress-starter",
		description:
			"Updating this WordPress starter template to be as easy as possible for developers to use when setting up new WordPress projects.",
		startDate: "2023-09-12",
		classification: "Open Source Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "tvOS and Roku App Updates",
		description:
			"Updating an educational organization's tvOS and Roku apps for streaming captioned and described videos. This started with API updates, but shifted to fixing usability and accessibility issues.",
		startDate: "2023-12-10",
		classification: "Client Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "bvdget",
		repoLink: "https://github.com/dustinwhisman/bvdget",
		siteLink: "https://bvdget.com",
		description:
			"A money tracking app that I'm gradually building up to supplant my insane financial spreadsheets. Other people could use it too, I guess.",
		startDate: "2023-12-21",
		classification: "Side Project",
		roles: ["Product Owner", "Individual Contributor"],
	},
	{
		name: "WordPress Navigation and Patterns Updates",
		description:
			"A client needed to build a sustainability page, but wanted it to stand out from the rest of their site, so we developed flexible patterns for it and redesigned/reorganized their navigation to make room for a new top-level link.",
		startDate: "2024-04-01",
		classification: "Client Project",
		roles: ["Tech Lead", "Individual Contributor"],
	},
	{
		name: "Product Search Page",
		description:
			"A client selling specialized parts needed a custom search/filtering page so their highly technical customers could find parts that matched a variety of characteristics.",
		startDate: "2024-06-01",
		classification: "Client Project",
		roles: ["Tech Lead", "Individual Contributor"],
	},
	{
		name: "Visua11yze",
		repoLink: "https://github.com/dustinwhisman/visua11yze",
		description:
			"A browser extension to highlight accessibility issues using mostly CSS and a little bit of JavaScript.",
		startDate: "2024-06-14",
		classification: "Side Project",
		roles: ["Individual Contributor"],
	},
	{
		name: "Design System",
		description:
			"As much as I don't like working with React and Storybook, there were some interesting problems (composable themes, anchor positioning, popovers! and live code demos) to solve for this, frankly weird, design system.",
		startDate: "2024-07-01",
		classification: "Client Project",
		roles: ["Individual Contributor"],
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

export default {
	projects,
	recentProjects: projects.slice(0, 4),
};
