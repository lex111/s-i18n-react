import React, { Component } from 'react';
import { View, Text } from 'react-native';

import i18n_config from './s-i18n.config';
import translations from './i18n/';

const Translator = require('./../src/Translator.js').default;

const t = new Translator(i18n_config, translations);

t.setLanguage('fr');

/*
test('Unknown message returns itself', () => {
  expect(t.t("You don't know me")).toBe('You don\'t know me');
});

test('Empty translation returns original message', () => {
  expect(t.t("I'm known, but untranslated")).toBe('I\'m known, but untranslated');
});*/

function wrapInText(foo) {
  return (<Text>{foo}</Text>);
}


test('Supports basic translation', () => {
  expect(t.t("Extract me")).toEqual(wrapInText("Extrais moi"));
});

test('Supports translation with a placeholder', () => {
  expect(t.t("hello {user}", { user: 'Mehdi' })).toEqual(wrapInText("bonjour Mehdi"));
});

it('Supports no placeholders', () => {
  const received = t.t("simple sentence");
  expect(received).toEqual(wrapInText("simple sentence"));
});

it('Supports placeholder at start', () => {
  const received = t.t("{placeholder} at start", {
    placeholder: "foo"
  });
  expect(received).toEqual(wrapInText("foo at start"));
});

it('Supports placeholder at middle', () => {
  const received = t.t("Placeholder {at} middle", {
    at: "@"
  });
  expect(received).toEqual(wrapInText("Placeholder @ middle"));
});

it('Supports placeholder in the end', () => {
  const received = t.t("Placeholder in the {end}", {
    end: "bar"
  });
  expect(received).toEqual(wrapInText("Placeholder in the bar"));
});

it('Supports emoji as placeholder', () => {
  const received = t.t("This uses a {💩} as a placeholder", {
    "💩": "pile of poo"
  });
  expect(received).toEqual(wrapInText("This uses a pile of poo as a placeholder"));
});

it('Supports two consecutives placeholders!', () => {
  const received = t.t("Two {consecutive} {placeholders}!", {
    consecutive: "foo",
    placeholders: "bar"
  });
  expect(received).toEqual(wrapInText("Two foo bar!"));
});

it('Supports a placeholder used twice', () => {
  const received = t.t("Same {placeholder} {placeholder}", {
    placeholder: "bar"
  });
  expect(received).toEqual(wrapInText("Same bar bar"));
});

it('Supports plurals placeholders', () => {
  const str = "There {n,plural,=0{are no dogs} =1{is one dog} =*{are # dogs}}!";
  expect(t.t(str, { n: 0 })).toEqual(wrapInText("There are no dogs!"));
  expect(t.t(str, { n: 1 })).toEqual(wrapInText("There is one dog!"));
  expect(t.t(str, { n: 42 })).toEqual(wrapInText("There are 42 dogs!"));
});

it('Supports numerical placeholders', () => {
  const received = t.t("This {0} is {1}", ["foo", "bar"]);
  expect(received).toEqual(wrapInText("This foo is bar"));
  expect(t.t("This {1} is {0}", ["foo", "bar"])).toEqual(wrapInText("This bar is foo"));
});

it('Supports reversed numerical placeholders', () => {
  const received = t.t("This {1} is {0}", ["foo", "bar"]);
  expect(received).toEqual(wrapInText("This bar is foo"));
});

it('Supports one numerical placeholder as a string', () => {
  const received = t.t("This will {0} well!", "work");
  expect(received).toEqual(wrapInText("This will work well!"));
});

it('Warns about missing placeholder', () => {
  const received = t.t("Warn about {missing} placeholder");
  expect(received).toEqual(wrapInText("Warn about ⚠️ placeholder"));
});