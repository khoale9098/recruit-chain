import { Types } from 'mongoose'

import { IPaginateResult, IPagingInput } from '../interface/IPaging'
import { Job } from '../models'
import BaseService from './baseService'
import { encodeWearCharsRegex } from '../interface/helper'
import IJob from '../interface/IJob'

type JobFilter = {
  name: string
  updatedAt: string,

}


class JobService extends BaseService<IJob>{
  async getJobList(filter?: JobFilter, paging?: IPagingInput): Promise<IPaginateResult<IJob>> {
    try {
      const filterGenarate: { [key: string]: any } = filter
      if (filter?.name) {
        filterGenarate.name = {
          $regex: new RegExp(encodeWearCharsRegex(filter.name), 'g'),
        }
      }
      const options = {
        ...(paging
          ? {
            limit: paging.limit,
            page: paging.page,
          }
          : {}),
        populate: 'user company',
        sort: {
          createdAt: -1,
        },
      }
      const result = await Job.paginate(filterGenarate, options)
      return result as IPaginateResult<IJob>
    }
    catch (error) {
      throw error
    }
  }
}
export default new JobService(Job)