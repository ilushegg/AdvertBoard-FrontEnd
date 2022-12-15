import { BoundElementProperty } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadataConfig, DadataType, Bounds, Bound, DadataSuggestion, DadataAddress } from '@kolkov/ngx-dadata';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
  visible = false;
  city: string | null = '';

  constructor(public authService: AuthService, private categoryService: CategoryService, public router: Router, public formBuilder: FormBuilder, private adService: AdService) {
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
    // let city = this.searchForm.controls.address.value ? this.searchForm.controls.address.value : "";
    this.router.navigateByUrl(`search?city=${this.city}&categoryId=${categoryId}&query=${query}`);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  isHeaderNav(): boolean {
    if ((this.router.url != '/auth')) {

              return true;
      }

    return false;
  }

  isHeaderSearch(): boolean {
    if ((this.router.url != '/auth') && (this.router.url.indexOf('/profile/') == -1) && (this.router.url != '/add-new-ad') && (this.router.url != '/advertisements/editing/')) {

              return true;
      }

    return false;
  }

  b1: Bound = {value: "city"}

  b: Bounds = {fromBound: this.b1, toBound: this.b1};

  public config: DadataConfig = {
    apiKey: environment.daDataApiKey  ,
    type: DadataType.address,
    bounds: this.b
          
  
  };


  onAddressSelected(event: DadataSuggestion) {
    const addressData = event.data as DadataAddress;
    this.city = addressData.city;
  }

  onCategorySelected($event: string) {
    console.log($event);
  }

  onChangeAddress() {
    this.city = '';
  }



}
