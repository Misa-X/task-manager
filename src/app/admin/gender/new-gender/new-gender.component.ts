import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/task.service';
import { Gender } from '../gender.model';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrls: ['./new-gender.component.css'],
})
export class NewGenderComponent implements OnInit {
  gender: Gender[] = [];

  actionBtn: string = 'Save';
  actionTitle: string = 'Add new gender';

  taskForm!: FormGroup;

  constructor(
    private formbuildder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private dialogRef: MatDialogRef<NewGenderComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  // Create gender
  addGender() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.taskService.createGender(this.taskForm.value).subscribe({
          next: (res) => {
            alert('Gender successfully added!');
            this.taskForm.reset();
            this.dialogRef.close('save');
            this.router.navigate(['/manageGender']);
          },
          error: () => {
            alert('Could not add gender!');
          },
        });
      }
    } else {
      this.updateGender();
    }
  }

  // Update gender
  updateGender() {
    this.taskService
      .updateGender(this.taskForm.value, this.editData._id)
      .subscribe({
        next: (res) => {
          alert('Gender updated successfully!');
          this.taskForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Could not update gender!');
        },
      });
  }

  ngOnInit(): void {
    this.taskForm = this.formbuildder.group({
      name: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.actionTitle = 'Edit gender';
      this.taskForm.controls['name'].setValue(this.editData.title);
    }
  }
}
