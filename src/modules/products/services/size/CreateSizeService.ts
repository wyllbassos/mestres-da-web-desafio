import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Size from '@modules/products/infra/typeorm/entities/Size';
import ISizesRepository from '@modules/products/repositories/ISizesRepository';
import ICreateSizeDTO from '@modules/products/dtos/ICreateSizeDTO';

@injectable()
class CreateSizeService {
  constructor(
    @inject('SizesRepository')
    private sizesRepository: ISizesRepository,
  ) {}

  public async execute({ code, description }: ICreateSizeDTO): Promise<Size> {
    if(!code) {
      throw new AppError("The code cannot be empty");
    }

    if(!description) {
      throw new AppError("The description cannot be empty");
    }

    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkCodeExists = await this.sizesRepository.findByCode(code);
    const checkDescriptionExists = await this.sizesRepository.findByDescription(description);

    if (checkCodeExists) {
      throw new AppError("This size code already exists");
    }
    if (checkDescriptionExists) {
      throw new AppError("This size description already exists");
    }

    const size = await this.sizesRepository.create({
      code,
      description,
    });

    return size;
  }
}

export default CreateSizeService;
