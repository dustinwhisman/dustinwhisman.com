const hljs = require('highlight.js');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

	const markdownOptions = {
		html: true,
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return `<pre tabindex="0" role="region" aria-label="Code sample"><code class="language-${lang}">${
						hljs.highlight(str, {
							language: lang,
							ignoreIllegals: true,
						}).value
					}</code></pre>`;
				} catch {
					// swallow error, fall through to default case
				}
			}

			return `<pre tabindex="0" role="region" aria-label="Code sample"><code>${md.utils.escapeHtml(str)}</code></pre>`;
		},
	};

	const md = markdownIt(markdownOptions).use(markdownItAttrs, {
		allowedAttributes: ['id'],
	});

	eleventyConfig.setLibrary('md', md);
	eleventyConfig.addLayoutAlias('default', 'partials/layout.njk');

	return {
		dir: {
			input: 'pages',
			output: 'dist',
			includes: '../src',
		},
		markdownTemplateEngine: 'njk',
	};
};
