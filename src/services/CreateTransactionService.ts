import { getRepository, getCustomRepository } from 'typeorm'

import Category from './../models/Category'
import CreateCategoryService from './CreateCategoryService'

import TransactionsRepository from './../repositories/TransactionsRepository'
import Transaction, { TransactionType } from './../models/Transaction'

import AppError from './../errors/AppError'

interface Request {
  title: string
  value: number
  type: TransactionType
  categoryTitle: string
}

export default class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryTitle,
  }: Request): Promise<Transaction> {
    const repository = getCustomRepository(TransactionsRepository)
    const transactions = await repository.find()
    const { total } = repository.getBalance(transactions)

    if (type === TransactionType.Outcome && value > total) {
      throw new AppError('It is not possible to create a outcome transaction.')
    }

    let category = await this.findCategory(categoryTitle)

    if (!category) {
      category = await this.createCategory(categoryTitle)
    }

    const transaction = repository.create({
      title,
      value,
      type,
      category_id: category.id,
    })

    await repository.save(transaction)

    return transaction
  }

  private async findCategory(title: string): Promise<Category | undefined> {
    const repository = getRepository(Category)
    const category = await repository.findOne({
      where: { title },
    })

    return category
  }

  private async createCategory(title: string): Promise<Category> {
    const service = new CreateCategoryService()
    const category = await service.execute(title)

    return category
  }
}
