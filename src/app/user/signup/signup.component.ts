import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { WebRequestService } from 'src/app/web-request.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | any;
  title = 'login';
  error: string = '';

  constructor(
    private webReqService: WebRequestService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
    });
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: [''],
      password: [''],
      email: [''],
      name: [''],
      phone: [''],
      dateOfBirth: [''],
      gender: [''],
    });
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      return;
    }
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;
    const email = this.signupForm.value.email;
    const name = this.signupForm.value.name;
    const phone = this.signupForm.value.phone;
    const dateOfBirth = this.signupForm.value.dateOfBirth;
    const gender = this.signupForm.value.gender;

    this.userService
      .signup(username, email, name, password, phone, dateOfBirth, gender)
      .subscribe(
        (resData) => {
          console.log(resData);
          this.router.navigate(['/tasks']); //go to tasks page if signup was successfull
        },
        (error) => {
          console.log(error);
          this.error = ' An error occurred!';
        }
      );
    this.signupForm.reset();
  }
}
