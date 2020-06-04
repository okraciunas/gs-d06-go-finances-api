import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { Tables } from './../config/Tables'
import Category from './Category'

export enum TransactionType {
  Income = 'income',
  Outcome = 'outcome',
}

@Entity(Tables.Transactions)
export default class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  type: TransactionType

  @Column()
  value: number

  @Column()
  category_id: string

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
