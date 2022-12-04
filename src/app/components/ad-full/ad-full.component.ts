import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullAdvertisement } from 'src/app/models/full-ad.model';
import { AdService } from 'src/app/services/ad.service';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { LoadingService } from 'src/app/services/loading.service';
import { AngularYandexMapsModule, YaConfig, YaReadyEvent } from 'angular8-yandex-maps';

@Component({
  selector: 'app-ad-full',
  templateUrl: './ad-full.component.html',
  styleUrls: ['./ad-full.component.scss']
})
export class AdFullComponent implements OnInit {
  


  public ad: FullAdvertisement | undefined;
  public centerLat: number;
  public centerLon: number;

  constructor(private adService: AdService, private route: ActivatedRoute, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    const id = this.route.snapshot.params['id'];

    this.adService.getById(id).subscribe(res => {
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

}
