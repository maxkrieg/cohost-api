import { PasswordInput } from './PasswordInput'
import { Length, IsEmail } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { IsEmailExists } from '../utils/isEmailExists'

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailExists({ message: 'User with email $value already exists' })
  email: string
}
