import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UploadCard } from 'src/app/models/upload-card.model';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';

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

  constructor(private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, private adService: AdService, private categoryService: CategoryService) { }

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
      image: this.form.controls.images.value
    }  
    this.adService.createAd(ad).subscribe((res: string) => {
      this.nzNotificationService.success('Успешно!', 'Объявление создано!')
    });

    
  }

}