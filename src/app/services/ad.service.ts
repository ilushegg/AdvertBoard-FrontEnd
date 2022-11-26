import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card.model';
import { GetPagedResult } from '../models/get-paged-result.model';
import { UploadCard } from '../models/upload-card.model';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private cardUrl = `${environment.apiUrl}/v1/product`;

  constructor(private httpClient: HttpClient) { }

  getPagedFiltered(offset: number, limit: number): Observable<Card[]> {
    let url = `${this.cardUrl}?Offset=${offset}&Limit=${limit}`;
    return this.httpClient.get<Card[]>(url);
  }

  public getById(id: string): Observable<Card> {
    return this.httpClient.get<Card>(`${this.cardUrl}/getById?Id=${id}`);
  }

  public createAd(model: UploadCard): Observable<string> {
    return this.httpClient.post<string>(`${this.cardUrl}/create`, model);
  }

}
