import {EntityState, EntityStore, Store, StoreConfig} from "@datorama/akita";
import {Todo} from "../../shared/models/todo";
import {Injectable} from "@angular/core";

export interface TranslationState extends EntityState<Object, string> {
}

const initialState = {

};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'translate' })
export class TranslationStore extends EntityStore<TranslationState> {
  constructor() {
    super(initialState);
  }

}
