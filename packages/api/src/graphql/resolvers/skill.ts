import { SkillResolver } from './IResolver'
import { Skill, User } from '../../models'

interface SkillMutation {
  createSkill: SkillResolver
  // updateSkill: SkillResolver
}

const Mutation: SkillMutation = {
  createSkill: async (_parent, { skillInput }, { me }) => {
    try {
      const skill = await Skill.create(skillInput)
      if (skill) {
        await User.findByIdAndUpdate(
          { _id: me._id },
          { $addToSet: { skill: skill._id } },
          { new: true }
        )
      }
      return skill
    }
    catch (err) {
      throw err
    }
  },

  // updateSkill: async (_parent, { skillInput, skillId }, { me }) => {
  //   try {
  //     const updateExp = await Skill.findOneAndUpdate({ _id: skillId }, skillInput, { new: true })
  //     return updateExp
  //   }
  //   catch (err) {
  //     throw err
  //   }
  // },
}

export default { Mutation }