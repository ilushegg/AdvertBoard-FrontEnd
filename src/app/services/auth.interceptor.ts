import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;
    if (token && request.url.includes(environment.apiUrl)) {
      const authReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        })
    return next.handle(authReq);
  }
  return next.handle(request);
    
  }


}