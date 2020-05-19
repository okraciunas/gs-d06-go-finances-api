import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

import { Tables } from './../../config/Tables'

export default class CreateTransactionsTable1589325004986
  implements MigrationInterface {
  private TABLE_FOREIGN_KEY_NAME = 'CategoryIdToTransactionCategoryId'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: Tables.Transactions,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'double precision',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      Tables.Transactions,
      new TableForeignKey({
        name: this.TABLE_FOREIGN_KEY_NAME,
        columnNames: ['category_id'],
        referencedTableName: Tables.Categories,
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      Tables.Transactions,
      this.TABLE_FOREIGN_KEY_NAME,
    )
    await queryRunner.dropTable(Tables.Transactions)
  }
}
