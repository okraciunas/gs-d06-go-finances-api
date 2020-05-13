import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

import { Tables } from './../'

export class ChangeValueType1589330052478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(Tables.Transactions, 'value')

    await queryRunner.addColumn(
      Tables.Transactions,
      new TableColumn({
        name: 'value',
        type: 'money',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(Tables.Transactions, 'value')

    await queryRunner.addColumn(
      Tables.Transactions,
      new TableColumn({
        name: 'value',
        type: 'rel',
      }),
    )
  }
}
