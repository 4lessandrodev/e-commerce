import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DefineEcobagPriceUseCase } from '@app/define-ecobag-price-use-case/define-ecobag-price.use-case';
import { EcobagController } from './ecobag.controller';
import { EcobagService } from './ecobag.service';
import { Ecobag, EcobagSchema } from './entities/ecobag.schema';
import { EcobagMapper } from './mapper/ecobag.mapper';
import { EcobagRepository } from './repo/ecobag.repository';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([{ name: Ecobag.name, schema: EcobagSchema }])
	],
	controllers: [EcobagController],
	providers: [
		EcobagService,
		DefineEcobagPriceUseCase,
		EcobagMapper,
		{
			provide: 'EcobagRepository',
			useClass: EcobagRepository
		}
	],
	exports: ['EcobagRepository']
})
export class EcobagModule {}
