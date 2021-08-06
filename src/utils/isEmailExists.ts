import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { findUserByEmail } from './../db/users'
// import { User } from '../../../entities/User'

@ValidatorConstraint({ async: true })
export class IsEmailExistsConstraint implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await findUserByEmail(email)
    if (user) return false
    return true
  }
}

export function IsEmailExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailExistsConstraint,
    })
  }
}
