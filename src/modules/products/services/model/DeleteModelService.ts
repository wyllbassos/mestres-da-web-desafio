import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IModelsRepository from '@modules/products/repositories/IModelsRepository';

@injectable()
class DeleteModelService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute(code: string): Promise<void> {
    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkCodeExists = await this.modelsRepository.findByCode(code);

    if (!checkCodeExists) {
      throw new AppError("This model code not exists");
    }

    await this.modelsRepository.delete(code);
  }
}

export default DeleteModelService;
