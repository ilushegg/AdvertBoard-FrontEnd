import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;
    const addressSelected = localStorage.getItem('addressSelected');
    if (token && addressSelected == "true") {
      const tokenizedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log(tokenizedRequest);
      console.log(request.headers.get("Authorization"))
      return next.handle(tokenizedRequest);
    }

   return next.handle(request);
    
  }


}