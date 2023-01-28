import { BoundElementProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadataConfig, DadataType, Bounds, Bound, DadataSuggestion, DadataAddress } from '@kolkov/ngx-dadata';
import { User } from 'src/app/models/user.model';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import {AuthService} from "../../services/auth.service";
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
   this.screenWidth = window.innerWidth;
}

  screenWidth: number;
  public user$: User;
  public categories$ = this.categoryService.getAll();
  public searchForm = this.formBuilder.group(
    {
      query: ['', [Validators.required]],
      categoryId: [''],
      address: ['']
    }
  );

  public pageSize = 10;
  public pageNumber = 1;
  public adsTotal = this.pageSize;
  public url = environment.apiUrl;
  visibleProfile = false;
  visibleFilters = false;
  selected = false;
  city: string | null = '';
  mobile = false;

  constructor(public authService: AuthService, private categoryService: CategoryService, public router: Router, public formBuilder: FormBuilder, private adService: AdService) {
    this.getScreenSize();
  }
  ngOnInit(): void {
    this.authService.user$.subscribe(res => {
      this.user$ = res;
      
    }
    )
    this.city = "";
  }


  Search(){
    console.log('click');
    let query = this.searchForm.controls.query.value;
    let categoryId = this.searchForm.controls.categoryId.value ? this.searchForm.controls.categoryId.value : "";
    let location = this.selected ? this.city : this.searchForm.controls.address.value;
    this.router.navigateByUrl(`search?location=${location}&categoryId=${categoryId}&query=${query}`);
  }

  openProfile(): void {
    this.visibleProfile = true;
  }

  closeProfile(): void {
    this.visibleProfile = false;
  }

  categoryClick(id: string) {
    this.categories$.subscribe(res => {
      this.router.navigateByUrl(`search?location=&categoryId=${id}&query=`);
    })
  }

  favoritesCountNoAuth(): number{
    let i: number;
    let adsLocalStorage: number = 0;
    for(i = 0; i < localStorage.length; i++){
      if(localStorage.key(i)?.startsWith('adId')){
        adsLocalStorage++;
      }
    }
    return adsLocalStorage;
  }



  isHeaderNav(): boolean {
    if ((this.router.url != '/auth') && (this.router.url.indexOf('/auth/recovering/') == -1) && (this.router.url.indexOf('/auth/activate/') == -1)) {

              return true;
      }

    return false;
  }

  isHeaderSearch(): boolean {
    if ((this.router.url != '/auth') && (this.router.url.indexOf('/profile/') == -1) && (this.router.url != '/add-new-ad') && (this.router.url != '/advertisements/editing/') && (this.router.url != '/auth/') && (this.router.url.indexOf('/auth/recovering/') == -1) && (this.router.url.indexOf('/auth/activate/') == -1)) {

              return true;
      }

    return false;
  }


  isHeaderCategory(): boolean {
    if ((this.router.url == '/')) {

              return true;
      }

    return false;
  }

  b1: Bound = {value: "region"}
  b2: Bound = {value: "city"}

  b: Bounds = {fromBound: this.b1, toBound: this.b2};

  public config: DadataConfig = {
    apiKey: environment.daDataApiKey  ,
    type: DadataType.address,
    bounds: this.b
  };


  // onAddressSelected(event: DadataSuggestion) {
  //   const addressData = event.data as DadataAddress;
  //   this.selected = true;
  //   this.city = addressData.city;
  // }

  onCategorySelected($event: string) {
    console.log($event);
  }

  onChangeAddress() {
    this.city = '';
  }
  
 


}


