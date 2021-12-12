# Handlers
In confork, there is several kind of handlers. Confork contains some common handlers for each type, but you can implement your own handler an use them in route config.

In this page, we discuss on different kinds of handlers.

## Action input handlers
When you use actions in route config, you should provide their input using `action input handlers`. These inputs will be passed to `execute` method of related use-case. You can see a list of available input handlers in table below:

| Handler | Description |
| ------------- | ------------- |
| stepHandler | Extract data from result of previous actions |
| requestHandler | Extract data from request object |
| containerHandler | Extract data from dependency container |
| fixedHandler | Pass a fixed value |

You can create your own handler by creating a function with type `ActionInputHandlerType`.

```js
const myHandler: ActionInputHandlerType = (
	{ req, steps }: ActionInputHandlerSourceArgType, ...otherArgs: StepInputHandlerArgsType[]
) => {
    // Do whatever you need
}
```


## Register handlers
You may need to register some data in request container (scope) for a request. You can use confork's default handlers:

| Handler | Description |
| ------------- | ------------- |
| requestRegisterHandler | Extract data from request object and register into scope |
| fixedRegisterHandler | Register a fixed value into scope |
| dbRegisterHandler | Extract data from database and register into scope |

You can create your own handler by creating a function with type `ExpressRegisterHandlerType` or `KoaRegisterHandlerType` according to your interface package.


## False condition handlers
If you add conditions to a route action, that action will be executed only if the conditions match. You can set a false condition handler to be run if conditions not matched. By default, there is a `throwHandler` that returns an error object to the client.

You can create your own handler by creating a function with type `ExpressActionFalseConditionHandlerType` or `KoaActionFalseConditionHandlerType` according to your interface package.

To see how you can use conditions in your route, check out [condition](routing/conditions.md) page.

## Error handlers
Confork catches all errors of your application and sends them to default `errorHandler`, but you can implement your own error handler and register with types `ExpressErrorHandlerType` or `KoaErrorHandlerType`.

In case of express there is an `edge error handler` that catches unexpected errors.

Confork uses [winston]() and logs error in console and also stores them in `logs` folder, you can overwrite winston's config by manipulating `config/logger.ts` file.

To learn more about confork's error handling, check out [error handling](errorHandling.md) page.

## Response handlers
After executing actions, results will be sent to response handlers to be processed and sent to the client. To see how a response handler works, refer to [Response handling](routing/responseHandling.md) page.

