import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

import { Tables } from './../'

export default class AddTypeColumnToTransactions1589327675216
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      Tables.Transactions,
      new TableColumn({
        name: 'type',
        type: 'varchar',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(Tables.Transactions, 'type')
  }
}
