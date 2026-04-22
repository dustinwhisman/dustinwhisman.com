---
title: Work - Dustin Whisman
description: A breakdown of the types of projects I've worked on and the roles within teams that I've held.
layout: default
---

# Work

I've done a lot of agency work, so I've bounced around quite a bit, tackling a variety of projects for different clients. I've acted as an individual contributor, technical lead, architect, product owner, and/or mentor for more junior developers, depending on the project. I also lead an internal effort to improve our entire team's understanding of accessibility, and I've led several capstone projects to showcase the skills that junior developers learned during their six months in our apprenticeship program.

While I've worked on a pretty broad spectrum of projects, they tend to fit into a few main categories.

## Accessibility Audits and Remediation

I haven't worked on any projects that were _only_ for accessibility audits and remediation, but I have done auditing, testing, and fixed accessibility issues on nearly every project that follows. I've also done [informal audits on my own time](/writing/accessibility-top-100/) to showcase just how bad the landscape is out there.

## CMS Migrations

I've worked on several migrations from one CMS to another (Drupal to Contentful, Drupal to Wordpress, and Expression Engine to Contentful). Each has involved some complicated work, mostly around maintaining parity from one system to another, involving the following steps:

- Data modeling, both understanding the old system and setting up the new system
- Writing scrips to convert data from the old system into the new system's format
- Building components and pages that integrate with the new system
- Migrating pages that don't conform with the new system, usually by making them static HTML pages
- Regression testing to ensure parity and no lost content or broken features

### Clients

- DocuSign
- University of Georgia
- Sparkbox

## Design Systems

I've worked on several design systems and pattern libraries, which require lots of collaboration between developers, designers, and consumers of the system. Some are React component libraries with Storybook documentation, and others are more bespoke documentation sites that demonstrate the HTML output that is required, regardless of the framework (if any) that is used. Some have used things like `style-dictionary` and Figma plugins to keep things in sync, but the translation between design and development usually involves more manual work, in my experience.

### Clients

- DocuSign
- Curriculum Associates
- Clark State College
- Mozilla Firefox

## E-Commerce

I spent a good chunk of my early career building business-to-business e-commerce sites for clients who purchased signage from our company. These were C# sites using a combination of Razor templates and Vue.js, and I was the sole front-end developer (and the closest thing to a designer) at the company, which trained me to work fast while managing to avoid bugs.

### Clients

- Rémy Martin
- Carter's Oshkosh B'Gosh
- McDonald's
- The Home Depot
- Wingstop

## Feature Development

This catch-all category covers the standard sort of development work that goes into building features and pages for websites. There has been a fair amount of cranking out React components, updating Wordpress themes and templates, and general UI development to support redesigns and new features. This also includes maintenance and refactoring work that is necessary, but not terribly exciting.

### Clients

- Tire Discounters
- Ozinga
- Johnson Electric

## Oddball Projects

While I usually work in the web, as in HTML, CSS, and JavaScript, there have been a few smaller projects that don't completely fit the pattern, such as Slack apps or APIs written in Go or Rust, or native apps for TVs. I've found that while the syntax is different, the underlying concepts are usually similar enough that I can transfer my skills without too much trouble.

The Slack integrations include a bot that sends messages to certain channels when users react to messages with certain emojis, and a bot that integrates with Forecast to send weekly messages to users about which projects they're expected to work on that week. I also worked on tvOS and Roku apps for The Described and Captioned Media Program (DCMP), updating them to work with a more performant API.

## Side Projects and Experiments

Starting projects is more fun than finishing them, so these are not all what I'd describe as complete, but I always learn from the practice of building, so they're at least not wasted effort.

- bvdget: a personal finance site for tracking your income, expenses, savings, and debt (not linking, since there's more work I'd like to do before opening it up to the public)
- [conundrum](https://conundrum.dustinwhisman.com/): a game based on the British game show, Countdown, built with Angular to learn the framework
- Various character creation sites for [home-brewed role-playing game systems](https://spacedoor.neocities.org/) my friends and I use, typically vanilla HTML, CSS, and JavaScript
- [Trivia11y](https://trivia11y.com/): a study tool for web accessibility, which I used while getting ready for my WAS certification exam
- [Visua11yze](https://github.com/dustinwhisman/visua11yze): a browser extension that introduces visual regressions to pages to visualize accessibility issues
