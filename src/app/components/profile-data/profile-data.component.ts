import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserAvatar } from 'src/app/models/user-avatar.model';
import { UserEdit } from 'src/app/models/user-edit.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {
  @Input() public user: User;

  public environmentUrl = environment.apiUrl;
  isVisible = false;

  dataForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    mobile: ['', [Validators.pattern("^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$")]],
    email: ['', [Validators.email, Validators.required]]
  })

  passwordForm = this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    newPasswordCheck: ['', [Validators.required]]
  })


  constructor(private formBuilder: FormBuilder, private userService: UserService, private nzMessageService: NzMessageService, public loadingService: LoadingService, private authService: AuthService, private nzNotificationService: NzNotificationService) { }

  ngOnInit(): void {
    this.dataForm.patchValue({
      name: this.user.name,
      mobile: this.user.mobile,
      email: this.user.email
    })

  }

  onEditSubmit() {
    this.loadingService.isLoading$.next(true);
    var user: UserEdit = {
      id: this.user.id,
      name: this.dataForm.controls.name.value,
      mobile: this.dataForm.controls.mobile.value,
      email: this.dataForm.controls.email.value,
      oldPassword: null,
      newPassword: null
    };
    user.id = this.user.id;
    this.userService.edit(user).subscribe(res => {
      this.loadingService.isLoading$.next(false);
      this.nzMessageService.success("Успешно! Данные обновлены")
    });
  }

  handleChange(info: any) {
    if(info.file.status !== 'Загрузка...') {
      console.log(info.file, info.fileList);
    }
    if(info.file.status === 'done') {
      this.nzMessageService.success(`Файл загружен успешно. Продолжайте пользоваться сайтом.`);
      console.log(info.file.response);
      var avatar: UserAvatar = {
        userId: this.user.id,
        imageId: info.file.response
      }
      this.userService.editAvatar(avatar).subscribe(res => {

      });
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`Ошибка загрузки файла.`);
    }

  }

  sendActivationCode() {
      this.authService.sendActivationCode(this.user.id).subscribe(res => {
        if (res) {
          this.nzMessageService.info("Код подтверждения отправлен на ваш электронный адрес.");
        }
      });
  }

  changePassword() {
    if(this.passwordForm.controls.newPassword.value != this.passwordForm.controls.newPasswordCheck.value) {
      this.nzNotificationService.error('Ошибка', 'Пароли не совпадают');
      this.passwordForm.controls.newPassword.reset();
      this.passwordForm.controls.newPassword.markAsTouched();
      this.passwordForm.controls.newPassword.updateValueAndValidity({onlySelf: true});
      this.passwordForm.controls.newPasswordCheck.reset();
      this.passwordForm.controls.newPasswordCheck.markAsTouched();
      this.passwordForm.controls.newPasswordCheck.updateValueAndValidity({onlySelf: true});
          
        
      
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
    var user: UserEdit = {
      id: this.user.id,
      name: null,
      mobile: null,
      email: null,
      oldPassword: this.passwordForm.controls.oldPassword.value,
      newPassword: this.passwordForm.controls.newPassword.value
    };
    user.id = this.user.id;
    this.userService.edit(user).subscribe(res => {
      this.loadingService.isLoading$.next(false);
      this.nzMessageService.success("Успешно! Данные обновлены")
    });
    this.isVisible = false;

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.changePassword();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
