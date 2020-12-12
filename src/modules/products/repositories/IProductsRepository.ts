import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  find(): Promise<Product[]>;
  findBySku(sku: string): Promise<Product | undefined>;
  delete(code: string): Promise<void>;
  update(data: IUpdateProductDTO): Promise<Product | undefined>;
  // eslint-disable-next-line semi
}
