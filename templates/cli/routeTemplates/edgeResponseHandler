import { EdgeResponseHandlersType } from 'confork-core/types/routeTypes/EdgeResponseHandlerTypes';
import { RouteTypes } from '../routeCreator';

const typeEdgeResponseHandlers: { [ key in RouteTypes ]: EdgeResponseHandlersType } = {
	create: {
		handler: 'post',
		args: {
			message: 'Created successfully!',
			translate: false
		}
	},
	get: {
		handler: 'get',
		args: {}
	},
	list: {
		handler: 'list',
		args: {}
	},
	update: {
		handler: 'update',
		args: {
			message: 'Updated successfully!',
			translate: false
		}
	},
	delete: {
		handler: 'delete',
		args: {
			message: 'Deleted successfully!',
			translate: false
		}
	},
	deleteMany: {
		handler: 'deleteMany',
		args: {
			message: 'Deleted successfully!',
			translate: false
		}
	},
	addAssociation: {
		handler: 'update',
		args: {
			message: 'Updated successfully!',
			translate: false
		}
	},
	removeAssociation: {
		handler: 'update',
		args: {
			message: 'Association removed successfully!',
			translate: false
		}
	}
};

export const getEdgeResponseHandler = (type: RouteTypes) => {
	const edgeResponseHandler: EdgeResponseHandlersType = typeEdgeResponseHandlers[type];

	return edgeResponseHandler;
};
