import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISizesRepository from '@modules/products/repositories/ISizesRepository';

@injectable()
class DeleteSizeService {
  constructor(
    @inject('SizesRepository')
    private sizesRepository: ISizesRepository,
  ) {}

  public async execute(code: string): Promise<void> {
    if(code.length !== 4) {
      throw new AppError("The code be have a four chars");
    }

    const checkCodeExists = await this.sizesRepository.findByCode(code);

    if (!checkCodeExists) {
      throw new AppError("This size code not exists");
    }

    await this.sizesRepository.delete(code);
  }
}

export default DeleteSizeService;
