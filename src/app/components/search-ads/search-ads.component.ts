import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  public filtersForm = this.formBuilder.group({
    fromPrice: [''],
    toPrice: [''],
    ordering: ['']
  })

  constructor(private adService: AdService, public loadingService: LoadingService, public authService: AuthService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
               

  }

  pageSize = 10;
  pageNumber = 1;
  query = '';
  city = '';
  categoryId = '';
  fromPrice = '';
  toPrice = '';
  ordering = '';
  radioValue = 'def'

  ngOnInit(): void {
    
    
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.query = params['query'];
      this.city = params['city'];
      this.categoryId = params['categoryId'];
      this.loadingService.isLoading$.next(true);
      this.adService.getPagedBySearch(0, this.pageSize, this.city, this.categoryId, this.query, this.fromPrice, this.toPrice, this.authService.id!, this.ordering).subscribe(res => {
        this.ads = res,
        console.log(res);
        this.loadingService.isLoading$.next(false);
      });
    });

    

    
  }
  
  onPriceSubmit() {
    this.loadingService.isLoading$.next(true);
    this.fromPrice = this.filtersForm.controls.fromPrice.value!;
    this.toPrice = this.filtersForm.controls.toPrice.value!;
    this.ordering = this.filtersForm.controls.ordering.value!
    this.adService.getPagedBySearch(0, this.pageSize, this.city, this.categoryId, this.query, this.fromPrice, this.toPrice, this.authService.id!, this.ordering).subscribe(res => {
      this.ads = res,
      this.loadingService.isLoading$.next(false);
    });
  }

  cleanFilters() {
    this.loadingService.isLoading$.next(true);
    this.filtersForm.patchValue({
      fromPrice: '',
      toPrice: '',
      ordering: 'def'
    })
    this.adService.getPagedBySearch(0, this.pageSize, this.city, this.categoryId, this.query, '', '', this.authService.id!, '').subscribe(res => {
      this.ads = res,
      this.loadingService.isLoading$.next(false);
    });
  }

}
