import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Gender } from './gender.model';
import { NewGenderComponent } from './new-gender/new-gender.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
})
export class GenderComponent implements OnInit {
  gender: Gender[] = [];

  displayedColumns: string[] = ['name', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(NewGenderComponent, {
      width: '30%',
    });
  }

  // Get all Gender
  public getAllGender() {
    this.taskService.getGender().subscribe((gender: any) => {
      const { docs } = gender.data;
      this.gender = docs;
      this.dataSource = new MatTableDataSource(docs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // edit gender
  editTask(gender: any) {
    this.dialog
      .open(NewGenderComponent, {
        width: '80%',
        data: gender,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllGender();
        }
      });
  }

  // delete gender
  deleteGender(genderId: string) {
    this.taskService.deleteGender(genderId).subscribe({
      next: (res) => {
        alert('Gender successfuly deleted!');
        this.getAllGender();
      },
      error: () => {
        alert('Could not delete the gender!');
      },
    });
  }

  // Filter gender
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllGender();
  }
}
