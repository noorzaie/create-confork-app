# Error handling
Confork catches all application's errors and passes them to default `errorHandler`. In confork, errors are instance of `BaseError` class. There are also some common error classes that extends from BaseError class and you can use them:

```text
- InternalServerError
- NotFoundError
- ValidationError
```

Default error handler creates an object containing a `message` and `errors` object to send to the client. But you can create your own error handler and register it into container.

You can also create and use your own error class by extending `BaseError` class.
