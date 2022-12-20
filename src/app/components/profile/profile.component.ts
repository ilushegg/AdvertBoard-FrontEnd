import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, map } from 'rxjs';
import { UserAvatar } from 'src/app/models/user-avatar.model';
import { UserEdit } from 'src/app/models/user-edit.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
   this.screenWidth = window.innerWidth;
  }

  screenWidth: number;
  public user$: User;
  public environmentUrl = environment.apiUrl;
  public component: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private userService: UserService, private nzMessageService: NzMessageService, private route: ActivatedRoute, public loadingService: LoadingService) { 
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    
    this.route.queryParams.subscribe(params => {
      this.component = params['component'];
      console.log(this.route.snapshot.params['id'])
      
      this.authService.user$.subscribe(res => {
        this.user$ = res;
        console.log(this.user$)
      this.loadingService.isLoading$.next(false);
        
      })
    });
    this.authService.getSelfById(this.route.snapshot.params['id']).subscribe(res => {
      this.user$ = res;
    })
    console.log(this.component)
    if(this.user$ === undefined) {return}
  }



  handleChange(info: any) {
    if(info.file.status !== 'Загрузка...') {
      console.log(info.file, info.fileList);
    }
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
