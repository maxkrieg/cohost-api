import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../schema'
import { createUser } from '../db/users'
import { RequestContext } from '../types'
import { RegisterInput } from '../validators/RegisterInput'

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(): Promise<User | null> {
    const user: User = {
      id: 1,
      firstName: 'Max',
      lastName: 'Krieg',
      email: 'max@krieg.com',
    }
    return user
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { email, firstName, lastName, password }: RegisterInput,
    @Ctx() ctx: RequestContext,
  ): Promise<User> {
    const user = await createUser({ email, password, firstName, lastName })
    console.log({ ctx })
    return user
  }
}
