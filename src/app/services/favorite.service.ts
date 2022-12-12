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
export class FavoriteService {

  private favoriteUrl = `${environment.apiUrl}/v1/favorite`;

  constructor(private httpClient: HttpClient) { }

  // getPagedFiltered(offset: number, limit: number): Observable<Advertisement[]> {
  //   let url = `${this.favoriteUrl}?Offset=${offset}&Limit=${limit}`;
  //   return this.httpClient.get<Advertisement[]>(url);
  // }

  // getAuthorAdsPagedFiltered(offset: number, limit: number, userId: string): Observable<GetPagedResult<Advertisement>> {
  //   let url = `${this.cardUrl}/get_all_by_author?Offset=${offset}&Limit=${limit}&AuthorId=${userId}`;
  //   return this.httpClient.get<GetPagedResult<Advertisement>>(url);
  // }

  // public getById(id: string): Observable<FullAdvertisement> {
  //   return this.httpClient.get<FullAdvertisement>(`${this.cardUrl}/get-by-id?Id=${id}`);
  // }

  public addToFavorite(advertisementId: string, userId: string): Observable<string> {
    return this.httpClient.post<string>(`${this.favoriteUrl}/add`, {advertisementId, userId});
  }

  public deleteFromFavorite(advertisementId: string, userId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.favoriteUrl}/delete?advertisementId=${advertisementId}&userId=${userId}`);
  }


}
