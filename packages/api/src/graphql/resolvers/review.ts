import { ReviewResolver } from './IResolver'
import { Review, User } from '../../models'

interface SkillMutation {
  createReview: ReviewResolver
}

const Mutation: SkillMutation = {
  createReview: async (_parent, { reviewInput }, { me }) => {
    const { userId, content } = reviewInput
    const input: any = {
      user: userId,
      content,
      creator: me._id
    }
    try {
      const review = await Review.create(input)
      if (review) {
        await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { review: review._id } },
          { new: true }
        )
      }
      return review
    }
    catch (err) {
      throw err
    }
  }
}

export default { Mutation }
