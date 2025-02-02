import {inject, Injectable} from '@angular/core';
import {buildURL} from '../utils';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentDto, CreateCommentDto} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommentHttpService {

  private readonly url = buildURL('/api/comments')
  private readonly httpClient = inject(HttpClient);

  findAll(id: string): Observable<CommentDto[]> {
    return this.httpClient.get<CommentDto[]>(`${this.url}/by-group/${id}`);
  }

  findById(id: string): Observable<CommentDto> {
    return this.httpClient.get<CommentDto>(`${this.url}/${id}`)
  }

  create(data: CreateCommentDto): Observable<CommentDto> {
    return this.httpClient.post<CommentDto>(this.url, data)
  }

  update(data: CommentDto): Observable<any> {
    const {_id, ...update} = data;
    return this.httpClient.patch(`${this.url}/${_id}`, update)
  }

  destroy(id: string): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
