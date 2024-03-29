import { ProductCategoryRepositoryInterface } from '@repo/product-category-repository.interface';
import { RegisterProductCategoryDto } from './register-product-category-use-case.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { ProductCategory } from '@domain/entities';

@Injectable()
export class RegisterProductCategoryUseCase
	implements IUseCase<RegisterProductCategoryDto, Result<void>>
{
	constructor(
		@Inject('ProductCategoryRepository')
		private readonly categoryRepo: ProductCategoryRepositoryInterface
	) {}

	async execute(dto: RegisterProductCategoryDto): Promise<Result<void>> {
		//
		const categoryOrError = ProductCategory.create({
			description: dto.description
		});

		if (categoryOrError.isFailure) {
			return Result.fail<void>(categoryOrError.error as string);
		}
		//
		try {
			const alreadyExistCategory = await this.categoryRepo.exists({
				description: dto.description
			});

			if (alreadyExistCategory) {
				return Result.fail<void>('Category already exists');
			}

			const category = categoryOrError.getResult();

			await this.categoryRepo.save(category);

			return Result.ok<void>();
			//
		} catch (error) {
			//

			return Result.fail<void>(
				'Internal Server Error on Register Product Category Use Case'
			);
		}
	}
}
