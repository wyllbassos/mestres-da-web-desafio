import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import BaseColumnsSchemaDataBase from './BaseColumnsSchemaDataBase';

export default class CreateProducts1604522048377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'sku',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isGenerated: true,
          },
          {
            name: 'balance',
            type: 'INTEGER',
          },
          {
            name: 'category_code',
            type: 'varchar',
          },
          {
            name: 'color_code',
            type: 'varchar',
          },
          {
            name: 'model_code',
            type: 'varchar',
          },
          {
            name: 'size_code',
            type: 'varchar',
          },
          ...BaseColumnsSchemaDataBase,
        ],
      }),
    );
    await queryRunner.createForeignKey('products', new TableForeignKey({
      name: 'ProductCategory',
      columnNames: ['category_code'],
      referencedTableName: 'categories',
      referencedColumnNames: ['code'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
    await queryRunner.createForeignKey('products', new TableForeignKey({
      name: 'ProductColor',
      columnNames: ['color_code'],
      referencedTableName: 'colors',
      referencedColumnNames: ['code'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
    await queryRunner.createForeignKey('products', new TableForeignKey({
      name: 'ProductModel',
      columnNames: ['model_code'],
      referencedTableName: 'models',
      referencedColumnNames: ['code'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
    await queryRunner.createForeignKey('products', new TableForeignKey({
      name: 'ProductSize',
      columnNames: ['size_code'],
      referencedTableName: 'sizes',
      referencedColumnNames: ['code'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropForeignKey('products', 'ProductSize'); // for postgres
    // await queryRunner.dropForeignKey('products', 'ProductModel'); // for postgres
    // await queryRunner.dropForeignKey('products', 'ProductColor'); // for postgres
    // await queryRunner.dropForeignKey('products', 'ProductCategory'); // for postgres
    await queryRunner.dropTable('products');
  }
}
