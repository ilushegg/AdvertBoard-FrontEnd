import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private adUrl = `${environment.apiUrl}/v1/category`;
  
  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.adUrl}`);
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
