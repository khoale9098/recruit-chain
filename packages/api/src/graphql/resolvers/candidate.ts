import { Types } from 'mongoose'
import { isAuthenticated } from './authorization'
import { combineResolvers } from 'graphql-resolvers'
import { CandidateResolver, Resolver } from './IResolver'
import { Candidate, User } from '../../models'
import { candidateService } from '../../services'
import { JOB } from '../../setting/constants'

interface CandidateMutation {
  changeStatus: CandidateResolver
}

interface CandidateQuery {
  getListCandidate: CandidateResolver
  countCandidateByStatus: CandidateResolver
}


const Mutation: CandidateMutation = {
  changeStatus: async (_parent, { status, candidateId }) => {
    try {
      const updateCandidate = await Candidate.findByIdAndUpdate({ _id: candidateId }, { status }, { new: true })
      if (updateCandidate.status === JOB.APPLY_STATUS.ACCEPTED) {
        await candidateService.fakeSmartContract(updateCandidate.candidate, updateCandidate.sharer, updateCandidate.job)
      }
      return updateCandidate
    }
    catch (err) {
      throw err
    }
  }
}

const Query: CandidateQuery = {
  getListCandidate: combineResolvers(isAuthenticated, async (_parent, { status, limit = 30, offset = 0 }, { me }) => {
    try {
      const cond = [{ 'companyApply._id': new Types.ObjectId(me._id), ...(Object.values(JOB.APPLY_STATUS).includes(status) ? { status } : {}) }]
      return await candidateService.getCandidateList(me, cond, limit, offset)
    } catch (err) {
      throw err
    }
  }),
  countCandidateByStatus: async (_parent, { status }, { me }) => {
    try {
      const candidateNo = Candidate.countDocuments({ status, companyApply: me._id })
      return candidateNo
    }
    catch (err) {
      console.timeLog(err)
      throw err
    }
  }
}


export default { Mutation, Query }