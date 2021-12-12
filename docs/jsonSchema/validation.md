# Validation
Confork uses [Ajv](https://github.com/ajv-validator/ajv) for validating request body. You can enable validation on a route by configuring `schema` field of route config.

Confork automatically creates ajv validator using `schema` field of route and validates request's body. In case of validation error, an error with status `400` and following structure will be returned:

```js
const errors = {
    field1: [
        'error 1',
        'error 2',
        // ...    
    ],
    field2: [
        'error 1',
        'error 2',
        // ...
    ],
    // ...
};
```

!> You can modify default ajv options in `config/ajv.ts` file.
