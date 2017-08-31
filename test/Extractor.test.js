import {default as Extractor} from './../src/Extractor';

import i18n_config from './s-i18n.config';

const ex = new Extractor(i18n_config);

test('it runs', () => {
  expect(ex.extractMessages()).toBe(true);
});

test('it extracts all messages', () => {
  let messages = ex.extractFromSource();
  expect(messages).toEqual({
    "Extract me": "",
    "I'm using a named {placeholder}": "",
    "I'm using two numerical {0} {1}": "",
    "I'm using a {0} numerical placeholder": "",
    "hello {user}": "",
    "You don't know me": "",
    "I'm known, but untranslated": "",
    "simple sentence": "",
    "{placeholder} at start": "",
    "Placeholder {at} middle": "",
    "Placeholder in the {end}": "",
    "This uses a {💩} as a placeholder": "",
    "Two {consecutive} {placeholders}!": "",
    "Same {placeholder} {placeholder}": "",
    "This {0} is {1}": "",
    "This {1} is {0}": "",
    "This will {0} well!": "",
    "Warn about {missing} placeholder": ""
  });
});

test('it keeps translated messages', () => {
  const fr = require('./i18n/fr.js');
  expect(fr['Extract me']).toBe('Extrais moi');
});

test('it keeps obsolete messages', () => {
  const fr = require('./i18n/fr.js');
  expect(fr['unused']).toBe('@obsolete@');
});