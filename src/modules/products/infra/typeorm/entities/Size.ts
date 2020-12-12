import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';
import BaseColumnsSchemaEntities from '@shared/infra/typeorm/BaseColumnsSchemaEntities';

@Entity('sizes')
@Unique(['code', 'description'])
class Size extends BaseColumnsSchemaEntities {
  @PrimaryColumn({
    length: 4,
    type: "text",
  })
  code: string;

  @Column()
  description: string;
}

export default Size;
