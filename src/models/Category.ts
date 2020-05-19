import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Tables } from './../config/Tables'

@Entity(Tables.Categories)
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
