import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import BaseColumnsSchemaDataBase from './BaseColumnsSchemaDataBase';

export default class CreateModels1604522048375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'models',
        columns: [
          {
            name: 'code',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isUnique: true,
          },
          ...BaseColumnsSchemaDataBase,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('models');
  }
}
