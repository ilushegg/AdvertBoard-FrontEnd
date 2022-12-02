import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullAdvertisement } from 'src/app/models/full-ad.model';
import { AdService } from 'src/app/services/ad.service';
import { NzCarouselComponent, NZ_CAROUSEL_CUSTOM_STRATEGIES
} from 'ng-zorro-antd/carousel';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-ad-full',
  templateUrl: './ad-full.component.html',
  styleUrls: ['./ad-full.component.scss']
})
export class AdFullComponent implements OnInit {
  


  public ad: FullAdvertisement | undefined;

  constructor(private adService: AdService, private route: ActivatedRoute, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    const id = this.route.snapshot.params['id'];

    this.adService.getById(id).subscribe(res => {
      this.ad = res;
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

}
