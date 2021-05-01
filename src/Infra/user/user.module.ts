import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SignUpUseCase } from '@app/sign-up-use-case/sign-up.use-case';
import { JWT_EXPIRATION_IN_HOURS, JWT_SECRET } from '../configs/env';
import { JwtStrategy } from './services/jwt-strategy';
import { UserController } from './user.controller';
import { UserMapper } from './repo/user.mapper';
import { UserRepository } from './repo/user.repository';
import { User, UserSchema } from './entities/user.schema';
import { UserService } from './user.service';
import { SignInUseCase } from '@app/sign-in-use-case/sign-in.use-case';
import { UserQuery } from './repo/user.query';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: `${JWT_EXPIRATION_IN_HOURS}h`,
      },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserMapper,
      useFactory: () => new UserMapper(),
    },
    JwtStrategy,
    SignUpUseCase,
    SignInUseCase,
    UserRepository,
    UserQuery,
    UserService,
  ],
})
export class UserModule {}
