import { DocumentationType } from 'confork-core';

const options: DocumentationType = {
	uri: '/docs',
	swagger: {
		customSpecification: {
			openapi: '3.0.3',
			info: {
				version: '1.0.0',
				title: process.env.npm_package_name || '',
				description: process.env.npm_package_description || ''
			},
			servers: [
				{
					url: 'http://localhost:7000'
				}
			]
		},
		options: {}
	}
};

export default options;
