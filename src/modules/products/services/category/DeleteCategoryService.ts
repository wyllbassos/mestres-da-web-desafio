import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(code: string): Promise<void> {
    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkCodeExists = await this.categoriesRepository.findByCode(code);

    if (!checkCodeExists) {
      throw new AppError("This category code not exists");
    }

    await this.categoriesRepository.delete(code);
  }
}

export default DeleteCategoryService;
