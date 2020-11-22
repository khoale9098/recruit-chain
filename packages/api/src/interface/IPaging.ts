import { PaginateModel, Document } from 'mongoose'

export interface IPagingInput {
  limit: number
  page: number
}

export interface IPaginateResult<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page?: number
  pages?: number
  offset?: number
  [customLabel: string]: T[] | number | undefined
}

export interface IPagingModel<T extends Document> extends PaginateModel<T> { }
