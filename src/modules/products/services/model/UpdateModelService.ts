import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Model from '@modules/products/infra/typeorm/entities/Model';
import IModelsRepository from '@modules/products/repositories/IModelsRepository';
import ICreateModelDTO from '@modules/products/dtos/ICreateModelDTO';

@injectable()
class UpdateModelService {
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

    const checkDescriptionExists = await this.modelsRepository.findByDescription(description);

    if (checkDescriptionExists) {
      throw new AppError("This category description already exists");
    }

    const model = await this.modelsRepository.update({
      code,
      description
    });

    if (!model) {
      throw new AppError("This model code not exists");
    }

    return model;
  }
}

export default UpdateModelService;
