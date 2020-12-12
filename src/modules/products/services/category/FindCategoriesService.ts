import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Category from '@modules/products/infra/typeorm/entities/Category';
import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';

interface IRequest {
  code?: string;
  description?: string;
}

type IResponse = Category | Category[] | undefined;

@injectable()
class FindCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { code, description } = request

    if (!code && !description) {
      return await this.categoriesRepository.find();
    }

    if (code && description) {
      throw new AppError("Only one parameter must be informed code or description");
    }

    if (code) {
      return await this.categoriesRepository.findByCode(code);
    }

    if (description) {
      return await this.categoriesRepository.findByDescription(description);
    }

    return [];
  }
}

export default FindCategoriesService;
