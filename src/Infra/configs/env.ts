import { get } from 'env-var';

export const NODE_VERSION = get('NODE_VERSION')
	.required(true)
	.default('14.15')
	.asString();

export const PORT = get('PORT').required(true).default(3000).asPortNumber();

export const JWT_EXPIRATION_IN_HOURS = get('JWT_EXPIRATION_IN_HOUR')
	.required(true)
	.default(5)
	.asIntPositive();

export const JWT_SECRET = get('JWT_SECRET')
	.required(true)
	.default('A9A9865AD-DAS3434.SDF0&DF98$DSF.aws@')
	.asString();

export const MONGO_USER = get('MONGO_USER')
	.required(true)
	.default('mongo_user')
	.asString();

export const MONGO_PASSWORD = get('MONGO_PASSWORD')
	.required(true)
	.default('mongo_pass')
	.asString();

export const MONGO_PORT = get('MONGO_PORT')
	.required(true)
	.default(27017)
	.asPortNumber();

export const MONGO_HOST = get('MONGO_HOST')
	.required(true)
	.default('localhost')
	.asString();

export const MONGO_DB = get('MONGO_DB')
	.required(true)
	.default('fazenda')
	.asString();

export const ENV = get('ENV')
	.required(true)
	.default('DEVELOPMENT')
	.asEnum(['DEVELOPMENT', 'PRODUCTION']);

export const MONGO_URL =
	ENV === 'PRODUCTION'
		? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`
		: `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
