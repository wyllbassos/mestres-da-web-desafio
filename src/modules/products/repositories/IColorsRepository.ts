import Color from '../infra/typeorm/entities/Color';
import ICreateColorDTO from '../dtos/ICreateColorDTO';

export default interface IColorsRepository {
  create(data: ICreateColorDTO): Promise<Color>;
  find(): Promise<Color[]>;
  findByCode(code: string): Promise<Color | undefined>;
  findByDescription(description: string): Promise<Color | undefined>;
  delete(code: string): Promise<void>;
  update(data: ICreateColorDTO): Promise<Color | undefined>;
// eslint-disable-next-line semi
}
