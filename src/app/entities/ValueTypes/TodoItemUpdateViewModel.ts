import {Guid} from 'guid-typescript';

export class TodoItemUpdateViewModel {
  constructor(public id: Guid, public title: string, public description: string) {
  }
}
