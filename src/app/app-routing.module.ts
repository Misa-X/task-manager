import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { GenderComponent } from "./admin/gender/gender.component";
import { StatusComponent } from "./admin/status/status.component";
import { UsersComponent } from "./admin/users/users.component";

import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { UserGuard } from "./user/user.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tasks',
    component: TasksComponent,
    canActivate: [UserGuard]
  },
  { path: 'new-task', component: NewTaskComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manageGender', component: GenderComponent },
  { path: 'manageStatus', component: StatusComponent },
  { path: 'manageUsers', component: UsersComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
