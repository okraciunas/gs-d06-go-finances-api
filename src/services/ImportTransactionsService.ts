import fs from 'fs'
import path from 'path'
import csvParser from 'csv-parse'

import { TransactionRequest } from './../services/CreateTransactionService'

export default class ImportTransactionsService {
  private csvProperties: string[] = []

  public async execute(csvFileName: string): Promise<TransactionRequest[]> {
    const csvFilePath = path.resolve(__dirname, '..', '__tests__', csvFileName)
    const csvData = this.loadCSV(csvFilePath)

    return csvData
  }

  private async loadCSV(csvFilePath: string): Promise<TransactionRequest[]> {
    const readStream = fs.createReadStream(csvFilePath)
    const parseStream = csvParser({
      from_line: 1,
      ltrim: true,
      rtrim: true,
    })

    const csvParsed: TransactionRequest[] = []
    let isCSVFirstLine = false

    const parseCSV = readStream.pipe(parseStream)
    parseCSV.on('data', line => {
      if (!isCSVFirstLine) {
        this.csvProperties.push(...line)
        isCSVFirstLine = true
      } else {
        const data = this.getTransactionData(line)
        return csvParsed.push(data)
      }
    })

    await new Promise(resolve => {
      parseCSV.on('end', resolve)
    })

    return csvParsed
  }

  private getTransactionData(data: string[]): TransactionRequest {
    const transactionData = this.csvProperties.reduce(
      (accumulator, property, index) => {
        let key: string = property
        let value: any = data[index]

        if (key === 'category') key = 'categoryTitle'

        if (key === 'value') value = Number(value)

        return Object.defineProperty(accumulator, key, {
          value,
          writable: true,
          enumerable: true,
          configurable: true,
        })
      },
      {},
    )

    return transactionData as TransactionRequest
  }
}
