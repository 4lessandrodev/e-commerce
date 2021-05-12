import { MONGO_URL } from './Infra/configs/env';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './Infra/user/user.module';
import { ClientModule } from './Infra/client/client.module';
import { RegionModule } from './Infra/region/region.module';
import { ProductModule } from './Infra/product/product.module';
import { BasketModule } from './Infra/basket/basket.module';
import { Configs } from './Infra/configs/mongo.config';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, Configs),
    UserModule,
    ClientModule,
    RegionModule,
    ProductModule,
    BasketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
