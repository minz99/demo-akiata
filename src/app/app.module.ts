import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {vi_VN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LanguageSwitchComponent} from './translation/language-switch.component';
import {LanguageEnum} from "./shared/enums/language-enum";
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzModalModule, NzModalRef} from "ng-zorro-antd/modal";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import { TodoItemComponent } from './components/todo-list/todo-item/todo-item.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {TransformPipe} from "./shared/services/transform-pipe";
import {NzSpaceModule} from "ng-zorro-antd/space";

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LanguageSwitchComponent,
    TodoItemComponent,
    TransformPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzGridModule,
    NzLayoutModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],

      },
      defaultLanguage: LanguageEnum.vi
    }),
    NzInputModule,
    NzDatePickerModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDropDownModule,
    NzSpaceModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: vi_VN},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
