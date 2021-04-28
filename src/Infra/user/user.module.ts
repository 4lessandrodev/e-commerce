import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignInUseCase } from '../../Application/sign-in-use-case/sign-in.use-case';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserMapper,
      useFactory: () => new UserMapper(),
    },
    SignInUseCase,
    UserRepository,
    UserService,
  ],
})
export class UserModule {}
