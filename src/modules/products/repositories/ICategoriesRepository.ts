import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  find(): Promise<Category[]>;
  findByCode(code: string): Promise<Category | undefined>;
  findByDescription(description: string): Promise<Category | undefined>;
  delete(code: string): Promise<void>;
  update(data: ICreateCategoryDTO): Promise<Category | undefined>;
// eslint-disable-next-line semi
}
