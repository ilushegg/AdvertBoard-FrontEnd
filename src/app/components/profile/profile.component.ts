import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { UserAvatar } from 'src/app/models/user-avatar.model';
import { UserEdit } from 'src/app/models/user-edit.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user$: User;
  public environmentUrl = environment.apiUrl;

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    mobile: ['', [Validators.required]]
  })


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(res => {
      this.user$ = res;
      this.form.patchValue({
        name: res.name,
        mobile: res.mobile
      })
    })

  }

  onEditSubmit() {
    var user: UserEdit = {
      id: this.user$.id,
      name: this.form.controls.name.value,
      mobile: this.form.controls.mobile.value,
    };
    user.id = this.user$.id;
    this.userService.edit(user).subscribe();
  }

  handleChange(info: any) {
    if(info.file.status !== 'Загрузка...') {
      console.log(info.file, info.fileList);
    }
    console.log(this.form)
    if(info.file.status === 'done') {
      this.nzMessageService.success(`Файл загружен успешно. Продолжайте пользоваться сайтом.`);
      console.log(info.file.response);
      var avatar: UserAvatar = {
        userId: this.user$.id,
        imageId: info.file.response
      }
      this.userService.editAvatar(avatar).subscribe(res => {

      });
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`Ошибка загрузки файла.`);
    }
  }

}
