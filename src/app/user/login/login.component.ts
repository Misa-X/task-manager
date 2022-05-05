import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'login';
  error: string = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),])

      }
      );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:[''],
      password:[''],
    })
  }


  onSubmit(){

    if(!this.loginForm.valid){
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.userService.login(username, password).subscribe(resData => {
      console.log(resData);
      localStorage.setItem('token', resData.token);
      this.router.navigate(['/tasks']); //go to tasks page if login was successfull
    },
    errorRes => {
      console.log(errorRes);
      switch (errorRes.error.message) {
        case 'Wrong username':
          this.error = "Wrong username";
      }

    }
    );
    this.loginForm.reset();
  }

}
