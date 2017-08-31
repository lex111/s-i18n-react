# s-i18n Guide

s-i18n-react is a simple yet very smart internationalization library, meant
to make your life as easy as possible when it comes about translating your
React application.

### Installation

```shell
npm install --save s-i18n-react
```

### Configuration file

In order to use s-i18n-react, you will need to first configure it.
Here's a sample file for that purpose: `s-i18n.config.js`:

```js
module.exports = {
    /**
     * Supported translations
     */
    languages: ['fr', 'es'],
    /**
     * The path to be scanned when searching for messages
     */
    sourcePath: ['.'],
    /**
     * The path where language files will be generated
     */
    messagePath: './languages/',
    /**
     * The function you are using in your source code for translations
     */
    translator: 't.t',
    /**
     * Pathes to be ignored while searching for strings in sourcePath
     */
    ignorePath: ['node_modules'],
    /**
     * What to display in case you forgot to pass a required placeholder
     */
    missingPlaceholder: '⚠️',
    /**
     * Turns debug mode on and off
     */
    debug: false
};
```

### Usage

First of, you will need to import `s-i18n-react` in your script, configure it, and initialize it with 
existing translations.

```js
import { Translator } from 's-i18n-react';
import i18n_config from './s-i18n.config';
import translations from './languages/';

const t = new Translator(i18n_config, translations);
```

You are now able to translate your sentences using the `t.t()` function call:

```js
{ t.t("This sentence will be automtaically translated") }
```

That's it. You don't need to declare your sentences first in an object and point to them
using the object keys.  You simply write them in their plain form in your source code.

Now, to translate your application, you just have to run the extractor that will scan
your files and extract the sentences:

```shell
./node_modules/s-i18n-react/bin/extract --config=/path/to/s-i18n.config.js
```


### Placeholders

**Named placeholders**

```js
t("Hello {lib}", { lib: 's-i18n' });
// Outputs: Hello s-i18n
```

**Numerical placeholders**

You can also use numerical placeholders in your messages, and pass an
`array` of values.

```js
t("Load average: {0}, Uptime: {1}", [load_average, server.uptime]);
```

> Even if s-i18n-react supports numerical placeholders, we advise against using
> it, as it may be error-prone for the developer (inverting order by mistake), and confusing for the translator. Use named placeholders whenever it's possible.

**Single placeholder**

For more sugar syntax, if you only have a single placeholder in your message, you can simply pass its value directly as a second parameter.

```js
t("You are {0} years old", 42);
```

**Pluralization**

s-i18n-react supports the pluralization of your messages. No need to have a bunch of if/else in your code to get the correct form, just use the `plural` keyword in your placeholder.

```js
t("There {n,plural,0={are no cats} 1={is one cat} *={are # cats}.", {
    n: pets.length
});
// Outputs:
//   The are no cats. (when pets is empty)
//   The is one cat.  (when pets contains one element)
//   The are 42 cats. (if pets contains 42 elements)
```
