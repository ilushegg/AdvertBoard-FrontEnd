import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from 'src/app/models/ad.model';
import { GetPagedResult } from 'src/app/models/get-paged-result.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-search-ads',
  templateUrl: './search-ads.component.html',
  styleUrls: ['./search-ads.component.scss']
})
export class SearchAdsComponent implements OnInit {

  public ads: GetPagedResult<Advertisement>;
  constructor(private adService: AdService, public loadingService: LoadingService, public authService: AuthService, private route: ActivatedRoute, private router: Router) {
   
    // router.events.subscribe( val => {
    //   this.loadingService.isLoading$.next(true);
    //   let query = '';
    //   this.route.queryParams.subscribe(params => {
    //     console.log(params)
    //     query = params['query'];
    //   });
      
    //   this.adService.getPagedBySearch(0, this.pageSize, query).subscribe(res => {
    //     this.ads = res,
    //     console.log(res);
    //     this.loadingService.isLoading$.next(false);
    //   });
    // });
            

  }

  pageSize = 10;
  pageNumber = 1;


  ngOnInit(): void {
    
    let query = '';
    let city = '';
    let categoryId = '';
    this.route.queryParams.subscribe(params => {
      console.log(params)
      query = params['query'];
      city = params['city'];
      categoryId = params['categoryId'];
      this.loadingService.isLoading$.next(true);
      this.adService.getPagedBySearch(0, this.pageSize, city, categoryId, query).subscribe(res => {
        this.ads = res,
        console.log(res);
        this.loadingService.isLoading$.next(false);
      });
    });

   
  }

}
