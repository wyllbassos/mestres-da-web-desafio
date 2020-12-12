 import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity('BaseColumnsSchema')
  class BaseColumnsSchema {
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
  }

  export default BaseColumnsSchema;
