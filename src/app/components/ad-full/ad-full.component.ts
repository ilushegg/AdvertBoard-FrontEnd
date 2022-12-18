import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-ad-full',
  templateUrl: './ad-full.component.html',
  styleUrls: ['./ad-full.component.scss']
})
export class AdFullComponent implements OnInit {
  


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
      text: ['', [Validators.required, Validators.maxLength(500)]]
    }
  )

  constructor(private adService: AdService, private favoriteService: FavoriteService, private route: ActivatedRoute, public loadingService: LoadingService, private authService: AuthService, private nzMessageService: NzMessageService, private formBuilder: FormBuilder, private commentService: CommentService) { }

  ngOnInit(): void {
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
    this.favoriteService.addToFavorite(adId, this.authService.id!).subscribe(res => {
      this.nzMessageService.success("Объявление добавлено в избранное.")
      this.ad.isFavorite = true;
    });
  }

  deleteFromFavorite(adId: string){
    this.favoriteService.deleteFromFavorite(adId, this.authService.id!).subscribe(res => {
      this.nzMessageService.success("Объявление удалено из избранного.")
      this.ad.isFavorite = false;
    });
  }

  showModal(): void {
    this.isVisible = true;
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

}
