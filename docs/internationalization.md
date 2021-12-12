# Translation
Confork uses [i18n](https://github.com/mashpie/i18n-node) for translating strings. The default language is `en` but you can change the configuration in `config/i18n.ts` file.

In order to translate a string, you can resolve `LocaleService` from container and use it's `translate` method:

```js
LocaleService.translate('string.path', { arg1: 'arg1.path' });
```

All translated strings exists in `src/infrastructure/locales` directory. By default, some useful translation like validation strings is ready to use in `en.json` file.

!> LocaleService can also translate validation param names, to do this, you should define translation for param names in `resources` key of translation file.
