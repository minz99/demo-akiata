import {Component, OnInit} from '@angular/core';
import {TodoQuery} from "../../state/todo/todo-query";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {TodoStore} from "../../state/todo/todo-store";
import {guid} from "@datorama/akita";
import {Todo} from "../../shared/models/todo";
import {map} from "rxjs";
import {TranslationQuery} from "../../state/translation/translation-query";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements  OnInit {

  taskName: string = '';
  dueDate: Date = new Date();
  status: string = '';
  isVisible = false;
  isOkLoading = false;
  dataSearch: string = ''
  todoItems$ = this.todoQuery.selectAll();

  constructor(
    private todoQuery: TodoQuery,
    private todoStore: TodoStore,
    private translateService: TranslateService,
    private translationQuery: TranslationQuery,
    private modalService: NzModalService,
  ) {
  }

  ngOnInit(): void {
    // console.log(Object.keys(StatusEnum))
  }
  showPopup(action: string, editedItem?: Todo): void {
    let modalRef: NzModalRef<TodoItemComponent>;
    switch (action) {
      case 'ADD':
        modalRef = this.modalService.create({
          nzTitle: 'Add Task',
          nzContent: TodoItemComponent,
          nzFooter: [
            {
              label: 'Cancel',
              onClick: () => modalRef.close(),
            },
            {
              label: 'Add',
              type: 'primary',
              onClick: () => {
                const todo = this.convert2Todo(modalRef.getContentComponent())
                if (modalRef.getContentComponent().todoForm.valid) {
                  this.todoStore.add(todo);
                  modalRef.close()
                } else {
                  Object.values(modalRef.getContentComponent().todoForm.controls).forEach(control => {
                    if (control.invalid) {
                      control.markAsDirty();
                      control.updateValueAndValidity({onlySelf: true});
                    }
                  });
                }
                ;
              },
            },
          ],
        });
        break;
      case 'EDIT':
        modalRef = this.modalService.create({
          nzTitle: 'Update Task',
          nzContent: TodoItemComponent,
          nzComponentParams: {
            taskName: editedItem?.taskName,
            dueDate: editedItem?.dueDate,
            status: editedItem?.status
          },
          nzFooter: [
            {
              label: 'Cancel',
              onClick: () => modalRef.close(),
            },
            {
              label: 'Update',
              type: 'primary',
              onClick: () => {
                const todo = this.updateTodo(modalRef.getContentComponent(), editedItem);
                if (modalRef.getContentComponent().todoForm.valid) {
                  this.todoStore.update(todo.id, todo);
                  modalRef.close();
                } else {
                  Object.values(modalRef.getContentComponent().todoForm.controls).forEach(control => {
                    if (control.invalid) {
                      control.markAsDirty();
                      control.updateValueAndValidity({onlySelf: true});
                    }
                  });
                }
                ;
              },
            },
          ],
          nzOkLoading: true
        });
        break;
    }
  }

  search(dataSearch: string) {
    // const statusKey = this.getDataTranslation(dataSearch);
    this.todoItems$ = this.todoQuery.selectAll({
      // filterBy: [(todo: Todo) => todo.taskName.includes(this.dataSearch) || statusKey.includes(todo.status)]
    }).pipe(
        map(todos => {
          /* get current language, by default when app start, current lang is null, so take default lang */
          const currentLanguage = this.translateService.currentLang || this.translateService.defaultLang;
          const statusKey = Object.keys(
            Object.fromEntries(
              Object.entries(
                this.translationQuery.getEntity(currentLanguage) || {}).filter(([key, value]) => value.toLowerCase().includes(dataSearch.toLowerCase()))
            )
          );
          return todos.filter(todo => todo.taskName.toLowerCase().includes(this.dataSearch.toLowerCase()) || statusKey.includes(todo.status));
        })
    )
  }

  getDataTranslation(dataSearch: string) {
    const currentLanguage = this.translateService.currentLang || this.translateService.defaultLang;
    return Object.keys(
      Object.fromEntries(
        Object.entries(
          this.translationQuery.getEntity(currentLanguage) || {}).filter(([key, value]) => value.toLowerCase().includes(dataSearch.toLowerCase()))
      )
    );
  }

  convert2Todo(o: any) {
    return {
      id: o.id || guid(),
      taskName: o.taskName || '',
      dueDate: o.dueDate || new Date(),
      status: o.status || '',
    }
  }

  updateTodo(data: any, todo?: Todo) {
    data.id = todo ? todo.id : '';
    return data;
  }

  showWarning(): void {
    this.isVisible = true;
  }

  handleOk(id: string): void {
    this.todoStore.remove(id);
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 300);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}
