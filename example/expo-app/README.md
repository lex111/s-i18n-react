# s-i18n-react demo app

This is an Expo app used to showcase the `s-i18n-react` library.

Run `npm install && npm start` to start this application.

In order to extract sentences, as configured in `s-i18n.config.js`, run the following shell command:
```shell
npm run extract-i18n
```

You can override some arguments by adding them to the command line:
```shell
npm run extract-i18n -- --languages=fr,es,de   # also generate the German (de) translation file
```

In case you're having some troubles running this application, please refer to the original
application [README file](RN-README.md).