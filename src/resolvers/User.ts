import { Resolver, Query } from 'type-graphql';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(): Promise<User | null> {
    const user: User = {
      id: 1,
      firstName: 'Max',
      lastName: 'Krieg',
      email: 'max@krieg.com',
    };
    return user;
  }
}
