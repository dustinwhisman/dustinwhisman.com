const fs = require('fs');
const hljs = require('highlight.js');
const md = require('markdown-it');

module.exports = function (eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content_404 = fs.readFileSync('dist/404/index.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          res.writeHead(404);
          res.end();
        });
      },
    },
    files: ['dist/**/*'],
  });

  eleventyConfig.addWatchTarget('./src/scss/');
  eleventyConfig.addWatchTarget('./src/js/');

  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });

  const markdownOptions = {
    html: true,
    highlight: function(str, lang) {
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
    }
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
