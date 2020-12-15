import { Document, Types } from 'mongoose'


interface IJob extends Document {
  title?: string,
  company?: Types.ObjectId | IJob,
  salaryFrom?: string,
  salaryTo?: string,
  description?: string,
  requirement?: string,
  expiredAt?: Date,
  location?: string,
  vacancies?: number,
  slug?: string,
  status?: number,
  isPin?: boolean,
  category?: string,
  keyword?: string,
  tokenBonus?: number
}

export default IJob
