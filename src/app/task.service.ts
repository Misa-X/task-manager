import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { WebRequestService } from './web-request.service';
import { Task } from './tasks/task.model';
import { User } from './user/user.model';
import { Gender } from './admin/gender/gender.model';
import { Status } from './admin/status/status.model';

import { Observable, throwError  } from 'rxjs';
import { catchError, map } from "rxjs/operators";




@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private webReqService: WebRequestService,
    private http: HttpClient
  ) { }


  // Create task
  createTask(task: Task) {
    return this.webReqService.post('task', task);
  }

  // Create gender
  createGender(gender: Gender) {
    return this.webReqService.post('gender', gender);
  }

  // Create status
  createStatus(status: Status) {
    return this.webReqService.post('status', status);
  }

  //get list of genders
  getGender() {
    return this.webReqService.get('gender');
  }

  //get list of status
  getStatus() {
    return this.webReqService.get('status');
  }

  //get list of users
  getUsers() {
    return this.webReqService.get('user');
  }

  //get list of tasks
  getTasks() {
    return this.webReqService.get('task');
  }

  // Update task
  updateTask(task: Task, taskId : string) {
    return this.webReqService.put(`task/${taskId}`, task);
  }

  // Update gender
  updateGender(gender: Gender, genderId : string) {
    return this.webReqService.put(`gender/${genderId}`, gender);
  }

  // Update status
  updateStatus(status: Status, statusId : string) {
    return this.webReqService.put(`status/${statusId}`, status);
  }

  // Update users
  updateUser(user: User, userId : string) {
    return this.webReqService.put(`user/${userId}`, user);
  }

  //  Delete task
  deleteTask(taskId : string) {
    return this.webReqService.delete(`task/${taskId}`);
  }

  //  Delete gender
  deleteGender(genderId : string) {
    return this.webReqService.delete(`gender/${genderId}`);
  }

  //  Delete status
  deleteStatus(statusId : string) {
    return this.webReqService.delete(`status/${statusId}`);
  }

  //  Delete user
  deleteUser(userId : string) {
    return this.webReqService.delete(`user/${userId}`);
  }




}
