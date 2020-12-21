import { GraphQLResolveInfo } from 'graphql'

import IUser from 'src/interface/IUser'
import IJob from 'src/interface/IJob'
import ICandidate from 'src/interface/ICandidate'

interface Context {
  me: IUser
  user: IUser
  clientIp: String
}

export type Resolver<Result, Parent = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result

export type UserResolver<R = IUser | IUser[] | null, Parent = never> = Resolver<R, Parent>

export type JobResolver<R = IJob | IJob[] | null | Boolean, Parent = never> = Resolver<R, Parent>

export type CandidateResolver<R = ICandidate | ICandidate[] | number | null, Parent = never> = Resolver<R, Parent>