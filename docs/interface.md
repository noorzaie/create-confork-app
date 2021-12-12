# Choosing framework
Confork supports two major node.js frameworks, [Express](https://expressjs.com/en/5x/api.html) and [Koa](https://koajs.com/). When creating new project, you just need to choose either koa or express, no extra work needed to use them.


### Registering middlewares
Confork registers your routes using express or koa by default. It also uses `body-parser` by default, but if you need to register more middlewares or add custom routes, you can use `src/interface/express(or koa)/customRouter.ts` file. In this file, you have access to the `router` and also express (or koa) `app`.

!> The base API path by default is `/api/v1`, but you can change it in `.conforkrc` file.
