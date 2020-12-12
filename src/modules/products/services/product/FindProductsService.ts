import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  sku?: string;
}

type IResponse = Product | Product[] | undefined;

@injectable()
class FindProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { sku } = request

    if (!sku) {
      return await this.productsRepository.find();
    } else {
      if(sku.length !== 19) {
        throw new AppError("The code be have a nineteen chars");
      }

      return await this.productsRepository.findBySku(sku);
    }
  }
}

export default FindProductsService;
