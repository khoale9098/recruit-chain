import { isAuthenticated } from './authorization'
import { combineResolvers } from 'graphql-resolvers'
import { CandidateResolver } from './IResolver'
import { Candidate } from '../../models'

interface CandidateMutation {
  changeStatus: CandidateResolver
}

const Mutation: CandidateMutation = {
  changeStatus: async (_parent, { status, candidateId }) => {
    try {
      const updateCandidate = Candidate.findByIdAndUpdate({ _id: candidateId }, { status }, { new: true })
      return updateCandidate
    }
    catch (err) {
      throw err
    }
  }
}
export default { Mutation }