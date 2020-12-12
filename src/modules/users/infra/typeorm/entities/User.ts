import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import BaseColumnsSchemaEntities from '@shared/infra/typeorm/BaseColumnsSchemaEntities';
@Entity('users')
class User extends BaseColumnsSchemaEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
