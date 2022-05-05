import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/task.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { Status } from 'src/app/admin/status/status.model';
import { Task } from '../task.model';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  users: User[] = [];
  status: Status[] = [];
  task: Task[] = [];

  actionBtn: string = "Save";

  taskForm !: FormGroup;

  constructor(private formbuildder : FormBuilder,
    private taskService:TaskService,
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<NewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }

  ngOnInit(): void {
    //add form validations
    this.taskForm = this.formbuildder.group({
      title : ['', Validators.required],
      status : ['', Validators.required],
      content : ['', Validators.required],
      assignee : ['', Validators.required],

    })

    this.getAllUsers();
    this.getStatus();

    if(this.editData) {
      this.actionBtn = "Update";
      this.taskForm.controls['title'].setValue(this.editData.title);
      this.taskForm.controls['status'].setValue(this.editData.status);
      this.taskForm.controls['content'].setValue(this.editData.content);
      this.taskForm.controls['assignee'].setValue(this.editData.assignee);
    }

    console.log("data from:",this.editData)
  }

  getStatus() {
    this.taskService.getStatus()
    .subscribe((status: any) => {

      const{docs} = status.data;
      this.status = docs;
      console.log("test status", this.status);
    })
  }

  // Get all users
  async getAllUsers() {
    console.log("method called")
    const users = await this.userService.getUsers()
      users.subscribe((users: any) => {
        console.log("data", users)

        const {docs } = users.data;
        this.users = docs;
        console.log("userd",this.users);
      }
      )
  }


  // Create task
  addTask() {
    if(!this.editData){
      if(this.taskForm.valid) {
        this.taskService.createTask(this.taskForm.value)
        .subscribe({
          next:(res)=>{
            alert("Task successfully added!");
            this.taskForm.reset();
            this.dialogRef.close('save');
            this.router.navigate(['/tasks']);
          },
          error:()=>{
            alert("Could not add task!")
          }
        })
      }
    } else{
      this.updateTask()

    }
  }

  updateTask() {
    this.taskService.updateTask(this.taskForm.value, this.editData._id)
    .subscribe({
      next:(res) =>{
        alert("Task updated successfully!");
        this.taskForm.reset();
        this.dialogRef.close('update');
      },
      error: () =>{
        alert("Could not update task!");
      }
    })
  }

}
