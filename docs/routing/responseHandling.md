Generally, a restful API returns an object or array of objects to the client. It may also contain nested objects. Confork has some response handlers that is enough for most use cases. In this page we disscuss about confork's response handlers an also we see how you can create your own response handler. 

# Response handler
After executing route actions, their results will be stored in an object and passed to the response handler. A response handler is responsible to format this data.

Confork has a `step` response handler that returns results of one action as final response. Another response handler is `default` response handler that could be configured to create more complex responses.

Using `default` response handler you can create object or array of objects responses. You can also create nested objects, add conditions to a field or create field groups to apply common criteria on them.

For example, consider following actions results:
```js
const actionResults = {
    lastStep: [
        {
            id: 1,
            name: 'joe',
            birthDate: '2000-01-01',
            password: '123',
            roles: [
                { id: 1, role: 'admin', createdAt: '2020-01-01' },
                { id: 2, role: 'support', createdAt: '2020-01-01' },
            ]
        },
        {
            id: 2,
            name: 'jack',
            birthDate: '1990-01-01',
            password: '123',
            roles: [
                { id: 1, role: 'admin', createdAt: '2020-01-01' }
            ]
        }
    ]
};
```
Imagine You want to remove `password` from user's data, and you also want to return `createdAt` from roles list only if the `role` value of cookies is equal to `admin`. You can do this by following response handler:

```js
// route file
const route = {
	name: 'list of users',
    // other fields
    responseHandler: {
        handler: 'default',
        args: {
            plural: true,
            step: 'lastStep',
            schema: [
                {
                    fields: [
                        'id',
                        'name',
                        'birthDate',
                        {   // A field group for roles field
                            fromKey: 'roles',
                            toKey: 'roles',
                            childes: {
                                plural: true,
                                schema: [
                                    {
                                        fields: [
                                            'id',
                                            'role',
                                            {
                                                fromKey: 'createdAt',
                                                toKey: 'createdAt',
                                                conditions: {
                                                    leftSource: 'request',
                                                    leftPath: 'cookies.role',
                                                    rightSource: 'fixed',
                                                    rightPath: 'admin',
                                                    operator: 'eq'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
};
```


# Edge response handler
You've learnt how to format your data using response handlers. after formatting data, You should return it as response to the client and also want to attach a message to it, For this purpose there is other kind of response handlers specific for each request method. For example, for above sample, you can use `list` response handler:

```js
const route = {
    name: 'list of users',
    responseHandler: {
    	//
    },
    edgeResponseHandler: {
		handler: 'list',
		args: {
			message: 'Data fetched successfully!',
			translate: false
		}
	}
};
```

And finally you'll get following results:

```js
const response = {
    "message": "Data fetched successfully!",
    "data": [
        {
            "id": 1,
            "name": "joe",
            "birthDate": "2000-01-01",
            "roles": [
                {
                    "id": 1,
                    "role": "admin"
                },
                {
                    "id": 2,
                    "role": "support"
                }
            ]
        },
        {
            "id": 2,
            "name": "jack",
            "birthDate": "1990-01-01",
            "roles": [
                {
                "id": 1,
                "role": "admin"
                }
            ]
        }
    ],
    "page": 1,
    "perPage": 10
};
```

You can use following edge response handlers or create your own handler using `ExpressEdgeResponseHandlerType` or `KoaEdgeResponseHandlerType` types:

```
- get
- list
- post
- update
- updateMany
- delete
- deleteMany
```
