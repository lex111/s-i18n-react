import { Translator } from 's-i18n-react';
import i18n_config from './s-i18n.config';
import translations from './languages/';

const t = new Translator(i18n_config, translations);

module.exports = t;
