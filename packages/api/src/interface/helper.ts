import moment from 'moment'
import IUser from './IUser'
import { SortType, ISortParam } from './ISort'

export function isUser(user: IUser | any): user is IUser {
  return user && user._id
}

export function encodeWearCharsRegex(value: string): string {
  if (!value) {
    return ''
  }
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const conditionForDates = (dates: Date[], field: string = 'createdAt') => {
  const [beginDate = null, endDate = null] = dates || []
  switch (dates?.length) {
    case 2:
      return {
        [field]: {
          $gte: beginDate,
          $lte: endDate,
        },
      }
    case 1:
      return {
        [field]: {
          $gte: moment(beginDate).startOf('day').toDate(),
          $lte: moment(beginDate).endOf('day').toDate(),
        },
      }
    case 0:
    default:
      return null
  }
}

export const multiSort = (sort: ISortParam[]) =>
  Array.isArray(sort) && sort.length
    ? sort.reduce((accumulator: any, { field, type }) => {
      accumulator[field] = type === SortType.desc ? -1 : 1
      return accumulator
    }, {})
    : {}
