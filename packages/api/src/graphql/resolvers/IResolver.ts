import { GraphQLResolveInfo } from 'graphql'

import IUser from 'src/interface/IUser'

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
