import { MongooseModuleOptions } from '@nestjs/mongoose';
import { MONGO_DB } from './env';

export const Configs: MongooseModuleOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	ignoreUndefined: true,
	dbName: MONGO_DB
};
