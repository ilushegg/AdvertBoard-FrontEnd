import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullAdvertisement } from 'src/app/models/full-ad.model';
import { AdService } from 'src/app/services/ad.service';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { LoadingService } from 'src/app/services/loading.service';
import { AngularYandexMapsModule, YaConfig, YaReadyEvent } from 'angular8-yandex-maps';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from 'src/app/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { UploadComment } from 'src/app/models/upload-comment.model';
import { GetPagedResult } from 'src/app/models/get-paged-result.model';
import { Comment } from 'src/app/models/comment.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-ad-full',
  templateUrl: './ad-full.component.html',
  styleUrls: ['./ad-full.component.scss']
})
export class AdFullComponent implements OnInit {
  
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  screenWidth: number;
  swipe = false;


  public ad: FullAdvertisement;
  public centerLat: number;
  public centerLon: number;
  public user: User = {
    userRole: '',
    id: '',
    name: '',
    email: '',
    mobile: '',
    avatar: '',
    createDate: '',
    activationCode: ''
  };
  public comments: GetPagedResult<Comment>;

  public pageSize = 5;
  public pageNumber = 1;
  public commentsTotal = this.pageSize;

  isVisible = false;


  public commentForm = this.formBuilder.group(
    {
      text: ['', [Validators.required, Validators.maxLength(200)]]
    }
  )

  constructor(private adService: AdService, private favoriteService: FavoriteService, private route: ActivatedRoute, public loadingService: LoadingService, private authService: AuthService, private nzMessageService: NzMessageService, private formBuilder: FormBuilder, private commentService: CommentService, private nzNotificationService: NzNotificationService) { 
    this.getScreenSize();
  }

  ngOnInit(): void {
    if(this.screenWidth < 700) {
      this.swipe = true;
    }
    this.loadingService.isLoading$.next(true);
    const id = this.route.snapshot.params['id'];
    this.authService.user$.subscribe(res => {
      this.user = res;
    })

    this.adService.getById(id, this.authService.id!).subscribe(res => {
      this.ad = res;
      this.centerLat = +res.locationLat;
      this.centerLon = +res.locationLon;
      this.loadingService.isLoading$.next(false);
      this.commentService.getAdCommentsPaged(0, this.pageSize, this.ad.id).subscribe(res => {
        this.comments = res;
      })
    })
  

  }

  onChangePagination(index: number) {
    this.pageNumber = index;

    this.loadingService.isLoading$.next(true);
    this.commentService.getAdCommentsPaged((index-1)*this.pageSize, this.pageSize, this.user.id).subscribe(res => {
      this.comments = res;
      console.log(res);
      this.loadingService.isLoading$.next(false);
    })
  }



  @ViewChild(NzCarouselComponent, { static: false }) public myCarousel:NzCarouselComponent | undefined;

  pre() {
    this.myCarousel?.pre();
  }

  next() {
    this.myCarousel?.next();
  }

  mapConfig: YaConfig = {
    apikey: '912b095c-f11f-4d78-a7ff-b525ee7ff42b',
    lang: 'ru_RU',
  };

  public onReady(event: YaReadyEvent<ymaps.Map>) {
    console.log(event);
  }

  addToFavorite(adId: string){
    if(this.authService.id !== null){
    this.favoriteService.addToFavorite(adId, this.authService.id!).subscribe(res => {
      this.nzMessageService.success("Объявление добавлено в избранное.")
      this.ad.isFavorite = true;
    });
    }
    else {
      localStorage.setItem('adId ' + adId, adId);
      this.nzMessageService.success("Объявление добавлено в избранное.")
        this.ad.isFavorite = true;
    }
  }

  deleteFromFavorite(adId: string){
    if(this.authService.id !== null){
    this.favoriteService.deleteFromFavorite(adId, this.authService.id!).subscribe(res => {
      this.nzMessageService.success("Объявление удалено из избранного.")
      this.ad.isFavorite = false;
    });
  }
  else {
    localStorage.removeItem('adId ' + adId);
    this.nzMessageService.success("Объявление удалено из избранного.")
      this.ad.isFavorite = false;
  }
  }

  checkFavorite(adId: string) {
    if(localStorage.getItem('adId ' + adId) !== null && !this.authService.id){
      return true;
    }
    else {
      return false;
    }
  }

  showModal(): void {
    if(this.authService.id!){
      this.isVisible = true;
    }
    else {
      this.nzNotificationService.warning("Предупреждение", "Чтобы оставить комментарий, необходимо авторизоваться.");
    }
  }

  handleOk(id: string): void {
    this.createComment();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  createComment() {
    let comment: UploadComment = {
      userId: this.user.id,
      advertisementId: this.ad.id,
      text: this.commentForm.controls.text.value
    }
    this.commentService.createComment(comment).subscribe(res => {
      this.nzMessageService.success("Комментарий успешно добавлен");
    });
  }


  fallback =
    'data:image/png;base64,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';

}
