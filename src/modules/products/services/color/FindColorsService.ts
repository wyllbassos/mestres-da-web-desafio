import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Color from '@modules/products/infra/typeorm/entities/Color';
import IColorsRepository from '@modules/products/repositories/IColorsRepository';

interface IRequest {
  code?: string;
  description?: string;
}

type IResponse = Color | Color[] | undefined;

@injectable()
class FindColorsService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute(request: IRequest): Promise<IResponse> {
    const { code, description } = request

    if (!code && !description) {
      return await this.colorsRepository.find();
    }

    if (code && description) {
      throw new AppError("Only one parameter must be informed code or description");
    }

    if (code) {
      return await this.colorsRepository.findByCode(code);
    }

    if (description) {
      return await this.colorsRepository.findByDescription(description);
    }

    return [];
  }
}

export default FindColorsService;
