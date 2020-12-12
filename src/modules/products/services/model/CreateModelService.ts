import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Model from '@modules/products/infra/typeorm/entities/Model';
import IModelsRepository from '@modules/products/repositories/IModelsRepository';
import ICreateModelDTO from '@modules/products/dtos/ICreateModelDTO';

@injectable()
class CreateModelService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute({ code, description }: ICreateModelDTO): Promise<Model> {
    if(!code) {
      throw new AppError("The code cannot be empty");
    }

    if(!description) {
      throw new AppError("The description cannot be empty");
    }

    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkCodeExists = await this.modelsRepository.findByCode(code);
    const checkDescriptionExists = await this.modelsRepository.findByDescription(description);

    if (checkCodeExists) {
      throw new AppError("This model code already exists");
    }
    if (checkDescriptionExists) {
      throw new AppError("This model description already exists");
    }

    const model = await this.modelsRepository.create({
      code,
      description,
    });

    return model;
  }
}

export default CreateModelService;
