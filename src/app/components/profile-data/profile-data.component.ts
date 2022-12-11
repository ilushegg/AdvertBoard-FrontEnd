import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
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

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    mobile: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private nzMessageService: NzMessageService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.form.patchValue({
      name: this.user.name,
      mobile: this.user.mobile
    })

  }

  onEditSubmit() {
    this.loadingService.isLoading$.next(true);
    var user: UserEdit = {
      id: this.user.id,
      name: this.form.controls.name.value,
      mobile: this.form.controls.mobile.value,
    };
    user.id = this.user.id;
    this.userService.edit(user).subscribe(res => {
      this.loadingService.isLoading$.next(false);

    });
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
        userId: this.user.id,
        imageId: info.file.response
      }
      this.userService.editAvatar(avatar).subscribe(res => {

      });
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`Ошибка загрузки файла.`);
    }

}
}
