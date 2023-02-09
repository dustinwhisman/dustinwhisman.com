const fs = require('fs');
const hljs = require('highlight.js');
const md = require('markdown-it');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

  const markdownOptions = {
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre tabindex="0"><code class="language-${lang}">${
            hljs.highlight(str, {
              language: lang,
              ignoreIllegals: true,
            }).value
          }</code></pre>`;
        } catch {
          // swallow error, fall through to default case
        }
      }

      return `<pre tabindex="0"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  };

  eleventyConfig.setLibrary('md', md(markdownOptions));

  return {
    dir: {
      input: 'src/pages',
      output: 'dist',
      includes: '../partials',
    },
    markdownTemplateEngine: 'njk',
  };
};
