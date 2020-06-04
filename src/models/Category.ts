import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Tables } from './../config/Tables'
import Transaction from './Transaction'

@Entity(Tables.Categories)
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @OneToMany(() => Transaction, transaction => transaction.category)
  transaction: Transaction

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
