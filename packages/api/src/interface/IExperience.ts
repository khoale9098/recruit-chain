import { Document } from 'mongoose'


interface IExperience extends Document {
  job_title?: string,
  companyName?: string,
  establishDate: Date,
}

export default IExperience
