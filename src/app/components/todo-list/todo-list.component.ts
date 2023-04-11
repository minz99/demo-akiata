import {Component, OnInit} from '@angular/core';
import {TodoQuery} from "../../state/todo-query";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {TodoStore} from "../../state/todo-store";
import {guid} from "@datorama/akita";
import {Todo} from "../../shared/models/todo";
import {map, Subject} from "rxjs";
import {StatusEnum} from "../../shared/enums/status-enum";

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
    private modalService: NzModalService,
  ) {
  }

  ngOnInit(): void {
    console.log(Object.keys(StatusEnum))
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
    const str = dataSearch.toLowerCase();

    this.todoItems$ = this.todoQuery.selectAll({
      filterBy: [(todo: Todo) => todo.taskName.includes(this.dataSearch) || todo.status.includes(this.dataSearch)]
    });
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
