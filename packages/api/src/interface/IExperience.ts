import { Document } from 'mongoose'

interface IExperience extends Document {
  job_title?: string,
  companyName?: string,
  employment_type?: string,
  location?: string,
  description?: string,
  media?: string,
  startDate?: Date,
  endDate?: Date,
}

export default IExperience
