# How to use
You can create new project using `create-confork-app` cli:

```shell script
npm init confork-app project-name
```

By running this command, multiple options will be prompted:

| Option | Description |
| ------------- | ------------- |
| Choose interface framework | Web framework (express or koa) |
| Do you want to use Typeorm as database ORM | Enable typeorm or not |
| Do you want to setup swagger-ui | Enable swagger-ui or not |
| Do you want to use eslint | Enable eslint or not |
| Do you want to use aqs-typeorm | Use [Aqs-typeorm](https://github.com/noorzaie/aqs-typeorm) or not |

After choosing proper options, the project will be created in the current directory.

!> After creating a project, you should rename `.env.example` to `.env` and edit its variables.

Now, you can move into your project directory and start the application using following command:

```shell script
npm run dev
```

Now everything is ready! let's move forward.


# Main concepts
Before start development, you need to get familiar with some important concepts of confork.

### Dependency injection
Most of implemented confork's modules are accessible using dependency injection. Confork, uses [Awilix](https://github.com/jeffijoe/awilix) as dependency container.
Confork creates a scoped container for each request, you can access it from `scope` key of request object. You can also import global `container` from `confork-core` and register or resolve dependencies. 

### Action
In confork, each request will pass through one or more actions. In other words, you can handle logic of your API in actions. For more information refer to [Routing](routing/routing.md?id=actions) page.

### Use-case
UseCases are modules that handle main functionality of each API. For example, when handling a request that needs list of specific resource, you need to fetch data from database (according to some filters) and return them. So, you can use `ListUseCase` of confork that can handle these job.

There is also many other UseCase modules that you can use for different purposes that you can check them out in [use-cases](routing/useCases.md) page.


### Handler
Confork includes many utils in form of handlers, a handler is a method that you can use it by configuring them in route object. The configuration includes `handler` and `args` fields. You can learn more about handlers in [handlers](routing/customHandlers.md) page.

?> We suggest that continue learning confork by reading [routing](routing/routing.md) page, as it is the most important part of the confork.
