import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import IColorsRepository from '@modules/products/repositories/IColorsRepository';
import IModelsRepository from '@modules/products/repositories/IModelsRepository';
import ISizesRepository from '@modules/products/repositories/ISizesRepository';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,

    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,

    @inject('SizesRepository')
    private sizesRepository: ISizesRepository,
  ) {}

  public async execute(data: ICreateProductDTO): Promise<Product> {
    const {
      description,
      balance,
      category_code,
      color_code,
      model_code,
      size_code
    } = data;

    if(!description) {
      throw new AppError("The description cannot be empty");
    }

    if(balance === undefined) {
      throw new AppError("The balance cannot be undefined");
    }

    if(!Number.isInteger(balance)) {
      throw new AppError("The balance need be an Integer value");
    }

    if(!category_code) {
      throw new AppError("The category_code cannot be empty");
    }

    if(!color_code) {
      throw new AppError("The color_code cannot be empty");
    }

    if(!model_code) {
      throw new AppError("The model_code cannot be empty");
    }

    if(!size_code) {
      throw new AppError("The size_code cannot be empty");
    }

    const checkCategoryExists = await this.categoriesRepository.findByCode(category_code);
    if (!checkCategoryExists) {
      throw new AppError("This category not exists");
    }

    const checkColorExists = await this.colorsRepository.findByCode(color_code);
    if (!checkColorExists) {
      throw new AppError("This color not exists");
    }

    const checkModelExists = await this.modelsRepository.findByCode(model_code);
    if (!checkModelExists) {
      throw new AppError("This model not exists");
    }

    const checkSizeExists = await this.sizesRepository.findByCode(size_code);
    if (!checkSizeExists) {
      throw new AppError("This size not exists");
    }

    const sku = `${category_code}-${color_code}-${model_code}-${size_code}`;
    const checkSkuExists = await this.productsRepository.findBySku(sku);

    if (checkSkuExists) {
      throw new AppError("This product sku already exists");
    }

    const product = await this.productsRepository.create({
      sku,
      ...data
    });

    return product;
  }
}

export default CreateProductService;
