import {Component, Injectable, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from "../shared/enums/language-enum";
import {HttpClient} from "@angular/common/http";
import {TranslationQuery} from "../state/translation/translation-query";
import {TranslationStore} from "../state/translation/translation-store";
import {map} from "rxjs";

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
})
export class LanguageSwitchComponent implements OnInit {
  languages = Object.keys(LanguageEnum);

  constructor(
    private translateService: TranslateService,
    private translationStore: TranslationStore,
    private translationQuery: TranslationQuery,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get("/assets/i18n/search/status.json")
      .pipe(
        map(data => {
          return data as Array<Object>;
        })
      )
      .subscribe(data => {
         for (let i = 0; i <data.length; i++) {
           this.translationStore.add(data[i]);
         }
      });
  }

  switchLanguage(event: any) {
    try {
      this.translateService.use(event.target.value);
    } catch (e) {
      console.error('switchLanguage got error', e);
    }
  }

  protected readonly Object = Object;


}
