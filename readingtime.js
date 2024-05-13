module.exports = (eleventyConfig, options) => {
  const defaultOptions = {
    wordsPerMinute: 200,
    suffixDisplay: true,
    suffixText: 'min',
    prefixDisplay: true,
    prefixText: '~',
    verbose: false
  };
  options = Object.assign(defaultOptions, options);
  const PREFIX = "Eleventy-Plugin-Readingtime";
  const LOG_PREFIX = `[\x1b[32m${PREFIX}\x1b[0m]`;

  let totalReadingTime = 0;
  let totalPosts = 0;

  eleventyConfig.addFilter('readingtime', (post) => {
    let html = post.content || post.templateContent || post;
    let readingtime = 0;
    
    if (typeof html === 'string' && html != '') {
      let content = html.replace(/<[^>]*>/g, '');
      readingtime = Math.round(content.split(' ').length / options.wordsPerMinute);
    }

    totalReadingTime += readingtime;
    totalPosts++;

    let pd = options.prefixDisplay;
    let pt = options.prefixText;
    if (readingtime < 1) {
      pd = true;
      pt = '< ';
      readingtime = 1;
    }

    return (pd ? pt : '') + readingtime + (options.suffixDisplay ? options.suffixText : '');
  });

  eleventyConfig.on(
    'eleventy.after',
    async ({}) => {
      if (options.verbose) {
        console.log(LOG_PREFIX, 'Total posts calculated:', totalPosts);
        console.log(LOG_PREFIX, 'Total reading time:', totalReadingTime, 'minutes');
      }
    }
  )
}