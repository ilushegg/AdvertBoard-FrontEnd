import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetPagedResult } from '../models/get-paged-result.model';
import { UploadComment } from '../models/upload-comment.model';
import { Comment } from '../models/comment.model';
import { Response} from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  private commentUrl = `${environment.apiUrl}/v1/comment`;

  constructor(private httpClient: HttpClient) { }


  public createComment(model: UploadComment): Observable<Response<string>> {
    return this.httpClient.post<Response<string>>(`${this.commentUrl}/create`, model);
  }

  public getAdCommentsPaged(offset: number, limit: number, id: string): Observable<GetPagedResult<Comment>> {
    return this.httpClient.get<GetPagedResult<Comment>>(`${this.commentUrl}/get_all_by_advertisement?Offset=${offset}&Limit=${limit}&Id=${id}`);
  }

  public getUserCommentsPaged(offset: number, limit: number, id: string): Observable<GetPagedResult<Comment>> {
    return this.httpClient.get<GetPagedResult<Comment>>(`${this.commentUrl}/get_all_by_user?Offset=${offset}&Limit=${limit}&Id=${id}`);
  }
  
  public editComment(id: string, text: string): Observable<string> {
    return this.httpClient.put<string>(`${this.commentUrl}/edit`, {id, text});
  }

  public deleteComment(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.commentUrl}/delete?Id=${id}`);
  }
  

}
