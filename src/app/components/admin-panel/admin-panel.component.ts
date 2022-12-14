import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public categories$ = this.categoryService.getAll();
  user: User = {
    id: '',
    name: '',
    email: '',
    mobile: '',
    avatar: '',
    createDate: '',
    userRole: '',
    activationCode: ''
  }

  addCategoryForm = this.formBuilder.group({
    parentCategory: [''],
    childCategory: ['', [Validators.required, Validators.maxLength(50)]]
  })

  editCategoryForm = this.formBuilder.group({
    categoryEdit: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(50)]]
  })

  deleteCategoryForm = this.formBuilder.group({
    categoryDelete: ['', [Validators.required]]
  })

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private nzNotificationService: NzNotificationService, public loadingService: LoadingService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getSelfById(this.authService.id!).subscribe(res => {
      this.user = res;
    })
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

    const category = this.editCategoryForm.controls.categoryEdit.value;
    const name = this.editCategoryForm.controls.name.value;

    this.categoryService.editCategory(category!, name!).subscribe(res => {
      if(res != null){

        this.nzNotificationService.info("Информация", "Категория изменена")
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

    const category = this.deleteCategoryForm.controls.categoryDelete.value;
    this.categoryService.deleteCategory(category!).subscribe(res => {
      if(res != null){

        this.nzNotificationService.info("Информация", "Категория удалена")
    this.loadingService.isLoading$.next(false);

      }
    })
  }

  isVisible = false;
  showModal(): void {
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
    this.isVisible = true;
  }

  handleOk(): void {
    this.deleteCategorySubmit();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  

}
