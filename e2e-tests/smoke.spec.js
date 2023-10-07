import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
	'/',
	'/projects/',
	'/writing/',
	'/cats/',
	'/cats/2023-01',
	'/contact-me/',
	'/404.html',
	'/writing/eleventy-starter-template/',
	'/writing/eleventy-starter-template/javascript/',
	'/writing/learning-in-public/web-accessibility-specialist-certification/',
	'/writing/learning-in-public/web-accessibility-specialist-certification/wcag-guidelines/',
];

test.describe('automated accessibility checks', () => {
	pages.forEach((route) => {
		test.describe(route, () => {
			test('should not have any automatically detectable accessibility issues', async ({ page }) => {
				await page.goto(route);

				const accessibilityScanResults = await new AxeBuilder({
					page,
				}).analyze();

				expect(accessibilityScanResults.violations).toEqual([]);
			});
		});
	});
});
