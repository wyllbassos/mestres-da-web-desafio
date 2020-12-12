import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Model from '@modules/products/infra/typeorm/entities/Model';
import IModelsRepository from '@modules/products/repositories/IModelsRepository';

interface IRequest {
  code?: string;
  description?: string;
}

type IResponse = Model | Model[] | undefined;

@injectable()
class FindModelsService {
  constructor(
    @inject('ModelsRepository')
    private modelsRepository: IModelsRepository,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { code, description } = request

    if (!code && !description) {
      return await this.modelsRepository.find();
    }

    if (code && description) {
      throw new AppError("Only one parameter must be informed code or description");
    }

    if (code) {
      return await this.modelsRepository.findByCode(code);
    }

    if (description) {
      return await this.modelsRepository.findByDescription(description);
    }

    return [];
  }
}

export default FindModelsService;
