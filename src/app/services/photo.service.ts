import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoUrl = `${environment.apiUrl}/image`

  constructor(private httpClient: HttpClient) { }

  public savePhoto(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<string>(`${this.photoUrl}/create`, formData);

  }
  public deletePhoto(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.photoUrl}/delete?Id=${id}`);
  }
}
