import { ExperienceResolver } from './IResolver'
import { Experience, User } from '../../models'

interface ExperienceMutaion {
  createExperience: ExperienceResolver
  updateExperience: ExperienceResolver
}

const Mutation: ExperienceMutaion = {
  createExperience: async (_parent, { expInput }, { me }) => {
    try {
      const exp = await Experience.create(expInput)
      if (exp) {
        await User.findByIdAndUpdate(
          { _id: me._id },
          { $addToSet: { experience: exp._id } },
          { new: true }
        )
      }
      return exp
    }
    catch (err) {
      throw err
    }
  },

  updateExperience: async (_parent, { expInput, expId }, { me }) => {
    try {
      const updateExp = await Experience.findOneAndUpdate({ _id: expId }, expInput, { new: true })
      return updateExp
    }
    catch (err) {
      throw err
    }
  },
}

export default { Mutation }
