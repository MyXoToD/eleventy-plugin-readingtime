module.exports = class Readingtime {
  post = '';
  options = {};
  eleventyConfig = null;
  defaultOptions = {
    wordsPerMinute: 200,
    suffixDisplay: true,
    suffixText: 'min',
    prefixDisplay: true,
    prefixText: '~',
    verbose: false
  };
  pluginName = 'Eleventy-Plugin-Readingtime';
  logPrefix = `[\x1b[32m${this.pluginName}\x1b[0m]`;

  constructor(post, options = {}) {
    this.post = post;
    this.options = options;
    this.initOptions();

    this.log('Parsing reading time of post.');
  }

  log(message) {
    if (this.options.verbose) {
      console.log(this.logPrefix, message);
    }
  }

  initOptions() {
    this.options = Object.assign({}, this.defaultOptions, this.options);
  }

  getTimeRaw() {
    let html = this.post.content || this.post.templateContent || this.post;
    let readingtime = 0;
    
    if (typeof html === 'string' && html != '') {
      let content = html.replace(/<[^>]*>/g, '');
      readingtime = Math.round(content.split(' ').length / this.options.wordsPerMinute);
    }

    return readingtime;
  }

  getTime() {
    let readingtime = this.getTimeRaw();

    this.totalReadingTime += readingtime;
    this.totalPosts++;

    let pd = this.options.prefixDisplay;
    let pt = this.options.prefixText;
    if (readingtime < 1) {
      pd = true;
      pt = '&lt; ';
      readingtime = 1;
    }

    return (pd ? pt : '') + readingtime + (this.options.suffixDisplay ? this.options.suffixText : '');
  }
}
