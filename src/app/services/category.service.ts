import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private catUrl = `${environment.apiUrl}/v1/category`;
  
  
  constructor(private httpClient: HttpClient, private loadingService: LoadingService) { }

  public getAll(): Observable<any> {
    this.loadingService.isLoading$.next(false);
    return this.httpClient.get<any>(`${this.catUrl}`);
    
  }

  public addCategory(parentCategory: string, childCategory: string): Observable<any> {
    console.log({parentCategory, childCategory})
    if(parentCategory == ''){
      return this.httpClient.post(`${this.catUrl}/add`, {childCategory});
    }
    else {
      return this.httpClient.post(`${this.catUrl}/add`, {parentCategory, childCategory});

    }
  }

  public editCategory(categoryId: string, name: string): Observable<any> {
    return this.httpClient.post(`${this.catUrl}/edit`, {categoryId, name});
  }

  public deleteCategory(category: string): Observable<any> {
    return this.httpClient.delete(`${this.catUrl}/delete?categoryId=${category}`);
  }

  private arrayToNzCascade(array: Category[]) {
    return array.map(item => {
      const processed = {
        key: item.id,
        title: item.name
      } as any;

      if (item.childCategories?.length) {
        processed.children = this.arrayToNzCascade(item.childCategories);
      } else {
        processed.isLeaf = true;
      }
      return processed;
    })
  }
}
