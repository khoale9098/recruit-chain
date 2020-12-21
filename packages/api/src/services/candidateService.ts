import BaseService from './baseService'
import ICandidate from '../interface/ICandidate'
import IUser from '../interface/IUser'
import IJob from '../interface/IUser'

import { Candidate } from '../models'
import { JOB } from '../setting/constants'


class CandidateService extends BaseService<ICandidate>{
  async createCandidate(me: IUser, jobId: IJob, companyId: IUser, sharerId: IUser) {
    try {
      let candidate = await Candidate.create({
        candidate: me._id,
        job: jobId,
        sharer: sharerId,
        companyApply: companyId,
        status: JOB.APPLY_STATUS.RESPONSES
      })
      return candidate
    }
    catch (err) {
      throw err
    }
  }

  async getCandidateList(me: IUser, optionalCond: any, limit = 20, offset = 0) {
    return await Candidate.aggregate([
      {
        $lookup: {
          from: 'user',
          localField: 'candidate',
          foreignField: '_id',
          as: 'candidate',
        }
      },
      { $unwind: '$candidate' },
      {
        $lookup: {
          from: 'job',
          localField: 'job',
          foreignField: '_id',
          as: 'job',
        },
      },
      { $unwind: '$job' },
      {
        $lookup: {
          from: 'user',
          localField: 'companyApply',
          foreignField: '_id',
          as: 'companyApply',
        },
      },
      { $unwind: '$companyApply' },
      { $match: { $and: optionalCond } },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      { $skip: offset },
    ])
  }
}

export default new CandidateService(Candidate)