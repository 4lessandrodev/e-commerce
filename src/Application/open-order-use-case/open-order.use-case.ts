import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { OrderRepositoryInterface } from '@repo/order-repository.interface';
import { Order, UserId } from '@domain/aggregates-root';
import { ClientRepositoryInterface } from '@repo/client-repository.interface';
import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import { Currency } from '@domain/value-objects';
import { OrderStatusValueObject } from '@domain/value-objects';
import { OrderIdValueObject } from '@domain/value-objects';
import { MonetaryValueObject } from '@domain/value-objects';
import { EcobagRepositoryInterface } from '@repo/ecobag.repository.interface';
import { Ecobag } from '@domain/entities';
import { OpenOrderDto } from './open-order-use-case.dto';

@Injectable()
export class OpenOrderUseCase implements IUseCase<any, Result<void>> {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepositoryInterface,

    @Inject('ClientRepository')
    private readonly clientRepo: ClientRepositoryInterface,

    @Inject('RegionRepository')
    private readonly regionRepo: RegionRepositoryInterface,

    @Inject('EcobagRepository')
    private readonly ecobagRepo: EcobagRepositoryInterface,
  ) {}
  async execute(dto: OpenOrderDto): Promise<Result<void>> {
    try {
      //
      const client = await this.clientRepo.findOne({ id: dto.userId });

      if (!client) {
        return Result.fail<void>('Client does not exists');
      }

      const clientAlreadyHasPendingOrder =
        await this.orderRepo.clientHasOpenedOrder({
          clientId: client.id.toString(),
          status: 'PENDING',
        });

      if (clientAlreadyHasPendingOrder) {
        return Result.fail<void>('Client already has an pending order');
      }

      const clientMainAddress = client.addresses.find(
        ({ isMainAddress }) => isMainAddress,
      );

      if (!clientMainAddress) {
        return Result.fail<void>('Client does not has a main address');
      }

      const clientRegionId = clientMainAddress.regionId.id.toString();

      const clientRegion = await this.regionRepo.findOne({
        id: clientRegionId,
      });

      if (!clientRegion) {
        return Result.fail<void>('Client region is not available for delivery');
      }

      const ecoBagPrice = Currency.create(0).getResult();
      const ecoBagFee = MonetaryValueObject.create(ecoBagPrice).getResult();

      if (client.hasEcobag) {
        const ecobagPriceDb = await this.ecobagRepo.getPrice(Ecobag.id());
        ecoBagPrice.sum(ecobagPriceDb.value);
      }

      const orderNumber = OrderIdValueObject.create().getResult();
      const status = OrderStatusValueObject.create('PENDING').getResult();

      const orderOrError = Order.create({
        costOfFreight: clientRegion.freightPrice,
        basketPacks: [],
        clientId: UserId.create(client.id),
        clientName: client.name,
        customBaskets: [],
        deliveryOrCollectionAddress: clientMainAddress,
        ecoBagFee,
        includesEcobag: !client.hasEcobag,
        isTheOrderForCollection: false,
        orderNumber,
        separateProducts: [],
        status,
      });

      if (orderOrError.isFailure) {
        return Result.fail<void>(orderOrError.error.toString());
      }
      const order = orderOrError.getResult();

      await this.orderRepo.save(order);
      return Result.ok<void>();
      //
    } catch (error) {
      return Result.fail<void>('Internal Server Error on Open Order Use Case');
    }
  }
}
