import React, { Component } from 'react';
import { View, Text } from 'react-native';

/**
 * Translator class
 */
class Translator {

  /**
   * Initialiazes the Translator
   *
   * @param {Object} config
   * @param {Object} translations
   */
  constructor(config, translations) {
    this.config = config;
    this.translations = translations;
  }

  /**
   * Translates a message
   * 
   * @param {*} message 
   * @param {*} data 
   */
  t(message, data = {}) {

    if (typeof message !== 'string') {
      return this.error('Wrong usage of translate()');
    }

    // Used for an app creator to verify that he didn't forget some hardcoded text
    if (this.config.debug) {
      return this.debugMode(message);
    }

    // If a single string or number is passed, convert it to an array
    // We're expecting a single numerical placeholder
    if (typeof data === 'string' || typeof data === 'number') {
      data = [data];
    }

    if (
      typeof this.translations[this.activeLanguage] !== 'undefined' && 
      typeof this.translations[this.activeLanguage][message] !== 'undefined' && 
      this.translations[this.activeLanguage][message] !== ''
    ) {
      message = this.translations[this.activeLanguage][message];
    }

    // Substiture plurals
    message = this.pluralize(message, data);

    // Placeholders detection pa
    const placeholdersReg = /({([^}]+)})/g;

    let retval = [];

    let ongoing = '';
    let match = false;
    let lastIndex = 0;

    while (match = placeholdersReg.exec(message)) {
      ongoing += message.substring(lastIndex, match.index);
      if (typeof data[match[2]] === 'undefined') {
        ongoing += this.config.missingPlaceholder;
      } else if (typeof data[match[2]] === 'object') {
        retval.push(React.createElement(Text, null, ongoing));
        retval.push(data[match[2]]);
        ongoing = '';
      } else if (typeof data[match[2]] === 'string') {
        ongoing += data[match[2]];
      }
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < message.length) {
      ongoing += message.substring(lastIndex);
    }

    if (ongoing.length) {
      retval.push(React.createElement(Text, null, ongoing));
      // retval.push(ongoing);
    }

    if (retval.length === 1) {
      return retval[0];
    }

    // console.log(retval);

    return (<View style={{flexDirection: 'row'}}>{retval}</View>);
  }

  /**
   * Sets the active language
   *
   * @param {string} language The language code
   */
  setLanguage(language) {
    if (typeof this.translations[language] === 'object') {
      this.activeLanguage = language;
      return true;
    } else {
      this.setOriginalLanguage();
      return false;
    }
  }

  /**
   * Sets the original language as active
   */
  setOriginalLanguage() {
    this.activeLanguage = null;
  }

  /**
   * Sets the active translations
   *
   * @param {Object} translations
   */
  setTranslations(translations) {
    this.translations = translations;
  }

  /**
   * Substitutes the message with symbols
   *
   * @param {String} message
   */
  debugMode(message) {
    return (<Text>{'-'.repeat(message.length)}</Text>);
  }

  /**
   * Formats an error message to be returned instead of the translation
   *
   * @todo Add a console warning ? an exception ?
   * @param {String} message The error message
   */
  error(message) {
    return `⁉️ ${message}`;
  }

  /**
   * Checks and substitute plural in a message
   *
   * @todo Error handling
   * @todo Multiple plural patterns
   * @todo Would checking message.indexOf('plural') before anything speed up things? benchmark
   *
   * @param {String} message The translated message
   * @param {*} data The bound data
   */
  pluralize(message, data) {

    let plural = false;

    if (plural = message.match(/{(\w),plural,(.*?)}}/)) {
      let quantity = plural[1];
      let chunks = plural[2].split(/=(\d|\*){/);
      let pos = chunks.indexOf('' + data[quantity]);

      if (pos === -1) {
        pos = chunks.indexOf('*');
        message = message.replace(plural[0], chunks[pos + 1].replace('#', data[quantity]));
      } else {
        message = message.replace(plural[0], chunks[pos + 1].replace(/}\s*$/, ''));
      }
    }

    return message;
  }

}

export default Translator;
