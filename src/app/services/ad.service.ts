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

  getPagedFiltered(offset: number, limit: number, userId: string): Observable<Advertisement[]> {
    let url = userId ? `${this.cardUrl}?Offset=${offset}&Limit=${limit}&UserId=${userId}` : `${this.cardUrl}?Offset=${offset}&Limit=${limit}`;
    return this.httpClient.get<Advertisement[]>(url);
  }

  getAuthorAdsPagedFiltered(offset: number, limit: number, userId: string): Observable<GetPagedResult<Advertisement>> {
    let url = `${this.cardUrl}/get_all_by_author?Offset=${offset}&Limit=${limit}&AuthorId=${userId}`;
    return this.httpClient.get<GetPagedResult<Advertisement>>(url);
  }

  

  public getById(advertisementId: string, userId: string): Observable<FullAdvertisement> {
    let url = userId ? `${this.cardUrl}/get-by-id?advertisementId=${advertisementId}&userId=${userId}` : `${this.cardUrl}/get-by-id?advertisementId=${advertisementId}`;
    return this.httpClient.get<FullAdvertisement>(url);
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
