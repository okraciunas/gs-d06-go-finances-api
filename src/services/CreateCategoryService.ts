import { getRepository } from 'typeorm'

import Category from './../models/Category'

export default class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const repository = getRepository(Category)
    const category = repository.create({ title })

    await repository.save(category)

    return category
  }
}
