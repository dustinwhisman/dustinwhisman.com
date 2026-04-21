import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import pluginRSS from '@11ty/eleventy-plugin-rss';

export default function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

	const markdownOptions = {
		html: true,
		highlight: function (str) {
			return `<pre tabindex="0" role="region" aria-label="Code sample"><code>${md.utils.escapeHtml(str)}</code></pre>`;
		},
	};

	const md = markdownIt(markdownOptions).use(markdownItAnchor, {
		level: 2,
		permalink: markdownItAnchor.permalink.linkInsideHeader({
			class: 'cmp-permalink__link',
			renderAttrs: (slug) => ({ 'aria-labelledby': slug }),
			symbol: '<span aria-hidden="true">#</span>',
			placement: 'after',
		}),
	});

	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addLayoutAlias('default', 'partials/layout.njk');
	eleventyConfig.addPlugin(pluginRSS, {
		posthtmlRenderOptions: {
			closingSingleTag: 'default',
		},
	});
};

export const config = {
	dir: {
		input: 'pages',
		output: 'dist',
		includes: '../src',
	},
	markdownTemplateEngine: 'njk',
};
