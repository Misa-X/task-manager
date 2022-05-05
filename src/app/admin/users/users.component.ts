import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { User } from 'src/app/user/user.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  displayedColumns: string[] = ['username', 'email', 'dateOfBirth', 'phone', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
  ) { }

  // Get all users
  public getAllUsers(){

    this.taskService.getUsers()
     .subscribe((users: any) => {

        const {docs} = users.data;
        this.users  = docs;
        console.log("USERS:",users.data);
        this.dataSource = new MatTableDataSource(docs)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(users.data.docs);

      }
    )
  }

    // delete user
    deleteUser(userId: string){
      this.taskService.deleteUser(userId)
      .subscribe({
        next:(res)=>{
          alert("User successfuly deleted!");
          this.getAllUsers();
        },
        error:() =>{
          alert("Could not delete user!");
        }
      })
    }


  // Filter Users
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

}
