import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Category from '@modules/products/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/products/dtos/ICreateCategoryDTO';

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ code, description }: ICreateCategoryDTO): Promise<Category> {
    if(!code) {
      throw new AppError("The code cannot be empty");
    }

    if(!description) {
      throw new AppError("The description cannot be empty");
    }

    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkDescriptionExists = await this.categoriesRepository.findByDescription(description);

    if (checkDescriptionExists) {
      throw new AppError("This category description already exists");
    }

    const category = await this.categoriesRepository.update({
      code,
      description
    });

    if (!category) {
      throw new AppError("This category code not exists");
    }

    return category;
  }
}

export default UpdateCategoryService;
