# Generate documentation

As discussed in [Generating schemas](jsonSchema/generate.md) page, you can automatically generate JSON schemas of your database fields.

### Swagger
Confork uses these schemas in swagger schema. You can set input and output structure of your swagger documentation in `schema` field of route config.

You can also write your custom specification in `customSpecification` field of schema field. Your custom specification will be merged into final specification.

After starting your app, confork generates swagger specification according to routes schema fields in `schema` directory (`swaggerSchema.json` file).

!> You can access swagger documentation in `/api/v1/docs` path by default, or customize the path.


### Postman
`Postman` has ability to import JSON schema and makes it ready to use in postman. So, you can import `swaggerSchema.json` file using postman.
