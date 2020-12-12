import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(sku: string): Promise<void> {
    if(sku.length !== 19) {
      throw new AppError("The sku be have a nineteen chars");
    }

    const checkSkuExists = await this.productsRepository.findBySku(sku);

    if (!checkSkuExists) {
      throw new AppError("This product sku not exists");
    }

    await this.productsRepository.delete(sku);
  }
}

export default DeleteProductService;
