import {Component, inject, Inject, Input, OnInit} from '@angular/core';
import {StatusEnum} from "../../../shared/enums/status-enum";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalRef} from "ng-zorro-antd/modal";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  taskName: string = '';
  dueDate: Date = new Date();
  status: string = '';
  statusList: string[] = [];
  todoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder
  ) {
  }
  ngOnInit(): void {
    this.statusList = Object.keys(StatusEnum);
    this.todoForm = this.fb.group({
      taskName: [null, [Validators.required]],
      dueDate: [null, Validators.required],
      status: [null, Validators.required],
    });
  }
}


