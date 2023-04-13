import {Injectable} from "@angular/core";
import {TodoState, TodoStore} from "./todo-store";
import {QueryEntity} from "@datorama/akita";

@Injectable({ providedIn: 'root' })
export class TodoQuery extends QueryEntity<TodoState>{

  constructor(private todoStore: TodoStore) {
    super(todoStore);
  }

}
