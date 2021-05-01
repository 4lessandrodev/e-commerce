import { MONGO_DB, MONGO_URL } from './Infra/configs/env';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Infra/user/user.module';
import { ClientModule } from './Infra/client/client.module';

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
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
