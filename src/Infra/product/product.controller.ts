import { AuthGuard } from '@nestjs/passport';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterTagDto } from './dto/register-tag.dto';

@Controller('v1/product')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class ProductController {
  constructor(
    @Inject(ProductService) private readonly productService: ProductService,
  ) {}

  @Post('category')
  registerProductCategory(
    @Body() dto: RegisterProductCategoryDto,
  ): Promise<void> {
    return this.productService.registerProductCategory(dto);
  }

  @Post('tag')
  registerTag(@Body() dto: RegisterTagDto): Promise<void> {
    return this.productService.registerTag(dto);
  }
}
