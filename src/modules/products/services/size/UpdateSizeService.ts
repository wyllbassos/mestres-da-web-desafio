import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Size from '@modules/products/infra/typeorm/entities/Size';
import ISizesRepository from '@modules/products/repositories/ISizesRepository';
import ICreateSizeDTO from '@modules/products/dtos/ICreateSizeDTO';

@injectable()
class UpdateSizeService {
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

    const checkDescriptionExists = await this.sizesRepository.findByDescription(description);

    if (checkDescriptionExists) {
      throw new AppError("This category description already exists");
    }

    const size = await this.sizesRepository.update({
      code,
      description
    });

    if (!size) {
      throw new AppError("This size code not exists");
    }

    return size;
  }
}

export default UpdateSizeService;
