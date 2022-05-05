import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { NewStatusComponent } from './new-status/new-status.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { Status } from './status.model';



@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status: Status[] = [];

  displayedColumns: string[] = ['name', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private dialog : MatDialog
  ) { }

  openDialog() {
    this.dialog.open(NewStatusComponent, {
     width: '30%'
    });
  }

  // Get all status
  public getAllStatus(){

    this.taskService.getStatus()
     .subscribe((status: any) => {

        const {docs} = status.data;
        this.status  = docs;
        console.log("STATUS:",status.data.docs);
        this.dataSource = new MatTableDataSource(docs)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(status.data.docs);

      }
    )
  }

    // edit status
    editTask(status: any) {
      console.log("misa",status)
      this.dialog.open(NewStatusComponent, {
        width: '80%',
        data:status
       }).afterClosed().subscribe(val=>{
         if(val==='update'){
           this.getAllStatus();
         }
       })
    }

  // delete status
  deleteStatus(statusId: string){
    this.taskService.deleteStatus(statusId)
    .subscribe({
      next:(res)=>{
        alert("Status successfuly deleted!");
        this.getAllStatus();
      },
      error:() =>{
        alert("Could not delete the status!");
      }
    })
  }

  // Filter status
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllStatus()
  }

}
