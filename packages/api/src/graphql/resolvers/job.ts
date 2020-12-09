import { ApolloError } from 'apollo-server'
import { combineResolvers } from 'graphql-resolvers'
import { JobResolver } from './IResolver'

import { Job } from '../../models'

interface JobQuery {
  job: JobResolver
  // getJobList: JobResolver
}

interface JobMutation {
  createJob: JobResolver
  // deleteJob: JobResolver
  // editJob: JobResolver
}
const Query: JobQuery = {
  job: async (_parent, { id }, { me }) => {
    try {
      const job = await (await Job.findById(id)).populated('user');
      return job
    }
    catch (e) {
      throw e
    }
  },
}

const Mutation: JobMutation = {
  createJob: async (_parent, { jobInput }, { me }) => {
    const job = await Job.create({ ...jobInput, company: me._id })
    return job;
  }
}

export default { Mutation, Query }