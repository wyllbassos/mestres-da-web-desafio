import Model from '../infra/typeorm/entities/Model';
import ICreateModelDTO from '../dtos/ICreateModelDTO';

export default interface IModelsRepository {
  create(data: ICreateModelDTO): Promise<Model>;
  find(): Promise<Model[]>;
  findByCode(code: string): Promise<Model | undefined>;
  findByDescription(description: string): Promise<Model | undefined>;
  delete(code: string): Promise<void>;
  update(data: ICreateModelDTO): Promise<Model | undefined>;
// eslint-disable-next-line semi
}
