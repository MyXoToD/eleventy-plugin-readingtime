# eleventy-plugin-readingtime

A lightweight eleventy plugin to display page/post reading time in minutes. No dependencies.

## Usage

Install this package

```sh
npm i eleventy-plugin-readingtime
```

Add and register it inside your `.eleventy.js` config file

```js
// .eleventy.js
const readingtime = require("eleventy-plugin-readingtime");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(readingtime);
};
```

Finally use it in your code with the `readingtime`-filter

```html
<div>Reading time: {{ post | readingtime }}</div>
```

Example output

```html
<div>Reading time: ~3min</div>
```

You will have to pass the whole post or page to the filter as shown above.

## Options

You can pass several options when adding the plugin in your eleventy config file like so:

```js
eleventyConfig.addPlugin(readingtime, {
  wordsPerMinute: 200,
  suffixDisplay: true,
  suffixText: 'min',
  prefixDisplay: true,
  prefixText: '~',
  verbose: false
});
```

| Option | Default | Description |
|--------|---------|-------------|
|`wordsPerMinute`|`200`|Average number of words read per minute (higher values result in faster reading times)|
|`suffixDisplay`|`true`|Show or hide the suffix|
|`suffixText`|`'min'`|The suffix to be shown|
|`prefixDisplay`|`true`|Show or hide the prefix|
|`prefixText`|`'~'`|The prefix to be shown|
|`verbose`|`false`|Output additional data to your terminal when an eleventy build happens|

## License

[MIT](https://github.com/MyXoToD/eleventy-plugin-readingtime/blob/main/LICENSE) @ [Maximilian Boll](https://www.makkusu.dev)