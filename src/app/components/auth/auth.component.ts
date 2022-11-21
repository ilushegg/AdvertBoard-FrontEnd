import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { LoginUser } from 'src/app/models/login-user.model';
import { RegistrationUser } from 'src/app/models/registration-user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isLogin: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  public isLoading: BehaviorSubject<any> = new BehaviorSubject<any>(true);

  readonly loginForm = this.formBuilder.group(
    {
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }
  );
  readonly registrationForm = this.formBuilder.group(
    {
      login: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      passwordCheck: ['', [Validators.required]]
    }
  );


  constructor(private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.isLoading.next(false);
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

    let user: LoginUser = {
      login: (document.getElementById('login') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    };
    this.authService.login(user).subscribe(res => {
      this.router.navigateByUrl('/')
    });
  }

  onRegistrationSubmit() {
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
    if(this.registrationForm.controls.password != this.registrationForm.controls.passwordCheck) {
      this.nzNotificationService.error('Ошибка', 'Пароли не совпадают');
      this.registrationForm.controls.password.reset();
      this.registrationForm.controls.password.markAsTouched();
      this.registrationForm.controls.password.updateValueAndValidity({onlySelf: true});
      this.registrationForm.controls.passwordCheck.reset();
      this.registrationForm.controls.passwordCheck.markAsTouched();
      this.registrationForm.controls.passwordCheck.updateValueAndValidity({onlySelf: true});
          
        
      
      return;
    }

    let user: RegistrationUser = {
      login: (document.getElementById('login') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    };
    this.authService.register(user).subscribe(res => {
      this.router.navigateByUrl('/auth')
    });
  }

  onChange(){
    this.isLogin.next(!this.isLogin.value);
  }

}
