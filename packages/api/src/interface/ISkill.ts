import { Document } from 'mongoose'

interface ISkill extends Document {
  title?: string,
  url?: string,
  attachment: string,
}

export default ISkill