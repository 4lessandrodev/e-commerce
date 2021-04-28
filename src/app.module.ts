import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Infra/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo_user:mongo_pass@localhost:27017/player_db?authSource=admin',
      {
        connectTimeoutMS: 300,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
