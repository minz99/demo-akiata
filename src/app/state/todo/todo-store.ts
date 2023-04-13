import {EntityState, EntityStore, Store, StoreConfig} from "@datorama/akita";
import {Todo} from "../../shared/models/todo";
import {Injectable} from "@angular/core";

export interface TodoState extends EntityState<Todo, string> {
}

const initialState = {

};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState> {
  constructor() {
    super(initialState);
  }


}
