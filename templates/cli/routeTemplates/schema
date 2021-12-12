import { RoutSchemaType } from 'confork-core';
import { RouteTypes } from '../routeCreator';

const typeSchemas: { [key in RouteTypes]: RoutSchemaType } = {
	create: {},
	get: {},
	list: {
		customSpecification: {
			parameters: [
				{
					name: 'page',
					in: 'query',
					schema: {
						type: 'number',
						default: 1
					}
				},
				{
					name: 'limit',
					in: 'query',
					schema: {
						type: 'number',
						default: 10
					}
				},
				{
					name: 'order',
					in: 'query',
					schema: {
						type: 'string',
						default: 'DESC',
						enum: [
							'DESC',
							'ASC'
						]
					}
				},
				{
					name: 'orderBy',
					in: 'query',
					schema: {
						type: 'string',
						default: 'id'
					}
				},
				{
					name: 'select',
					in: 'query',
					schema: {
						type: 'array',
						items: {
							type: 'string'
						}
					}
				}
			]
		}
	},
	delete: {},
	deleteMany: {},
	addAssociation: {
		input: [
			{
				schema: {
					data: {
						anyOf: [
							{
								type: 'array',
								items: {
									type: 'number'
								}
							},
							{
								type: 'number'
							},
							{
								type: 'object'
							},
							{
								type: 'array',
								items: {
									type: 'object'
								}
							}
						]
					}
				}
			}
		]
	},
	removeAssociation: {
		input: [
			{
				schema: {
					data: {
						anyOf: [
							{
								type: 'array',
								items: {
									type: 'number'
								}
							},
							{
								type: 'number'
							}
						]
					}
				}
			}
		]
	},
	update: {}
};

export const getSchema = (type: RouteTypes, table: string) => {
	const schema: RoutSchemaType = {
		input: [],
		...typeSchemas[type],
		output: { schema: [ { table, fields: 'all' } ] }
	};

	if ([ 'create', 'update' ].includes(type)) {
		schema.input!.push({ table, fields: 'all', exclude: [ 'id' ] });
	}

	if ([ 'list', 'deleteMany' ].includes(type)) {
    schema.output!.isArray = true;
	}

	return schema;
};
