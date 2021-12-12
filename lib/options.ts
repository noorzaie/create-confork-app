import { prompt } from 'inquirer';

export const getOptions = async (projectName?: string) => {
	return prompt([
		{
			type: 'input',
			message: 'Enter project name:',
			name: 'projectName',
			default: projectName
		},
		{
			type: 'list',
			message: 'Choose interface framework:',
			name: 'interface',
			choices: [
				{
					name: 'Express',
					value: 'express'
				},
				{
					name: 'Koa',
					value: 'koa'
				}
			]
		},
		{
			type: 'list',
			name: 'useTypeorm',
			message: 'Do you want to use Typeorm as database ORM?',
			choices: [
				{
					name: 'Yes',
					value: true
				},
				{
					name: 'No',
					value: false
				}
			]
		},
		{
			type: 'list',
			name: 'addSwaggerUi',
			message: 'Do you want to setup swagger-ui?',
			choices: [
				{
					name: 'Yes',
					value: true
				},
				{
					name: 'No',
					value: false
				}
			]
		},
		{
			type: 'list',
			name: 'addEslint',
			message: 'Do you want to use eslint?',
			choices: [
				{
					name: 'Yes',
					value: true
				},
				{
					name: 'No',
					value: false
				}
			]
		},
		{
			type: 'list',
			name: 'addAqsTypeorm',
			message: 'Do you want to use aqs-typeorm?',
			choices: [
				{
					name: 'Yes',
					value: true
				},
				{
					name: 'No',
					value: false
				}
			]
		}
	]);
};
