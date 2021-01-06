import { GraphQLResolveInfo } from 'graphql'

import IUser from 'src/interface/IUser'
import IJob from 'src/interface/IJob'
import IEducation from 'src/interface/IEducation'
import ICandidate from 'src/interface/ICandidate'
import IExperience from 'src/interface/IExperience'
import ISkill from 'src/interface/ISkill'
import INotification from 'src/interface/INotification'
import IReview from 'src/interface/IReview'
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

export type EducationResolver<R = IEducation | IEducation[] | null, Parent = never> = Resolver<R, Parent>

export type ExperienceResolver<R = IExperience | IExperience[] | null, Parent = never> = Resolver<R, Parent>

export type SkillResolver<R = ISkill | ISkill[] | null, Parent = never> = Resolver<R, Parent>

export type NotificationResolver<R = INotification | INotification[] | null | Boolean, Parent = never> = Resolver<R, Parent>

export type ReviewResolver<R = IReview | IReview[] | null | Boolean, Parent = never> = Resolver<R, Parent>
