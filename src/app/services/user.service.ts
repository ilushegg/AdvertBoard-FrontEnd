import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAvatar } from '../models/user-avatar.model';
import { UserEdit } from '../models/user-edit.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  edit(model: UserEdit): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/v1/user/edit`, model);

  }

  editAvatar(model: UserAvatar): Observable<string> {

    return this.httpClient.post<string>(`${environment.apiUrl}/v1/user/edit_avatar`, model);
  }
}
