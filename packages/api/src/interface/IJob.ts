import { Document, Types } from 'mongoose'


interface IJob extends Document {
  title?: string,
  company?: Types.ObjectId | IJob,
  salaryFrom?: number,
  salaryTo?: number,
  description?: string,
  requirement?: string,
  expiredAt?: Date,
  location?: string,
  slug?: string,
  status?: number,
  isPin?: boolean,
  category?: string,
  keyword?: string,
}

export default IJob
