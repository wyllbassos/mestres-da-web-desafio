import { getRepository, Repository } from 'typeorm';

import ISizesRepository from '@modules/products/repositories/ISizesRepository';
import ICreateSizeDTO from '@modules/products/dtos/ICreateSizeDTO';

import Size from '../entities/Size';

class SizesRepository implements ISizesRepository {
  private ormRepository: Repository<Size>;

  constructor() {
    this.ormRepository = getRepository(Size);
  }

  public async create({ code, description}: ICreateSizeDTO): Promise<Size> {
    const size = this.ormRepository.create({ code, description });

    await this.ormRepository.save(size);

    return size;
  }

  public async findByCode(code: string): Promise<Size | undefined> {
    const size = await this.ormRepository.findOne(code);

    return size;
  }

  public async findByDescription(description: string): Promise<Size | undefined> {
    const size = await this.ormRepository.findOne({
      where: { description },
    });

    return size;
  }

  public async find(): Promise<Size[]> {
    const sizes = await this.ormRepository.find();

    return sizes;
  }

  public async delete(code: string): Promise<void> {
    await this.ormRepository.delete(code);
  }

  public async update({ code, description }: ICreateSizeDTO): Promise<Size | undefined> {
    const size = await this.ormRepository.findOne(code);

    if (size) {
      size.description = description
      await this.ormRepository.save(size);
    }

    return size;
  }
}

export default SizesRepository;
