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

@Component({
  selector: 'app-ad-full',
  templateUrl: './ad-full.component.html',
  styleUrls: ['./ad-full.component.scss']
})
export class AdFullComponent implements OnInit {
  


  public ad: FullAdvertisement;
  public centerLat: number;
  public centerLon: number;

  constructor(private adService: AdService, private favoriteService: FavoriteService, private route: ActivatedRoute, public loadingService: LoadingService, private authService: AuthService, private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    const id = this.route.snapshot.params['id'];

    this.adService.getById(id, this.authService.id!).subscribe(res => {
      this.ad = res;
      this.centerLat = +res.locationLat;
      this.centerLon = +res.locationLon;
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

}
