import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { catchError, Observable, throwError } from "rxjs";
import { LoadingService } from "./loading.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private nzNotificationService: NzNotificationService, private router: Router, private loadingService: LoadingService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          this.nzNotificationService.error('Ошибка', 'Вы не авторизованы');
          this.router.navigateByUrl('/auth');
        } else if (err.status === 400 || err.status === 500) {
          this.nzNotificationService.error('Ошибка', err.error.message);
          this.loadingService.isLoading$.next(false);
        }
        return throwError(err);
      })
    );
  }
}