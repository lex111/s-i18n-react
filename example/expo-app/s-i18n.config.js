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
    messagePath: 'languages/',
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