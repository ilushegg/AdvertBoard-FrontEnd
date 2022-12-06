import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEdit } from '../models/user-edit.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  edit(model: UserEdit): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/v1/user/edit`, model);

  }
}
