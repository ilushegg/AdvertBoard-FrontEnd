import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, switchMap, tap, windowTime } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../models/login-user.model';
import { RegistrationUser } from '../models/registration-user.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public id$ = new BehaviorSubject<string | null>(this.id);
  public user$= this.id$.pipe(switchMap(id => this.getSelfById(id)));

  get token(): string | null {
    return localStorage.getItem('token');
  }

  set token(value: string | null) {
    if(!value) {
      localStorage.removeItem('token');
      return;
    }
    localStorage.setItem('token', value);
  }

  get id(): string | null {
    try{
      return localStorage.getItem('id');
    }
    catch(error){
      return null;
    }
  }

  set id(value:string | null) {
    this.id$.next(value);
    if(!value) {
      localStorage.removeItem('id');
      return;
    }
    localStorage.setItem('id', value);
  }


  constructor(private httpClient: HttpClient) { }

  register(model: RegistrationUser): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}/v1/user/register`, model)
  }

  sendActivationCode(userId: string): Observable<any> {
    console.log(userId);
    return this.httpClient.post(`${environment.apiUrl}/v1/user/send_activation_code?userId=${userId}`, userId);
  }

  activate(userId: string, activationCode: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/v1/user/activate`, {userId, activationCode})
  }

  login(model: LoginUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/v1/user/login`, model).pipe(tap((res: any) => {
      this.token = res.accessToken
      this.id = res.id
    }));
  }



  getSelfById(id: string | null): Observable<User> {
    if (!id) {
      return EMPTY;
    }
    return this.httpClient.get<User>(`${environment.apiUrl}/v1/user/get_by_id?id=${id}`);
  }
  

  logout(): void {
    this.token = null;
    this.id = null;
    window.location.reload();
  }
}
