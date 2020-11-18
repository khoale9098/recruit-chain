import { Document, Model } from 'mongoose'

interface Query {
  cond: any
  skip?: number
  limit?: number
  populate?: string
  sort?: string | object
  fields?: string | string[]
}

class BaseService<T extends Document> {
  protected model: Model<T>
  constructor(model: Model<T>) {
    this.model = model
  }

  async count(cond: any): Promise<number> {
    return await this.model.countDocuments(cond)
  }

  get({ cond, skip, limit, populate, sort, fields }: Query): Promise<T[]> {
    const _query = this.model.find(cond)
    if (skip) {
      _query.skip(skip)
    }
    if (limit) {
      _query.limit(limit)
    }
    if (populate) {
      _query.populate(populate)
    }
    if (sort) {
      _query.sort(sort)
    }
    if (fields) {
      _query.select(fields)
    }
    return _query.exec()
  }

  getOne(query: Query): Promise<T> {
    // console.log('query:', query)
    const _query = this.model.findOne(query.cond)
    if (query.populate) {
      _query.populate(query.populate)
    }
    if (query.sort) {
      _query.sort(query.sort)
    }
    if (query.fields) {
      _query.select(query.fields)
    }
    return _query.exec()
  }

  async create(data: object): Promise<T> {
    return await this.model.create(data as any)
  }

  async updateOne(cond: object, data: object): Promise<T> {
    return await this.model.updateOne(cond, data)
  }

  async updateMany(cond: object, data: object): Promise<T> {
    return await this.model.updateMany(cond, data)
  }
}

export default BaseService
