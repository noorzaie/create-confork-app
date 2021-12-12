import { ParseConfigType } from 'aqs';
import { RouteTypes } from '../routeCreator';

const typeAqsOptions: { [ key in RouteTypes ]: ParseConfigType } = {
	create: {},
	get: {},
	list: {
		paramsConfigs: {},
		fixedParams: [],
		globalConfigs: { allowedParams: [ 'select', 'limit', 'orderBy', 'order', 'page' ] }
	},
	update: {},
	delete: {},
	deleteMany: {
		globalConfigs: { allowedParams: [ 'id' ] }
	},
	addAssociation: {},
	removeAssociation: {}
};

export const getAqsOptions = (type: RouteTypes) => {
	const aqsOptions = typeAqsOptions[type];
	return aqsOptions;
};
