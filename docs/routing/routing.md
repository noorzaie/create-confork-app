# Routing
Routes are the most important part of a confork project. In confork, each route is an object that determines how a request should be handled by setting different actions. In this part we discuss how to configure routes.

## Create route
You can create new route using following command:
```shell script
npm run new-route
```
By running this command, most of the route options will be prompted and after setting them, a route file will be created and you can configure it the way you need.

!> After creating a route, You should import your route in `routes/index.ts`.

## Route fields
Each route contains multiple fields that tells the route how handle the request, In this part we talk about some important fields of route object.

### Ordering routes
You can modify default order of registering routes by changing `order` field. By default, routes will be registered as the order that you import them in `routes/index.ts`.


### Defining schemas
`schema` field determines input and output structure of your API. The `input` field of schema is used for vlidation and generating swagger input specification. The `output` field is used for swagger response schema. Also, the content of `customSpecification` field will be merged into final schema.

When using input and output fields, you can automatically generate `open-api` specification from database tables, custom paths or even write fields specifications directly. 


### Validating
You can enable validation of request `body` by setting `validateBody` to true. Confork uses [Ajv](https://github.com/ajv-validator/ajv) validator, you can set ajv configuration using `validationOption` field.
As mentioned above, you can set validation schema in `schema` field by a minimal configuration.

### Dependency injection
Confork uses `Awilix` as dependency container. Awilix supports global and scoped registering. By default, confork creates a scope for each request with needed dependencies. You can also register everything you need using `register` field.
In this field you can set a list of `registerHandlers`. By default, you can use following handlers:

| Handler  | Description | Arguments |
| ------------- | ------------- | ------------- |
| requestRegisterHandler | Extract data from request object and register in container | - fromKey: A key in request object<br>- toKey<br>- default<br>- parser: A parser name to parse value |
| fixedRegisterHandler | Set a fixed value in container  | - key<br>- value |
| dbRegisterHandler | Fetch a resource from data base and set in container | -idSource: A key in request object<br>- idName: id key in database<br>- toKey<br>- repository<br>- throwNotFound: Return 404 if resource not found  |

In addition to default register handlers, you can create your own handler and use it in route configuration. To see how you can create a custom handler, checkout [Custom handlers](routing/customHandlers.md) page.

### Actions
Actions are heart of a confork route, that can get a request, fetches data from a database, create new resource, update a resource or any other thing that s request needs!

In confork, each request is considered as a sequence of actions, for example you may need an action to `process inputs`, an action to `authorize` reqeust, an action to work with `database` and finally an action to process and returns `response`.

!> Action responses will be stored in an object with their `name` field as the key and is accessible in response handler. The name of last action is `lastStep` by default.

You can configure an action with following options:

| Option  | Description | Type |
| ------------- | ------------- | ------------- |
| name  | Name of action. This can be used to reference action results in response handlers | string |
| keepResponse | Keep action response to use in response handlers | boolean |
| inputs | Inputs of action | [Handler](routing/customHandlers.md) |
| handler | Name of use-case | [UseCase](routing/useCases.md) |
| conditions | Conditions that should be matched to run the action | [Condition](routing/conditions.md) |
| falseConditionHandler | A handler that will be run if conditions not satisfied | [Handler](routing/customHandlers.md) |
| async | Run action asynchronously with other actions | boolean |
| startTransaction | Start a transaction and do consequent actions in transaction | boolean |
| endTransaction | Commit and end a started transaction | boolean |


### Advanced querying
Confork uses [Aqs](https://github.com/noorzaie/aqs) and [Aqs-typeorm](https://github.com/noorzaie/aqs-typeorm) packages for working with query string. By using these packages you can allow clients to make advanced filters using query strings. You can configure `Aqs` by using `aqsOptions` field. To see how confork filters database by using these packages check out [Use-cases](routing/useCases.md) page.

### Response handling
A response handler is responsible for processing actions results and format them into a proper object. You can set a response handler in `responseHandler` field. By default you can use following response handlers:

| Handler  | Description |
| ------------- | ------------- |
| default | Create complex response format from action results |
| step | Return result of specific action (or step) as response |

To see how to use response handlers or defining custom response handlers check out [Response handling](routing/responseHandling.md) page.

## Route groups
You can use route groups to set common fields to a group of routes. A route group contains following options:

```text
- prefix
- order
- routes
- register
```
