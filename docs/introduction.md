> :warning: Currently, confork is in beta version, and after getting feedbacks and completing features and tests, will be released.

# Introduction
**`Confork`** is a node.js (with the typescript) framework that allows you to create restful API with writing minimal coding. The idea behind confork is to implement common rest API codes using configuration.

Generally, you can consider a restful API as a sequence of actions. For example, an incoming request passes through some middlewares, then a method handles the request and possibly returns some data, then data is formatted and is sent to the client.

You also may need to write database models, write validation schemas and document your APIs. Using confork, you can do all the above, with a configuration file! 


## Main features
```text
- Supports express and koa frameworks
- Supports all database ORMs (default is `typeorm`)
- Automatically generate swagger and postman documentations
- Automatically validate data according to database schema
- Advanced data search using query string
- Includes many ready to use modules
```

If you are ready to start creating amazing projects, let's [get started](gettingStarted.md)!
