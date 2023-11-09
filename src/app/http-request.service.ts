import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';

import {User} from './User.interface'
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  constructor(private http:HttpClient) { }

  fetchDataFromUrl(url='https://reqres.in/api/users'){
    return this.http.get<{data: User[]}>(url)
  }
}
