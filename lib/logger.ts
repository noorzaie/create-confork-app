import logger from 'node-color-log';

class Logger {
	static withMark (message: string) {
		return `create-confork-app: ${message}`;
	}

	static error (message: string) {
		logger.error(this.withMark(message));
	}

	static warn (message: string) {
		logger.warn(this.withMark(message));
	}

	static log (message: string) {
		logger.log(this.withMark(message));
	}

	static info (message: string) {
		logger.info(this.withMark(message));
	}
}

export default Logger;
