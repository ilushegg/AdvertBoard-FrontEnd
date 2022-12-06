import { HttpBackend, HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadataAddress, DadataConfig, DadataSuggestion, DadataType, NgxDadataService } from '@kolkov/ngx-dadata';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { UploadCard } from 'src/app/models/upload-card.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-ad-creating',
  templateUrl: './ad-creating.component.html',
  styleUrls: ['./ad-creating.component.scss']
})
export class AdCreatingComponent implements OnInit {

  public categories$ = this.categoryService.getAll();
  

  public ad: UploadCard = {
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

  constructor(private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, private adService: AdService, private categoryService: CategoryService, private nzMessageService: NzMessageService, private photoService: PhotoService, public loadingService: LoadingService, private router: Router, private authService: AuthService,private handler: HttpBackend) {

   }

  ngOnInit(): void {
    
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


      this.ad.name = this.form.controls.name.value,
      this.ad.description = this.form.controls.description.value,
      this.ad.price = this.form.controls.price.value,
      this.ad.categoryId = this.form.controls.categoryId.value,
      this.ad.images = this.form.controls.images.value
 

    this.adService.createAd(this.ad).subscribe((res: string) => {
      this.router.navigateByUrl('/advertisements/' + res);
      this.nzNotificationService.success('Успешно!', 'Объявление создано!');
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
    }
  }

  public config: DadataConfig = {
    apiKey: '90b23b34110082cdd7fc96afdfccb260ada95ce3' ,
    type: DadataType.address
  };

  onAddressSelected(event: DadataSuggestion) {
    const addressData = event.data as DadataAddress;
    console.log(addressData);
    console.log(this.ad);
    this.ad.country = addressData.country;
    this.ad.city = addressData.city;
    this.ad.street = addressData.street;
    this.ad.house = addressData.house;
    this.ad.flat = addressData.flat;
    this.ad.lat = addressData.geo_lat;
    this.ad.lon = addressData.geo_lon;
    this.ad.locationQueryString = event.value;
  }





  

}
