import BaseService from './baseService'
import ICandidate from '../interface/ICandidate'
import IUser from '../interface/IUser'
import IJob from '../interface/IUser'

import { Candidate } from '../models'
import { JOB } from '../setting/constants'


class CandidateService extends BaseService<ICandidate>{
  async createCandidate(me: IUser, jobId: IJob, sharerId: IUser) {
    try {
      let candidate = await Candidate.create({
        candidate: me._id,
        job: jobId,
        sharer: sharerId,
        status: JOB.APPLY_STATUS.RESPONSES
      })
      return candidate
    }
    catch (err) {
      throw err
    }
  }
}

export default new CandidateService(Candidate)