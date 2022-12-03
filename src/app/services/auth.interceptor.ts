import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  
  constructor(private authService: AuthService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request.headers.set('Auth', `Token 90b23b34110082cdd7fc96afdfccb260ada95ce3`);
    const token = this.authService.token;
    if (token) {
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