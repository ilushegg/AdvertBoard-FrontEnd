import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UploadCard } from 'src/app/models/upload-card.model';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-ad-creating',
  templateUrl: './ad-creating.component.html',
  styleUrls: ['./ad-creating.component.scss']
})
export class AdCreatingComponent implements OnInit {

  public categories$ = this.categoryService.getAll();

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    price: [0, [Validators.pattern(/^\d+(,\d{1,2})?$/)]],
    categoryId: ['', Validators.required],
    images: [[]]
  })

  constructor(private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, private adService: AdService, private categoryService: CategoryService, private nzMessageService: NzMessageService, private photoService: PhotoService) { }

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

    let ad: UploadCard = {
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
      price: this.form.controls.price.value,
      categoryId: this.form.controls.categoryId.value,
      images: this.form.controls.images.value
    }  
    console.log(ad);
    this.adService.createAd(ad).subscribe((res: string) => {
      this.nzNotificationService.success('Успешно!', 'Объявление создано!')
    });

    
  }

  handleChange(info: any) {
    if(info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    console.log(this.form)
    if(info.file.status === 'done') {
      this.nzMessageService.success(`${info.file.name} file uploaded successfully`);
      (this.form.get('images') as any).patchValue([
        ...this.form.get('images')!.value as any,
        info.file.response
      ])
    } else if (info.file.status === 'error') {
      this.nzMessageService.error(`${info.file.name} file upload failed.`);
    }
  }

}
