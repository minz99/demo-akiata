import {Component, Injectable, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from "../shared/enums/language-enum";

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
})
export class LanguageSwitchComponent {
  supportedLanguages = ['vi', 'en'];
  // language: string | undefined;
  languages = Object.keys(LanguageEnum);

  constructor(private translateService: TranslateService) {
  }

  switchLanguage(event: any) {
    try {
      this.translateService.use(event.target.value);
    } catch (e) {
      console.error(e);
    }
  }

  protected readonly Object = Object;
}
