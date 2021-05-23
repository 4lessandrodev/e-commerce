import { Body, Post } from '@nestjs/common';
import { UsePipes, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Put, Delete } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressIdDto } from './dto/delete-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { OrderAddressService } from './order-address.service';

@Controller('v1/pickup-address')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class OrderAddressController {
  constructor(
    @Inject(OrderAddressService)
    private readonly service: OrderAddressService,
  ) {}

  @Post()
  createAddress(@Body() dto: CreateAddressDto): Promise<void> {
    return this.service.createAddress(dto);
  }

  @Put('/:id')
  updateAddress(
    @Body() dto: UpdateAddressDto,
    @Param() param: AddressIdDto,
  ): Promise<void> {
    dto.id = param.id;
    return this.service.updateAddress(dto);
  }

  @Delete('/:id')
  deleteAddress(@Param() dto: AddressIdDto): Promise<void> {
    return this.service.deleteAddress(dto);
  }
}
