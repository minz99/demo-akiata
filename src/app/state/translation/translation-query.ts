import {Injectable} from "@angular/core";
import {TranslationState, TranslationStore} from "./translation-store";
import {QueryEntity} from "@datorama/akita";

@Injectable({ providedIn: 'root' })
export class TranslationQuery extends QueryEntity<TranslationState>{

  constructor(private translationStore: TranslationStore) {
    super(translationStore);
  }

}
