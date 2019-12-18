import { Guid } from 'guid-typescript';
import { Role } from '../Role';

export class RegistrationViewModel {
  constructor(public name: string, public email: string, public password: string, public repeatPassword: string, public role: Role) {
  }
}
