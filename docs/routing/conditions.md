There are some cases that you need to check some conditions before running a module. In confork, you can apply conditions on `actions` or response handler `fields`.

# Conditions structure
A typical condition consists of a left-hand side value, an operator and a right-hand side value. A simple condition in confork consists of following fields:

| Field | Description | Possible values |
| ------------- | ------------- | ------------- |
| leftSource | Source of left-hand side of operator | - step (action)<br> - container<br>- request<br>- fixed |
| leftPath | The path in `leftSource` to search for left-hand side value | Any string |
| rightSource | Source of right-hand side of operator | - step (action)<br> - container<br>- request<br>- fixed |
| rightPath | The path in `rightSource` to search for right-hand side value | - An action name<br>- A key in container<br>- A key in request object<br>- A fixed value |
| operator | Operator of condition | - eq<br>- in<br>- neq<br>- nin |

### More complex conditions
You can create more complex operators with `and` and `or` operators with a group of conditions, and make nested conditions:

```js
// (req.params.id === 1 and (req.cookies.auth === true or container.user.role === 'admin'))
const condition: ConditionsGroupType = {
	operator: 'and',
	conditions: [
		{
			leftSource: 'request',
			leftPath: 'params.id',
			rightSource: 'fixed',
			rightPath: 1,
			operator: 'eq'
		},
		{
			operator: 'or',
			conditions: [
				{
					leftSource: 'request',
					leftPath: 'cookies.auth',
					rightSource: 'fixed',
					rightPath: false,
					operator: 'eq'
				},
				{
					leftSource: 'container',
					leftPath: 'user.role',
					rightSource: 'fixed',
					rightPath: 'admin',
					operator: 'neq'
				}
			]
		}
	]
};
```

!> Conditions can be used in two cases:<br>- To check whether to run an action or not.<br>- To conditionally add a field to response object.
