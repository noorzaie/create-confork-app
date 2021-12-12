# Confork's configurations

When you create a confork project, all chosen options will be written into `.conforkrc` file. You can change your project's configurations by manipulating this file.

Below is the list of available configurations:

| Option  | Description |
| ------------- | ------------- |
| env | Your project environment |
| interface | Framework package name (express/koa) |
| disableSwagger | Disable swagger-ui or not |
| http | HTTP server configurations |
| db | Database configurations |
| useTypeorm | Use typeorm as ORM or not |
| useAqsTypeorm | Use aqs-typeorm package for searching database or not |
| locale | Default i18n language |
| paths | Default directory paths |

!> Confork uses `paths` config to read your custom handlers and register them automatically. You can change your project structure by modifying this field.
