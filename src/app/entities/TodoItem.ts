import { Guid } from 'guid-typescript';
import { User } from './User';

export class TodoItem {
  constructor(public id: Guid, public dateAdded: Date, public dateDone: Date, public title: string,
              public description: string, public isDone: boolean, public addedBy: User) {
  }
}
