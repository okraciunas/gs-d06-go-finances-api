import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from './../repositories/TransactionsRepository'
import CreateTransactionService from './../services/CreateTransactionService'
import DeleteTransactionService from './../services/DeleteTransactionService'
// import ImportTransactionsService from './../services/ImportTransactionsService';

const router = Router()

router.get('/', async (request, response) => {
  const repository = getCustomRepository(TransactionsRepository)
  const transactions = await repository.find({ relations: ['category'] })
  const balance = repository.getBalance(transactions)

  return response.json({ transactions, balance })
})

router.post('/', async (request, response) => {
  const { title, value, type, category: categoryTitle } = request.body

  const createTransaction = new CreateTransactionService()
  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    categoryTitle,
  })

  return response.json(transaction)
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params

  const deleteTransaction = new DeleteTransactionService()
  await deleteTransaction.execute(id)

  return response.status(204).send()
})

router.post('/import', async (request, response) => {
  // TODO
})

export default router
