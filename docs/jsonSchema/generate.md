# JSON schema
[JSON schema](https://json-schema.org/) is a vocabulary that allows you to annotate and validate JSON documents and can be used in several aspects of restful APIs. For example you can define `ajv` validation schemas or `swagger` schemas using JSON schema language.

## Generating JSON schema
In most cases, you map your database tables to validation and swagger schemas. By using confork, you can automatically generate JSON schema from your database.

Confork uses [sqema](https://github.com/noorzaie/sqema) to generates JSON schema from database. You can run `sqema` by following command:

```shell script
npm run sqema
```

After running this command, JSON schema for all database fields would be generated in `schema` directory, and you can use them in route config for generating swagger schema or validation purpose.

You can also add your custom JSON schema fields to schema directory or remove generated fields.
