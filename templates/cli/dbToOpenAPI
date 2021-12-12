import SQLToJsonSchemaConvertor from 'sqema';
import * as dotenv from 'dotenv';
import * as config from '../.conforkrc';

dotenv.config();

const run = () => {
	const convertor = new SQLToJsonSchemaConvertor(
		config.db.dialect as 'postgres',
		{
			host: config.db.host as string,
			port: parseInt(config.db.port as string, 10),
			database: config.db.database as string,
			username: config.db.username as string,
			password: config.db.password as string
		}
	);

	convertor.generateJsonSchemas()
		.then(() => {
			convertor.writeJsonSchemas('schema', 'field', 'ts');
			console.log('OpenAPI schemas generated successfully!');
		})
		.catch((e) => {
			console.log('Can not generate json schemas from database!', e);
		});
};

run();
