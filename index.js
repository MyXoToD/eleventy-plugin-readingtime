const readingtime = require('./src/readingtime');
let totalReadingTime = 0;

module.exports = (eleventyConfig, options) => {
  eleventyConfig.addFilter('readingtime', (content) => {
    const r = new readingtime(content, options);
    totalReadingTime += r.getTimeRaw();
    return r.getTime();
  });

  eleventyConfig.on(
    'eleventy.after',
    async ({}) => {
      if (options.verbose) {
        console.log(`[\x1b[32mEleventy-Plugin-Readingtime\x1b[0m]`, 'Total reading time: ' + totalReadingTime + ' minutes');
      }
    }
  );
}