import { copy, mkdir, rmdirSync } from 'fs-extra';
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs';

const templateDirs = [
	'logs',
	'schema',
	'src/infrastructure/database/models',
	'src/infrastructure/database/repositories',
	'src/interface/utils'
];

const templateFiles = [
	'config/ajv',
	'config/awilix',
	'config/documentation',
	'config/i18n',
	'config/logger',
	'routes/index',
	// 'config/router',
	// 'config/otherDbOptions',
	'src/useCases/SampleUseCase',
	'src/interface/utils/handlers/actionInputHandlers/SampleActionInputHandler',
	'src/interface/utils/handlers/responseHandler/SampleResponseHandler',
	'cli/dbToOpenAPI',
	'cli/routeCreator',
	'cli/routeTemplates/actions',
	'cli/routeTemplates/aqsOptions',
	'cli/routeTemplates/edgeResponseHandler',
	'cli/routeTemplates/register',
	'cli/routeTemplates/responseHandler',
	'cli/routeTemplates/schema'
];

const expressTemplateFiles = [
	'src/interface/express/edgeResponseHandlers/SampleEdgeResponseHandler',
	'src/interface/express/falseConditionHandlers/SampleFalseConditionHandler',
	'src/interface/express/middlewares/errorHandlers/SampleErrorHandler',
	'src/interface/express/middlewares/registerHandlers/SampleRegisterHandler',
	'src/interface/express/customRouter'
];

const koaTemplateFiles = [
	'src/interface/koa/edgeResponseHandlers/SampleEdgeResponseHandler',
	'src/interface/koa/falseConditionHandlers/SampleFalseConditionHandler',
	'src/interface/koa/middlewares/errorHandlers/SampleErrorHandler',
	'src/interface/koa/middlewares/registerHandlers/SampleRegisterHandler',
	'src/interface/koa/customRouter'
];

const otherTemplateFiles = [
	'src/infrastructure/locales/en.json',
	// '.eslintrc.js',
	'.gitignore',
	'tsconfig.json',
	'.env.example',
	// '.npmrc'    // TODO: remove
];

const writeConfigurableFile = (projectName: string, filePath: string, params: object) => {
	let content = readFileSync(join(__dirname, '..', 'templates', filePath), { encoding: 'utf8' });
	for (const [key, value] of Object.entries(params)) {
		content = content.replace(`{${key}}`, value);
	}
	writeFileSync(`${projectName}/${filePath}.ts`, content);
}

const writeExpressTemplateFiles = async (projectName: string) => {
	for (const file of expressTemplateFiles) {
		await copy(join(__dirname, '..', 'templates', file), `${projectName}/${file}.ts`, { recursive: true });
	}
};

const writeKoaTemplateFiles = async (projectName: string) => {
	for (const file of koaTemplateFiles) {
		await copy(join(__dirname, '..', 'templates', file), `${projectName}/${file}.ts`, { recursive: true });
	}
};

export const writeTemplateFiles = async (projectName: string, hasEslint: boolean, useTypeorm: boolean, interfacePackage: 'express' | 'koa') => {
	for (const dir of templateDirs) {
		await copy(join(__dirname, '..', 'templates', dir), `${projectName}/${dir}`, { recursive: true });
	}

	for (const file of templateFiles) {
		await copy(join(__dirname, '..', 'templates', file), `${projectName}/${file}.ts`, { recursive: true });
	}

	for (const file of otherTemplateFiles) {
		await copy(join(__dirname, '..', 'templates', file), `${projectName}/${file}`, { recursive: true });
	}

	// writeConfigurableFile(projectName, 'paths', { interface: interfacePackage });

	if (hasEslint) {
		await copy(join(__dirname, '..', 'templates', '.eslintrc.js'), `${projectName}/.eslintrc.js`);
		await copy(join(__dirname, '..', 'templates', '.eslintignore'), `${projectName}/.eslintignore`);
	}

	if (useTypeorm) {
		await copy(join(__dirname, '..', 'templates', 'config/otherDbOptions'), `${projectName}/config/otherDbOptions.ts`);
		writeConfigurableFile(projectName, 'index', { 'reflect-metadata': "import 'reflect-metadata';\n" });
	} else {
		writeConfigurableFile(projectName, 'index', { 'reflect-metadata': '' });
	}

	if (interfacePackage === 'express') {
		await writeExpressTemplateFiles(projectName);
		writeConfigurableFile(projectName, 'config/router', { 'interface': 'express' });
	} else {    // koa
		await writeKoaTemplateFiles(projectName);
		writeConfigurableFile(projectName, 'config/router', { 'interface': '@koa/router' });
	}
};

export const createProjectDir = async (projectName: string) => {
	await mkdir(projectName);
};

export const checkIfDirExists = (dirName: string): boolean => {
	return existsSync(dirName);
};

export const removeProjectDir = (projectName: string) => {
	rmdirSync(projectName, { recursive: true })
};
