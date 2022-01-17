import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = 'http://fetest.pangeatech.net/data';


  getList(): Observable<[]> {
    return this.http.get<[]>(this.url)
    .pipe(map((data: []) => data));
  }
}
