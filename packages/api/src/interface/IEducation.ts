import { Document, Types } from 'mongoose'


interface IEducation extends Document {
  summary: string,
  education_org: string,
  media: string,
  field_of_study: string,
  degree: string,
  startDate: string,
  endDate: string
}

export default IEducation
