import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateUserResponse } from 'src/app/interfaces/admin/update-user.interface';
import { User } from 'src/app/interfaces/admin/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUsers {

  private API = environment.apiUrl;

   constructor(private http: HttpClient) {}

  getUsers(){
    return this.http.get<User[]>(`${this.API}/admin/users`)
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.API}/admin/users/${id}`);
  }
  updateUser(id: number, data: Partial<User>) {
    return this.http.put<UpdateUserResponse>(`${this.API}/admin/users/${id}`,data);
  }

}
