import { EntityRepository, Repository } from 'typeorm'

import Transaction, { TransactionType } from './../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

@EntityRepository(Transaction)
export default class TransactionsRepository extends Repository<Transaction> {
  public getBalance(transactions: Transaction[]): Balance {
    return transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        let { income, outcome } = balance
        const { type, value } = transaction

        if (type === TransactionType.Income) {
          income += value
        } else if (type === TransactionType.Outcome) {
          outcome += value
        }

        const total =
          Math.round((income - outcome + Number.EPSILON) * 100) / 100

        return {
          income,
          outcome,
          total,
        }
      },
      { income: 0, outcome: 0, total: 0 },
    )
  }
}
