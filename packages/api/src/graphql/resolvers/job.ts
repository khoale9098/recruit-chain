import { ApolloError } from 'apollo-server'
import { Types } from 'mongoose'
import { isAuthenticated } from './authorization'
import { combineResolvers } from 'graphql-resolvers'
import { JobResolver } from './IResolver'
import { jobService } from '../../services'
import { conditionForDates, encodeWearCharsRegex, multiSort } from '../../interface/helper'
import { Job } from '../../models'

interface JobQuery {
  job: JobResolver
  getJobList: JobResolver
}

interface JobMutation {
  createJob: JobResolver
  updateJob: JobResolver
  deleteJob: JobResolver
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
      console.log('JOB: ', job)
      return job
    }
    catch (e) {
      throw e
    }
  },

  getJobList: combineResolvers(isAuthenticated, async (_parent, { filter, paging }, { me }) => {
    try {
      const result = await jobService.getJobList(filter, paging)
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
    const deleteJob = await Job.findOneAndDelete({ company: me._id, _id: id })
    return deleteJob
  }

}

export default { Mutation, Query }