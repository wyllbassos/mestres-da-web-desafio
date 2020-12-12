import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Color from '@modules/products/infra/typeorm/entities/Color';
import IColorsRepository from '@modules/products/repositories/IColorsRepository';
import ICreateColorDTO from '@modules/products/dtos/ICreateColorDTO';

@injectable()
class CreateColorService {
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

    const checkCodeExists = await this.colorsRepository.findByCode(code);
    const checkDescriptionExists = await this.colorsRepository.findByDescription(description);

    if (checkCodeExists) {
      throw new AppError("This color code already exists");
    }
    if (checkDescriptionExists) {
      throw new AppError("This color description already exists");
    }

    const color = await this.colorsRepository.create({
      code,
      description,
    });

    return color;
  }
}

export default CreateColorService;
