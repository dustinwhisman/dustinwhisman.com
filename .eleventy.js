const hljs = require('highlight.js');
const md = require('markdown-it');

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

  eleventyConfig.setLibrary('md', md(markdownOptions));
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
