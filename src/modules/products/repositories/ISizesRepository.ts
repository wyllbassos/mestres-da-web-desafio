import Size from '../infra/typeorm/entities/Size';
import ICreateSizeDTO from '../dtos/ICreateSizeDTO';

export default interface ISizesRepository {
  create(data: ICreateSizeDTO): Promise<Size>;
  find(): Promise<Size[]>;
  findByCode(code: string): Promise<Size | undefined>;
  findByDescription(description: string): Promise<Size | undefined>;
  delete(code: string): Promise<void>;
  update(data: ICreateSizeDTO): Promise<Size | undefined>;
// eslint-disable-next-line semi
}
