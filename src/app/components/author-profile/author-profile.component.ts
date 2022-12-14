import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, map } from 'rxjs';
import { UserAvatar } from 'src/app/models/user-avatar.model';
import { UserEdit } from 'src/app/models/user-edit.model';
import { User } from 'src/app/models/user.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss']
})
export class AuthorProfileComponent implements OnInit {

  public author$: User;
  public user$: User = {
    userRole: '',
    id: '',
    name: '',
    email: '',
    mobile: '',
    avatar: '',
    createDate: '',
    activationCode: ''
  };
  public environmentUrl = environment.apiUrl;
  public component: string;
  isVisible = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService, private nzMessageService: NzMessageService, private route: ActivatedRoute, private adService: AdService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = this.route.snapshot.params['id'];
      this.authService.getSelfById(id).subscribe(res => {
        this.author$ = res;
        this.authService.user$.subscribe(res => {
          this.user$ = res;
        });
      })
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
        userId: this.author$.id,
        imageId: info.file.response
      }
      this.userService.editAvatar(avatar).subscribe(res => {

      });
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`Ошибка загрузки файла.`);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.deleteAds();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  deleteAds() {
    this.adService.deleteAds(this.author$.id).subscribe();
  }

}
