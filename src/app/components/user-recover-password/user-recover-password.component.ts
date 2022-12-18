import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-recover-password',
  templateUrl: './user-recover-password.component.html',
  styleUrls: ['./user-recover-password.component.scss']
})
export class UserRecoverPasswordComponent implements OnInit {

  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required]],
    passwordCheck: ['', [Validators.required]],

  })


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private nzMessageService: NzMessageService, public loadingService: LoadingService, private nzNotificationService: NzNotificationService,private routerTo: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onChangePasswordSubmit() {
    
    if(this.passwordForm.controls.password.value != this.passwordForm.controls.passwordCheck.value && this.passwordForm.controls.password.value != null && this.passwordForm.controls.passwordCheck.value != null) {
      this.nzNotificationService.error('Ошибка', 'Пароли не совпадают');
      this.passwordForm.controls.password.reset();
      this.passwordForm.controls.password.markAsTouched();
      this.passwordForm.controls.password.updateValueAndValidity({onlySelf: true});
      this.passwordForm.controls.passwordCheck.reset();
      this.passwordForm.controls.passwordCheck.markAsTouched();
      this.passwordForm.controls.passwordCheck.updateValueAndValidity({onlySelf: true});
          
        
      
      return;
    }
    if (this.passwordForm.invalid) {
      this.nzNotificationService.error('Ошибка', 'Форма заполнена неверно');
      Object.values(this.passwordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    }
    this.loadingService.isLoading$.next(true);

    const userId = this.router.snapshot.params['id'];
    const password = this.passwordForm.controls.password.value;

    this.authService.recover(userId, password!).subscribe(res => {
      this.nzNotificationService.info("Информация", res.value);
      this.loadingService.isLoading$.next(false);
      this.routerTo.navigateByUrl("/auth")
    });
  }

}
