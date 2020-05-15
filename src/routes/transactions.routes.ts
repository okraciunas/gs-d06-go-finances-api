import { Router } from 'express'
import { getCustomRepository } from 'typeorm'

import TransactionsRepository from './../repositories/TransactionsRepository'
import CreateTransactionService from './../services/CreateTransactionService'
// import DeleteTransactionService from './../services/DeleteTransactionService';
// import ImportTransactionsService from './../services/ImportTransactionsService';

const router = Router()

router.get('/', async (request, response) => {
  const repository = getCustomRepository(TransactionsRepository)
  const transactions = await repository.find()
  const balance = await repository.getBalance(transactions)

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
  // TODO
})

router.post('/import', async (request, response) => {
  // TODO
})

export default router
