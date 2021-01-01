import { EducationResolver } from './IResolver'
import { Education, User } from '../../models'
import { userService, NotificationService } from '../../services'
import { NOTIFICATION_TYPE } from '../../setting/constants'
interface EducationMutaion {
  createEducation: EducationResolver
  updateEducation: EducationResolver
  deleteEducation: EducationResolver
}

const Mutation: EducationMutaion = {
  createEducation: async (_parent, { educationInput }, { me }) => {
    try {
      const education = await Education.create(educationInput)
      if (education) {
        await User.findByIdAndUpdate(
          { _id: me._id },
          { $addToSet: { education: education._id } },
          { new: true }
        )
        await userService.updateReputation(me._id, 'education')
        await NotificationService.createNoti(me._id, me._id, NOTIFICATION_TYPE.FILLED, 'Added Education')
        return education
      }
    }
    catch (err) {
      throw err
    }
  },

  updateEducation: async (_parent, { educationInput, educationId }, { me }) => {
    try {
      const education = await Education.findOneAndUpdate({ _id: educationId }, educationInput, { new: true })
      return education
    }
    catch (err) {
      throw err
    }
  },

  deleteEducation: async (_parent, { educationId }) => {
    try {
      const deleteEducation = await Education.findOneAndDelete({ _id: educationId })
      return deleteEducation
    }
    catch (err) {
      throw err
    }
  }
}

export default { Mutation }
