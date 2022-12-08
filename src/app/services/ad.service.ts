import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Advertisement} from '../models/ad.model';
import { FullAdvertisement } from '../models/full-ad.model';
import { GetPagedResult } from '../models/get-paged-result.model';
import { UploadCard } from '../models/upload-card.model';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private cardUrl = `${environment.apiUrl}/v1/advertisement`;

  constructor(private httpClient: HttpClient) { }

  getPagedFiltered(offset: number, limit: number): Observable<Advertisement[]> {
    let url = `${this.cardUrl}?Offset=${offset}&Limit=${limit}`;
    return this.httpClient.get<Advertisement[]>(url);
  }

  getAuthorAdsPagedFiltered(offset: number, limit: number, userId: string): Observable<Advertisement[]> {
    let url = `${this.cardUrl}/get_all_by_author?Offset=${offset}&Limit=${limit}&AuthorId=${userId}`;
    return this.httpClient.get<Advertisement[]>(url);
  }

  public getById(id: string): Observable<FullAdvertisement> {
    return this.httpClient.get<FullAdvertisement>(`${this.cardUrl}/get-by-id?Id=${id}`);
  }

  public createAd(model: UploadCard): Observable<string> {
    return this.httpClient.post<string>(`${this.cardUrl}/create`, model);
  }

}
