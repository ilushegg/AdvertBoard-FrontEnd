import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Advertisement} from '../models/ad.model';
import { FullAdvertisement } from '../models/full-ad.model';
import { GetPagedResult } from '../models/get-paged-result.model';
import { UploadAd } from '../models/upload-ad.model';

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

  getAuthorAdsPagedFiltered(offset: number, limit: number, userId: string): Observable<GetPagedResult<Advertisement>> {
    let url = `${this.cardUrl}/get_all_by_author?Offset=${offset}&Limit=${limit}&AuthorId=${userId}`;
    return this.httpClient.get<GetPagedResult<Advertisement>>(url);
  }

  public getById(id: string): Observable<FullAdvertisement> {
    return this.httpClient.get<FullAdvertisement>(`${this.cardUrl}/get-by-id?Id=${id}`);
  }

  public createAd(model: UploadAd): Observable<string> {
    return this.httpClient.post<string>(`${this.cardUrl}/create`, model);
  }

  public editAd(id: string, model: UploadAd): Observable<string> {
    console.log({id, ...model})
    return this.httpClient.put<string>(`${this.cardUrl}/edit`,{id, ...model});
  }


  public deleteAd(adId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.cardUrl}/delete?Id=${adId}`);
  }

}
