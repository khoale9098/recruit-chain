import { isAuthenticated } from './authorization'
import { combineResolvers } from 'graphql-resolvers'
import { JobResolver } from './IResolver'
import { jobService, candidateService } from '../../services'
import { Job, Candidate } from '../../models'

interface JobQuery {
  job: JobResolver
  getJobList: JobResolver
  getJobsById: JobResolver
}

interface JobMutation {
  createJob: JobResolver
  updateJob: JobResolver
  deleteJob: JobResolver
  applyJob: JobResolver
}

const Query: JobQuery = {
  job: async (_parent, { id }, { me }) => {
    try {
      const job = await Job.findById(id).populate([
        {
          path: 'company',
          populate: [
            { path: 'user', model: 'user' },
          ],
        },
      ])
      return job
    }
    catch (e) {
      throw e
    }
  },

  getJobList: combineResolvers(isAuthenticated, async (_parent, { filter, paging }) => {
    try {
      const result = await jobService.getJobList(filter, paging)
      return result
    } catch (error) {
      throw error
    }
  }),

  getJobsById: combineResolvers(isAuthenticated, async (_parent, { filter, paging }, { me }) => {
    try {
      const conditions = { company: me._id }
      const options = {
        lean: true,
        page: paging.page,
        limit: paging.limit,
        populate: 'user company',
      }
      const result = await Job.paginate(conditions, options)
      return result

    } catch (error) {
      throw error
    }
  }),

}
const Mutation: JobMutation = {

  createJob: async (_parent, { jobInput }, { me }) => {
    const job = await Job.create({ ...jobInput, company: me._id })
    return job;
  },

  updateJob: async (_parent, { jobInput, id }, { me }) => {
    try {
      const job = await Job.findOneAndUpdate({ company: me._id, _id: id }, jobInput, { new: true })
      return job
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  deleteJob: async (_parent, { id }, { me }) => {
    try {
      const deleteJob = await Job.findOneAndDelete({ company: me._id, _id: id })
      return deleteJob
    }
    catch (error) {
      throw error
    }
  },

  applyJob: async (_parent, { jobId, companyId, sharerId }, { me }) => {
    try {
      const hasApply = Candidate.find({
        candidate: me._id,
        job: jobId
      })
      if (hasApply) {
        throw new Error("HAS APPLY")
      }
      else {
        const candidate = await candidateService.createCandidate(me, jobId, companyId, sharerId)
        const updateJob = await Job.findByIdAndUpdate(
          jobId,
          { $addToSet: { candidate: candidate._id } },
          { new: true }
        )
        return updateJob
      }
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default { Mutation, Query }