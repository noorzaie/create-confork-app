import chalk from 'chalk';
import boxen from 'boxen';
import { checkIfDirExists, createProjectDir, removeProjectDir, writeTemplateFiles } from './lib/template';
import { installDependencies, writePackageJson } from './lib/packages';
import { writeConforkRcFile } from './lib/conforkrc';
import Logger from './lib/logger';
import { getOptions } from './lib/options';

export type InterfaceType = 'express' | 'koa';

type OptionsType = {
	interface: InterfaceType;
	useTypeorm: boolean;
	addSwaggerUi: boolean;
	addEslint: boolean;
	addAqsTypeorm: boolean;
}

export const run = async (args: string[]) => {
	const options = await getOptions(args.length > 0 ? args[0] : undefined);

	if (!checkIfDirExists(options.projectName)) {
		await createProjectDir(options.projectName)
			.catch(error => {
				Logger.error('Error creating project directory!');
				throw error;
			});

		try {
			await writeTemplateFiles(options.projectName, options.addEslint, options.useTypeorm, options.interface);
			await writeConforkRcFile(options.projectName, options.interface, options.addSwaggerUi, options.useTypeorm, options.addAqsTypeorm);
			await writePackageJson(options.projectName, options.interface, options.useTypeorm, options.addSwaggerUi, options.addEslint, options.addAqsTypeorm);

			installDependencies(options.projectName)
				.then(() => {
					console.log(
						boxen(
							chalk`\n🎉  {bold Your project created successfully!}\n\n` +
							chalk`  {bold To start the app, run following commands:}\n` +
							chalk`    cd ${options.projectName}\n    {cyan npm run dev}\n\n` +
							chalk`  {bold To build the app, run following command:}\n` +
							chalk`    {cyan npm run build}\n\n` +
							chalk`    {red don't forget to create .env file first!}\n`,
							{ title: 'Success!', padding: 1, margin: 1, borderStyle: 'double', borderColor: 'green', titleAlignment: 'center' }
						)
					);
				})
				.catch(e => {
					Logger.error('Error installing dependencies!');
					Logger.error(e);
					removeProjectDir(options.projectName);
				});
		} catch (e) {
			Logger.error('Error creating project files!');
			removeProjectDir(options.projectName);
			throw e;
		}
	} else {
		Logger.error(`Another directory with name '${options.projectName}' already exists in current path!`);
	}
};
