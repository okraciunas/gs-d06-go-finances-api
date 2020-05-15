import { getCustomRepository } from 'typeorm'

import TransactionsRepository from './../repositories/TransactionsRepository'
import Transaction from './../models/Transaction'

import AppError from './../errors/AppError'

export default class DeleteTransactionService {
  public async execute(id: string): Promise<Transaction | undefined> {
    const repository = getCustomRepository(TransactionsRepository)
    const transaction = await repository.findOne(id)

    if (!transaction) {
      throw new AppError('Transaction not found.', 404)
    }

    await repository.remove([transaction])

    return transaction
  }
}
