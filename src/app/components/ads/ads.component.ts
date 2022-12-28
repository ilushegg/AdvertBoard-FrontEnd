import { Component, HostListener, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/ad.model';
import { GetPagedResult } from 'src/app/models/get-paged-result.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  

  public ads: GetPagedResult<Advertisement>;
  constructor(private adService: AdService, public loadingService: LoadingService, public authService: AuthService) { 
    
  }
  pageSize = 12;
  pageNumber = 1;
  adsTotal: number;
  

  ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    this.adService.getPagedFiltered(0, this.pageSize, this.authService.id!).subscribe(res => {
      this.ads = res;
      this.loadingService.isLoading$.next(false);
    })
  }

  onChangePagination(index: number) {
    this.pageNumber = index;

    this.loadingService.isLoading$.next(true);
    this.adService.getPagedFiltered(0, this.pageSize, this.authService.id!).subscribe(res => {
      this.ads = res;
      this.loadingService.isLoading$.next(false);
    })
  }

}
