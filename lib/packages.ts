import { writeFile } from 'fs-extra';
import { InterfaceType } from '../index';
import spawn from 'cross-spawn';
import logUpdate from 'log-update';
import ora from 'ora';

const expressDependencies = {
	'express': '^5.0.0-alpha',
	'morgan': '^1.10.0'
};

const expressDevDependencies = {
	'@types/express': '^4.17.13',
	'@types/morgan': '^1.9.3'
};

const koaDependencies = {
	'@koa/router': '^10.1.1',
	'koa': '^2.13.4',
	'koa-bodyparser': '^4.3.0',
	'koa-logger': '^3.2.1'
};

const koaDevDependencies = {
	'@types/koa': '^2.13.4',
	'@types/koa-bodyparser': '^4.3.4',
	'@types/koa__router': '^8.0.9',
	'@types/koa-logger': '^3.1.2',
};

const expressSwaggerDependencies = {
	'swagger-ui': '^4.1.0',
	'swagger-ui-express': '^4.1.6'
};

const expressSwaggerDevDependencies = {
	'@types/swagger-ui': '^3.52.0',
	'@types/swagger-ui-express': '^4.1.3'
};

const koaSwaggerDependencies = {
	'koa2-swagger-ui': '^5.3.0'
};

const eslintDevDependencies = {
	'@typescript-eslint/eslint-plugin': '^4.31.2',
	'@typescript-eslint/parser': '^4.31.2',
	'eslint': '^7.32.0',
	'eslint-config-airbnb-base': '^14.2.1',
	'eslint-plugin-import': '^2.24.2',
	'eslint-import-resolver-typescript': '^2.5.0'
};

const dbDependencies = {
	'pg': '^8.7.1',
	'reflect-metadata': '^0.1.13',
	'typeorm': '^0.2.38'
};

const dbDevDependencies = {
	'@types/pg': '^8.6.1'
};

const aqsTypeormDependencies = {
	'aqs-typeorm': '^1.0.1'
};

const packageJsonObject = {
	'name': '',
	'version': '1.0.0',
	'description': '',
	'main': 'index.js',
	'scripts': {
		'dev': 'npm run lint && cross-env NODE_PATH=. NODE_ENV=development ts-node-dev --respawn --pretty --transpile-only --ignore-watch schema/swaggerSchema.json index.ts',
		"lint": "eslint --ext ts .",
		'build': 'tsc',
		"sqema": "ts-node-dev cli/dbToOpenAPI",
		"new-route": "ts-node-dev cli/routeCreator",
		'test': 'echo "Error: no test specified" && exit 1'
	},
	'author': '',
	'license': 'ISC',
	'devDependencies': {
		'@types/dotenv': '^8.2.0',
		'@types/i18n': '^0.13.1',
		'@types/node': '^16.11.1',
		'cross-env': '^7.0.3',
		'openapi-types': '^9.3.0',
		'ts-node-dev': '^1.1.8',
		'@types/inquirer': '^8.1.3',
		'typescript': '^4.4.4'
	},
	'dependencies': {
		'ajv': '^8.6.3',
		'ajv-formats': '^2.1.1',
		'aqs': '^1.0.6',
		'awilix': '^5.0.1',
		'confork-core': '^1.0.3',
		'colors': '^1.4.0',
		'dotenv': '^10.0.0',
		'i18n': '^0.13.3',
		'sqema': '^1.0.0',
		'winston': '^3.3.3',
		'inquirer': '^8.2.0'
	}
};

export const writePackageJson = async (projectName: string, interfacePackage: InterfaceType, useTypeorm: boolean, addSwaggerUi: boolean, addEslint: boolean, addAqsTypeorm: boolean) => {
	packageJsonObject.name = projectName;

	if (interfacePackage === 'express') {
		packageJsonObject.dependencies = { ...packageJsonObject.dependencies, ...expressDependencies };
		packageJsonObject.devDependencies = { ...packageJsonObject.devDependencies, ...expressDevDependencies };

		if (addSwaggerUi) {
			packageJsonObject.dependencies = { ...packageJsonObject.dependencies, ...expressSwaggerDependencies };
			packageJsonObject.devDependencies = { ...packageJsonObject.devDependencies, ...expressSwaggerDevDependencies };
		}
	} else {
		packageJsonObject.dependencies = { ...packageJsonObject.dependencies, ...koaDependencies };
		packageJsonObject.devDependencies = { ...packageJsonObject.devDependencies, ...koaDevDependencies };

		if (addSwaggerUi) {
			packageJsonObject.dependencies = { ...packageJsonObject.dependencies, ...koaSwaggerDependencies };
		}
	}

	if (useTypeorm) {
		packageJsonObject.dependencies = { ...packageJsonObject.dependencies, ...dbDependencies };
		packageJsonObject.devDependencies = { ...packageJsonObject.devDependencies, ...dbDevDependencies };
	}

	if (addEslint) {
		packageJsonObject.devDependencies = { ...packageJsonObject.devDependencies, ...eslintDevDependencies };
	}

	if (addAqsTypeorm) {
		packageJsonObject.dependencies = { ...packageJsonObject.dependencies, ...aqsTypeormDependencies };
	}

	await writeFile(
		`${projectName}/package.json`,
		JSON.stringify(
			{ ...packageJsonObject, name: projectName },
			null,
			4
		)
	);
};

const install = (packages: object, isDev: boolean) => {
	spawn('npm', [ 'install', isDev ? '-D' : '-S' ]);
};

export const installDependencies = (projectName: string) => {
	return new Promise((resolve, reject) => {
		const currentDir = process.cwd();
		process.chdir(projectName);
		const ps = spawn('npm', [ 'install' ], {
			stdio: [0, 'pipe', 'pipe'],
			env: Object.assign(
				{
					FORCE_COLOR: true,
					npm_config_color: 'always',
					npm_config_progress: true
				},
				process.env
			),
		});

		const spinner = ora({
			text: 'Installing dependencies\n',
			spinner: 'dots',
			color: 'cyan'
		});
		let stdoutLogs = '';
		let stderrLogs = '';

		ps.stdout &&
		ps.stdout.setEncoding('utf8').on('data', (data) => {
			stdoutLogs += data;
			spinner.stop();
			logUpdate(stdoutLogs);
			spinner.start();
		});

		ps.stderr &&
		ps.stderr.setEncoding('utf8').on('data', (data) => {
			stderrLogs += data;
			spinner.stop();
			logUpdate.clear();
			logUpdate.stderr(stderrLogs);
			logUpdate(stdoutLogs);
			spinner.start();
		});

		ps.on('close', (code) => {
			spinner.stop();
			// Clear output when succeeded
			if (code === 0) {
				logUpdate.clear();
				logUpdate.stderr.clear();
				resolve({ code });
			} else {
				reject();
			}
		});

		ps.on('error', reject);

		process.chdir(currentDir);
	});
};
