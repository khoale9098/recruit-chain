import { Document, Types } from 'mongoose'


interface IEducation extends Document {
  summary: string,
  education_org: string,
  degrees: [string],
  startDate: Date,
  endDate: Date
}

export default IEducation
