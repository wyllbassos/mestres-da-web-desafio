import { Entity, Column, PrimaryColumn, Unique, ManyToOne, JoinColumn, AfterInsert, getRepository, PrimaryGeneratedColumn } from 'typeorm';
import BaseColumnsSchemaEntities from '@shared/infra/typeorm/BaseColumnsSchemaEntities';
import Category from './Category';
import Color from './Color';
import Model from './Model';
import Size from './Size';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@Entity('products')
@Unique(['sku'])
class Product extends BaseColumnsSchemaEntities {
  @PrimaryColumn({
    length: 16,
    type: "text",
  })
  sku: string;

  @Column()
  description?: string;

  @Column('int')
  balance: number;

  @Column({ length: 4, type: "text", })
  category_code: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_code' })
  category: Category;

  @Column({ length: 4, type: "text", })
  color_code: string;

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'color_code' })
  color: Color;

  @Column({ length: 4, type: "text", })
  model_code: string;

  @ManyToOne(() => Model)
  @JoinColumn({ name: 'model_code' })
  model: Model;

  @Column({ length: 4, type: "text", })
  size_code: string;

  @ManyToOne(() => Size)
  @JoinColumn({ name: 'size_code' })
  size: Size;
}

export default Product;
/***
    const model = await this.ormRepository.findOne(code);

    if (model) {
      model.description = description
      await this.ormRepository.save(model);
    }

    return model;
 */
