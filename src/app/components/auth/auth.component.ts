import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user.model';
import { RegistrationUser } from 'src/app/models/registration-user.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isLogin: BehaviorSubject<any> = new BehaviorSubject<any>(true);

  readonly loginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }
  );
  readonly registrationForm = this.formBuilder.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordCheck: ['', [Validators.required, Validators.minLength(6)]]
    }
  );
  readonly forgotPasswordForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]]
    }
  );

  isVisible = false;


  constructor(private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, private authService: AuthService, private router: Router, public loadingService: LoadingService, private favoriteService: FavoriteService ) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(false);
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.nzNotificationService.error('Ошибка', 'Форма заполнена неверно');
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {

          control.markAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    }
    this.loadingService.isLoading$.next(true);

    let user: LoginUser = {
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    };
    this.authService.login(user).subscribe(res => {
      this.router.navigateByUrl('/')
      this.loadingService.isLoading$.next(false);
    });
  }

  onRegistrationSubmit() {
    
    if(this.registrationForm.controls.password.value != this.registrationForm.controls.passwordCheck.value && this.registrationForm.controls.password.value != null && this.registrationForm.controls.passwordCheck.value != null) {
      this.nzNotificationService.error('Ошибка', 'Пароли не совпадают');
      this.registrationForm.controls.password.reset();
      this.registrationForm.controls.password.markAsTouched();
      this.registrationForm.controls.password.updateValueAndValidity({onlySelf: true});
      this.registrationForm.controls.passwordCheck.reset();
      this.registrationForm.controls.passwordCheck.markAsTouched();
      this.registrationForm.controls.passwordCheck.updateValueAndValidity({onlySelf: true});
          
        
      
      return;
    }
    if (this.registrationForm.invalid) {
      this.nzNotificationService.error('Ошибка', 'Форма заполнена неверно');
      Object.values(this.registrationForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    }
    this.loadingService.isLoading$.next(true);

    let user: RegistrationUser = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      mobile: ""
    };
    this.authService.register(user).subscribe(res => {
      this.loadingService.isLoading$.next(false);
      this.authService.sendActivationCode(res).subscribe();
      this.nzNotificationService.success("Успешно", "Пользователь зарегистрирован");
      let i: number;
      for(i = 0; i < localStorage.length; i++){
        if(localStorage.key(i)?.startsWith('adId')){
          this.favoriteService.addToFavorite(localStorage.getItem(localStorage.key(i)!)!, res).subscribe( res => {
            

          }
          );
          localStorage.removeItem(localStorage.key(i)!);
  
        }
      }
      this.isLogin.next(true);
      
    });
  }

  forgotPassword(){
    const email = this.forgotPasswordForm.controls.email.value;
    this.authService.sendRecoveryCode(email!).subscribe(res => {
      this.nzNotificationService.info("Информация", "Ссылка для восстановления пароля была отправлена на ваш электронный адрес.");
    })
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.forgotPassword();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onChange(){
    this.isLogin.next(!this.isLogin.value);
  }

  

}
