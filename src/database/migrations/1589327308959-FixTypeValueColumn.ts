import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

import { Tables } from './../'

export default class FixTypeValueColumn1589327308959
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(Tables.Transactions, 'value')

    await queryRunner.addColumn(
      Tables.Transactions,
      new TableColumn({
        name: 'value',
        type: 'real',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(Tables.Transactions, 'value')

    await queryRunner.addColumn(
      Tables.Transactions,
      new TableColumn({
        name: 'value',
        type: 'numeric',
      }),
    )
  }
}
