import { HttpBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadataAddress, DadataConfig, DadataSuggestion, DadataType } from '@kolkov/ngx-dadata';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Advertisement } from 'src/app/models/ad.model';
import { UploadAd } from 'src/app/models/upload-ad.model';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ad-editing',
  templateUrl: './ad-editing.component.html',
  styleUrls: ['./ad-editing.component.scss']
})
export class AdEditingComponent implements OnInit {
  public categories$ = this.categoryService.getAll();
  public environmentUrl = environment.apiUrl;

  public ad: UploadAd = {
    userId: this.authService.id,
    name: null,
    description: null,
    price: null,
    categoryId: null,
    images: [],
    country: null,
    city: null,
    street: null,
    house: null,
    flat: null,
    lat: null,
    lon: null,
    locationQueryString: null
  };

  public images: NzUploadFile[] = [];

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    price: [0, [Validators.pattern(/^\d+(,\d{1,2})?$/)]],
    categoryId: ['', Validators.required],
    images: [['']],
    address: ['', Validators.required]
  })

  id = this.activatedRoute.snapshot.params['id'];

  constructor(private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, private adService: AdService, private categoryService: CategoryService, private nzMessageService: NzMessageService, private photoService: PhotoService, public loadingService: LoadingService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {

   }

   ngOnInit(): void {
    this.loadingService.isLoading$.next(true);
    
    this.adService.getById(this.id).subscribe(res => {
      for(let i = 0; i<Object.keys(res.images).length; i++){
        this.images.push({
          uid: res.images[i].item1,
          response: res.images[i].item1,
          name: 'Файл',
          status: 'done',
          url: res.images[i].item2
        });
        this.ad.images?.push(res.images[i].item1);
      }
      
      this.form.patchValue({
        name: res.name,
      description: res.description,
      price: res.price,
      categoryId: res.categoryId,
      address: res.locationQueryString,
      images: this.ad.images
    });
    this.loadingService.isLoading$.next(false);

    


    })

  }

  


  onSubmit() {
    this.loadingService.isLoading$.next(true);
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
      this.ad.locationQueryString = this.form.controls.address.value
      this.ad.images = this.form.controls.images.value


    this.adService.editAd(this.id, this.ad).subscribe((res: string) => {
      this.router.navigateByUrl('/advertisements/' + res);
      this.nzNotificationService.success('Успешно!', 'Объявление создано!');
      this.loadingService.isLoading$.next(false);
    });

    
  }

  handleChange(info: any) {
    if(info.file.status !== 'Загрузка...') {
      console.log(info.file, info.fileList);
    }
    if(info.file.status === 'done') {
      this.nzMessageService.success(`Файл загружен успешно.`);
      (this.form.get('images') as any).patchValue([
        ...this.form.get('images')!.value as any,
        info.file.response
      ])
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`Ошибка загрузки файла.`);
    }
    else if(info.file.status === 'removed') {
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
    apiKey: environment.daDataApiKey ,
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
