import { HttpBackend, HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadataAddress, DadataConfig, DadataSuggestion, DadataType, NgxDadataService } from '@kolkov/ngx-dadata';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { UploadAd } from 'src/app/models/upload-ad.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ad-creating',
  templateUrl: './ad-creating.component.html',
  styleUrls: ['./ad-creating.component.scss']
})
export class AdCreatingComponent implements OnInit {

  public categories$ = this.categoryService.getAll();
  public environmentUrl = environment.apiUrl;

  public ad: UploadAd = {
    userId: this.authService.id,
    name: null,
    description: null,
    price: null,
    categoryId: null,
    images: null,
    country: null,
    city: null,
    street: null,
    house: null,
    flat: null,
    lat: null,
    lon: null,
    locationQueryString: null
  };

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    price: [0, [Validators.pattern(/^\d+(,\d{1,2})?$/)]],
    categoryId: ['', Validators.required],
    images: [[]],
    address: ['', Validators.required]
  })
  

  constructor(private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, private adService: AdService, private categoryService: CategoryService, private nzMessageService: NzMessageService, public loadingService: LoadingService, private router: Router, private authService: AuthService) {

   }

  ngOnInit(): void {
    this.form.patchValue({
      address: 'Россия'
    });
    this.ad.lat = '60';
    this.ad.lon = '100';
    this.ad.country = 'Россия';
    this.ad.locationQueryString = 'Россия';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.nzNotificationService.error('Ошибка', 'Форма заполнена неверно');
      Object.values(this.form.controls).forEach((control) => {
        control.markAsTouched()
        control.updateValueAndValidity({ onlySelf: true})
      });
      return;
    }
    this.loadingService.isLoading$.next(true);


      this.ad.name = this.form.controls.name.value,
      this.ad.description = this.form.controls.description.value,
      this.ad.price = this.form.controls.price.value,
      this.ad.categoryId = this.form.controls.categoryId.value,
      this.ad.images = this.form.controls.images.value
 

    this.adService.createAd(this.ad).subscribe((res: string) => {
      this.router.navigateByUrl('/advertisements/' + res);
      this.nzNotificationService.success('Успешно!', 'Объявление создано!');
      this.loadingService.isLoading$.next(false);
    });

    
  }

  handleChange(info: any) {
    if(info.file.status !== 'Загрузка...') {
      console.log(info.file, info.fileList);
    }
    console.log(this.form)
    if(info.file.status === 'done') {
      this.nzMessageService.success(`Файл загружен успешно.`);
      (this.form.get('images') as any).patchValue([
        ...this.form.get('images')!.value as any,
        info.file.response
      ])
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`Ошибка загрузки файла.`);
    }else if(info.file.status === 'removed') {
      this.deleteImageById(info.file.uid, this.form.get('images')?.value as any);
      this.deleteImageById(info.file.response, this.form.get('images')?.value as any);
  }
}


private deleteImageById(id: string, arr: Array<any>) {
  let index = arr.findIndex(el => el == id)
  if (arr.length > 0 && index != -1) {
      arr.splice(index, 1);
  }
}
  

  public config: DadataConfig = {
    apiKey: environment.daDataApiKey  ,
    type: DadataType.address
  };

  onAddressSelected(event: DadataSuggestion) {
    const addressData = event.data as DadataAddress;
    console.log(addressData);
    this.ad.country = addressData.country;
    this.ad.city = addressData.city;
    this.ad.street = addressData.street;
    this.ad.house = addressData.house;
    this.ad.flat = addressData.flat;
    this.ad.lat = addressData.geo_lat;
    this.ad.lon = addressData.geo_lon;
    this.ad.locationQueryString = 'Россия, ' + event.value;
  }

}



  


