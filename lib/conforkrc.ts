import { writeFile } from 'fs-extra';

export const writeConforkRcFile = async (projectName: string, interfacePackage: 'express' | 'koa', addSwaggerUi: boolean, useTypeorm: boolean, useAqsTypeorm: boolean) => {
	let content = `module.exports = {
		env: process.env.NODE_ENV || 'development',
		interface: '${interfacePackage}',
		disableSwagger: ${addSwaggerUi ? 'false' : 'true'},
		http: {
			host: process.env.HTTP_HOST || 'localhost',
			port: process.env.HTTP_PORT || 7000,
			basePath: process.env.HTTP_BASE_PATH
		},
		db: {
			dialect: process.env.DB_DIALECT,
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			otherDbOptions: undefined
		},
		useTypeorm: ${useTypeorm ? 'true' : 'false'},
		useAqsTypeorm: ${useAqsTypeorm ? 'true' : 'false'},
		locale: process.env.LOCALE || 'en',
		paths: {
			customRouter: 'src/interface/${interfacePackage}/customRouter',
			actionInputHandlers: 'src/interface/utils/handlers/actionInputHandlers',
			responseHandlers: 'src/interface/utils/handlers/responseHandlers',
			registerHandlers: 'src/interface/${interfacePackage}/middlewares/registerHandlers',
			edgeResponseHandlers: 'src/interface/${interfacePackage}/edgeResponseHandlers',
			actionFalseConditionHandlers: 'src/interface/${interfacePackage}/falseConditionHandlers',
			errorHandlers: 'src/interface/${interfacePackage}/middlewares/errorHandlers'
		}
};\n`;

	if (useTypeorm) {
		content = content.replace('otherDbOptions: undefined', 'otherDbOptions');
		content = `const otherDbOptions = require('./config/otherDbOptions').default;\n\n${content}`;
	}

	await writeFile(
		`${projectName}/.conforkrc.js`,
		content
	);
};
