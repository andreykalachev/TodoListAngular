import { Guid } from 'guid-typescript';
import { Role } from './Role';

export class User {
  constructor(public id: Guid, public name: string, public email: string, public password: string, public role: Role) {
  }
}
