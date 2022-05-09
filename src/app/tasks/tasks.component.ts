import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user.model';
import { Status } from 'src/app/admin/status/status.model';
import { NewTaskComponent } from './new-task/new-task.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  gender: any[] = [];
  newTask: Task[] = [];
  users: User[] = [];
  status: Status[] = [];

  taskForm!: FormGroup;

  displayedColumns: string[] = [
    'title',
    'content',
    'updatedAt',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder
  ) {
    this.taskForm = this.formbuilder.group({
      status: [''],
      title: [''],
      content: [''],
      assignee: [''],
    });
  }

  editStatus = new FormGroup({
    name: new FormControl(''),
  });

  // get all tasks
  public getAllTasks() {
    this.taskService.getTasks().subscribe((tasks: any) => {
      const {
        docs,
        docs: [
          {
            status: { name },
          },
        ],
      } = tasks.data;
      (this.tasks = docs), name;
      this.dataSource = new MatTableDataSource(docs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(tasks.data.docs);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //get status
  public getStatus() {
    this.taskService.getStatus().subscribe((status: any) => {
      const { docs } = status.data;
      this.status = docs;
    });
  }

  // edit task
  editTask(task: any) {
    this.dialog
      .open(NewTaskComponent, {
        width: '80%',
        data: task,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllTasks();
        }
      });
  }

  onEdit(task: Task) {
    this.taskForm.controls['title'].setValue(task.title);
    this.taskForm.controls['status'].setValue(task.status);
    this.taskForm.controls['content'].setValue(task.content);
    this.taskForm.controls['assignee'].setValue(task.assignee);
  }

  // delete task
  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe({
      next: (res) => {
        alert('Task successfuly deleted!');
        this.getAllTasks();
      },
      error: () => {
        alert('Could not delete the task!');
      },
    });
  }

  // get gender
  public getGender() {
    this.taskService.getGender().subscribe((gender: any) => {
      console.log(gender);
      this.gender = gender;
    });
  }

  //update task status
  updateTask(taskId: any) {
    this.taskService.updateTask(this.taskForm.value, taskId).subscribe({
      next: (res) => {
        alert('Task updated successfully!');
        console.log(res);
      },
      error: () => {
        alert('Could not update task!');
      },
    });
  }

  ngOnInit() {
    this.getAllTasks();
    this.getStatus();
  }
}
