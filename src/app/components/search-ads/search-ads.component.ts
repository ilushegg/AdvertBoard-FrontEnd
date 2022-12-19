import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bound, Bounds, DadataAddress, DadataConfig, DadataSuggestion, DadataType } from '@kolkov/ngx-dadata';
import { Advertisement } from 'src/app/models/ad.model';
import { GetPagedResult } from 'src/app/models/get-paged-result.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-ads',
  templateUrl: './search-ads.component.html',
  styleUrls: ['./search-ads.component.scss'],
})
export class SearchAdsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  public categories$ = this.categoryService.getAll();

  public ads: GetPagedResult<Advertisement>;
  public filtersForm = this.formBuilder.group({
    fromPrice: [''],
    toPrice: [''],
    ordering: [''],
    location: [''],
    categoryId: ['']
  });

  pageSize = 10;
  pageNumber = 1;
  public adsTotal = this.pageSize;
  query = '';
  location = '';
  categoryId = '';
  fromPrice = '';
  toPrice = '';
  ordering = '';
  radioValue = 'def';
  screenWidth: number;

  constructor(
    private adService: AdService,
    public loadingService: LoadingService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.query = params['query'];
      this.location = params['location'];
      this.categoryId = params['categoryId'];
      this.loadingService.isLoading$.next(true);
      this.adService
        .getPagedBySearch(
          0,
          this.pageSize,
          this.location,
          this.categoryId,
          this.query,
          this.fromPrice,
          this.toPrice,
          this.authService.id!,
          this.ordering
        )
        .subscribe((res) => {
          (this.ads = res), console.log(res);
          this.loadingService.isLoading$.next(false);
        });
    });
  }

  onChangePagination(index: number) {
    this.pageNumber = index;

    this.loadingService.isLoading$.next(true);
    this.adService
      .getPagedBySearch(
        0,
        this.pageSize,
        this.location,
        this.categoryId,
        this.query,
        this.fromPrice,
        this.toPrice,
        this.authService.id!,
        this.ordering
      )
      .subscribe((res) => {
        (this.ads = res), console.log(res);
        this.loadingService.isLoading$.next(false);
      });
  }

  onFiltersSubmit() {
    this.loadingService.isLoading$.next(true);
    this.fromPrice = this.filtersForm.controls.fromPrice.value!;
    this.toPrice = this.filtersForm.controls.toPrice.value!;
    this.ordering = this.filtersForm.controls.ordering.value!;
    if(this.screenWidth <= 700){
      this.categoryId = this.filtersForm.controls.categoryId.value!;

    }
    if(!this.selected){
      this.location = this.filtersForm.controls.location.value!;
    }
    this.adService
      .getPagedBySearch(
        0,
        this.pageSize,
        this.location,
        this.categoryId,
        this.query,
        this.fromPrice,
        this.toPrice,
        this.authService.id!,
        this.ordering
      )
      .subscribe((res) => {
        (this.ads = res), this.loadingService.isLoading$.next(false);
      });
      this.visibleFilters = false;

  }

  cleanFilters() {
    this.loadingService.isLoading$.next(true);
    this.filtersForm.patchValue({
      fromPrice: '',
      toPrice: '',
      ordering: 'def',
    });
    this.adService
      .getPagedBySearch(
        0,
        this.pageSize,
        this.location,
        this.categoryId,
        this.query,
        '',
        '',
        this.authService.id!,
        ''
      )
      .subscribe((res) => {
        (this.ads = res), this.loadingService.isLoading$.next(false);
      });
      this.visibleFilters = false;
      
  }

  visibleFilters = false;
  openFilters(): void {
    this.visibleFilters = true;
  }

  closeFilters(): void {
    this.visibleFilters = false;
  }

  b1: Bound = {value: "region"}
  b2: Bound = {value: "city"}

  b: Bounds = {fromBound: this.b1, toBound: this.b2};

  public config: DadataConfig = {
    apiKey: environment.daDataApiKey  ,
    type: DadataType.address,
    bounds: this.b
  };

  selected = false;
  city: string | null = '';

  onAddressSelected(event: DadataSuggestion) {
    const addressData = event.data as DadataAddress;
    this.selected = true;
    this.city = addressData.city;
  }
}
