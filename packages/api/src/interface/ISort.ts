export enum SortType {
  asc = 'asc',
  desc = 'desc'
}

export interface ISortParam {
  field: string
  type: SortType
}

