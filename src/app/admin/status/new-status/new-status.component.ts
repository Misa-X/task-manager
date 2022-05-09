import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/task.service';
import { Status } from '../status.model';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-status',
  templateUrl: './new-status.component.html',
  styleUrls: ['./new-status.component.css'],
})
export class NewStatusComponent implements OnInit {
  status: Status[] = [];

  actionBtn: string = 'Save';
  actionTitle: string = 'Add new gender';

  taskForm!: FormGroup;

  constructor(
    private formbuildder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private dialogRef: MatDialogRef<NewStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  // Create status
  addStatus() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.taskService.createStatus(this.taskForm.value).subscribe({
          next: (res) => {
            alert('Status successfully added!');
            this.taskForm.reset();
            this.dialogRef.close('save');
            this.router.navigate(['/manageStatus']);
          },
          error: () => {
            alert('Could not add status!');
          },
        });
      }
    } else {
      this.updateStatus();
    }
  }

  // Update status
  updateStatus() {
    this.taskService
      .updateStatus(this.taskForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          alert('Status updated successfully!');
          this.taskForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Could not update status!');
        },
      });
  }

  ngOnInit(): void {
    this.taskForm = this.formbuildder.group({
      name: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.actionTitle = 'Edit status';
      this.taskForm.controls['name'].setValue(this.editData.title);
    }
  }
}
