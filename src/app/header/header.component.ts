import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog : MatDialog, private router: Router) {

  }

  openDialog() {
    this.dialog.open(NewTaskComponent, {
     width: '30%'
    });
  }

  loggedin() {
    return localStorage.getItem('token');
  }

  onLogout() {
    this.router.navigate(['/login']);
    return localStorage.removeItem('token');

  }


  ngOnInit(): void {
  }

}
