import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/products/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/products/dtos/ICreateCategoryDTO';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({ code, description}: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ code, description });

    await this.ormRepository.save(category);

    return category;
  }

  public async findByCode(code: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(code);

    return category;
  }

  public async findByDescription(description: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { description },
    });

    return category;
  }

  public async find(): Promise<Category[]> {
    const categories = await this.ormRepository.find();

    return categories;
  }

  public async delete(code: string): Promise<void> {
    await this.ormRepository.delete(code);
  }

  public async update({ code, description }: ICreateCategoryDTO): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(code);

    if (category) {
      category.description = description
      await this.ormRepository.save(category);
    }

    return category;
  }
}

export default CategoriesRepository;
