import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Color from '@modules/products/infra/typeorm/entities/Color';
import IColorsRepository from '@modules/products/repositories/IColorsRepository';
import ICreateColorDTO from '@modules/products/dtos/ICreateColorDTO';

@injectable()
class UpdateColorService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute({ code, description }: ICreateColorDTO): Promise<Color> {
    if(!code) {
      throw new AppError("The code cannot be empty");
    }

    if(!description) {
      throw new AppError("The description cannot be empty");
    }

    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkDescriptionExists = await this.colorsRepository.findByDescription(description);

    if (checkDescriptionExists) {
      throw new AppError("This category description already exists");
    }

    const color = await this.colorsRepository.update({
      code,
      description
    });

    if (!color) {
      throw new AppError("This color code not exists");
    }

    return color;
  }
}

export default UpdateColorService;
