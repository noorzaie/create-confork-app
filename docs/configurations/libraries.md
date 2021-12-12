# Configurations
`Confork` uses many `node.js` packages that you can configure them. You can access configuration files in `config` folder.

### ajv.ts
`Ajv` is a JSON validator that is used to validate API inputs. To see how you can configure it, check [ajv](https://github.com/ajv-validator/ajv) docs.

### awilix.ts
`Awilix` is a dependency injection container that is used to register project modules. You can also include your modules in `awilix.ts` file and confork automatically registers them into the container. To see how you can register modules, check [awilix](https://github.com/jeffijoe/awilix#awilix) docs.

### documentation.ts
In this file you can set main configurations of swagger docs. To see how you can configure swagger, checkout [swagger](https://swagger.io) docs.

### i18n.ts
In this file you can configure translation options. To see available options check [i18n](https://github.com/mashpie/i18n-node) docs.

### logger.ts
Confork uses `winston` logger. You can configure winston options in `logger.ts` file. To see how to configure winston, check [winston](https://github.com/winstonjs/winston) docs.

### router.ts
In this file you can set router options, either for `express` or `koa` router. Check out [express](https://expressjs.com/) or [koa-router](https://github.com/koajs/router) docs to see how you can configure them.

# Customizing folders
You can change `config` directory path by modifying [.conforkrc](configurations/conforkrc.md) file file. In this file in addition of config directory, you can change path of other directories that is used by confork.
