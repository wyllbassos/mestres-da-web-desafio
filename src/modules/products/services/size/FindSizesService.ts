import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Size from '@modules/products/infra/typeorm/entities/Size';
import ISizesRepository from '@modules/products/repositories/ISizesRepository';

interface IRequest {
  code?: string;
  description?: string;
}

type IResponse = Size | Size[] | undefined;

@injectable()
class FindSizesService {
  constructor(
    @inject('SizesRepository')
    private sizesRepository: ISizesRepository,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { code, description } = request

    if (!code && !description) {
      return await this.sizesRepository.find();
    }

    if (code && description) {
      throw new AppError("Only one parameter must be informed code or description");
    }

    if (code) {
      return await this.sizesRepository.findByCode(code);
    }

    if (description) {
      return await this.sizesRepository.findByDescription(description);
    }

    return [];
  }
}

export default FindSizesService;
