import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public categories$ = this.categoryService.getAll();

  addCategoryForm = this.formBuilder.group({
    parentCategory: [''],
    childCategory: ['', [Validators.required, Validators.maxLength(50)]]
  })

  editCategoryForm = this.formBuilder.group({
    category: [''],
    name: ['', [Validators.required, Validators.maxLength(50)]]
  })

  deleteCategoryForm = this.formBuilder.group({
    category: ['', [Validators.required]]
  })

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  addCategorySubmit(){
    if (this.addCategoryForm.invalid) {
      this.nzNotificationService.error('Ошибка', 'Форма заполнена неверно');
      Object.values(this.addCategoryForm.controls).forEach(control => {
        if (control.invalid) {

          control.markAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    }
    this.loadingService.isLoading$.next(true);

    const parrentCategory = this.addCategoryForm.controls.parentCategory.value;
    const childCategory = this.addCategoryForm.controls.childCategory.value;
    console.log(parrentCategory)
    this.categoryService.addCategory(parrentCategory!, childCategory!).subscribe(res => {
      if(res != null){

        this.nzNotificationService.info("Информация", "Категория добавлена")
    this.loadingService.isLoading$.next(false);

      }
    })
  }

  editCategorySubmit(){
    if (this.editCategoryForm.invalid) {
      this.nzNotificationService.error('Ошибка', 'Форма заполнена неверно');
      Object.values(this.editCategoryForm.controls).forEach(control => {
        if (control.invalid) {

          control.markAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    }
    this.loadingService.isLoading$.next(true);

    const category = this.editCategoryForm.controls.category.value;
    const name = this.editCategoryForm.controls.name.value;

    this.categoryService.editCategory(category!, name!).subscribe(res => {
      if(res != null){

        this.nzNotificationService.info("Информация", "Категория добавлена")
    this.loadingService.isLoading$.next(false);

      }
    })
  }

  deleteCategorySubmit(){
    if (this.deleteCategoryForm.invalid) {
      this.nzNotificationService.error('Ошибка', 'Форма заполнена неверно');
      Object.values(this.deleteCategoryForm.controls).forEach(control => {
        if (control.invalid) {

          control.markAsTouched();
          control.updateValueAndValidity({onlySelf: true});
        }
      })
      return;
    }
    this.loadingService.isLoading$.next(true);

    const category = this.deleteCategoryForm.controls.category.value;
    this.categoryService.deleteCategory(category!).subscribe(res => {
      if(res != null){

        this.nzNotificationService.info("Информация", "Категория удалена")
    this.loadingService.isLoading$.next(false);

      }
    })
  }

}
