import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IColorsRepository from '@modules/products/repositories/IColorsRepository';

@injectable()
class DeleteColorService {
  constructor(
    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,
  ) {}

  public async execute(code: string): Promise<void> {
    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkCodeExists = await this.colorsRepository.findByCode(code);

    if (!checkCodeExists) {
      throw new AppError("This color code not exists");
    }

    await this.colorsRepository.delete(code);
  }
}

export default DeleteColorService;
