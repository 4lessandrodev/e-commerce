import { MONGO_DB, MONGO_URL } from './Infra/configs/env';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Infra/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
      dbName: MONGO_DB,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
