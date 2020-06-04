import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import multer from 'multer'

import Transaction from './../models/Transaction'
import TransactionsRepository from './../repositories/TransactionsRepository'
import CreateTransactionService, {
  TransactionRequest,
} from './../services/CreateTransactionService'
import DeleteTransactionService from './../services/DeleteTransactionService'
import ImportTransactionsService from './../services/ImportTransactionsService'

const router = Router()
const upload = multer({})

const createTransaction = async ({
  title,
  value,
  type,
  categoryTitle,
}: TransactionRequest): Promise<Transaction> => {
  const service = new CreateTransactionService()
  const transaction = await service.execute({
    title,
    value,
    type,
    categoryTitle,
  })

  return transaction
}

const createMultipleTransactions = async (
  transactionsData: TransactionRequest[],
  transactions: Transaction[] = [],
  current = 0,
): Promise<Transaction[]> => {
  const transaction = await createTransaction(transactionsData[current])
  transactions.push(transaction)
  current++

  if (current === transactionsData.length) {
    return new Promise(resolve => {
      resolve(transactions)
    })
  } else {
    return createMultipleTransactions(transactionsData, transactions, current)
  }
}

router.get('/', async (request, response) => {
  const repository = getCustomRepository(TransactionsRepository)
  const transactions = await repository.find()
  const balance = repository.getBalance(transactions)

  return response.json({ transactions, balance })
})

router.post('/', async (request, response) => {
  const { title, value, type, category: categoryTitle } = request.body
  const transaction = await createTransaction({
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

router.post('/import', upload.single('file'), async (request, response) => {
  const { originalname: csvFileName } = request.file

  const importCSVTransactions = new ImportTransactionsService()
  const csvTransactionsData = await importCSVTransactions.execute(csvFileName)

  const transactions = await createMultipleTransactions(csvTransactionsData)

  return response.json(transactions)
})

export default router
