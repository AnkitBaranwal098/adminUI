import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import {UserPage} from './User.interface'

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private apiUrl = 'https://reqres.in/api/users'
  constructor(private http:HttpClient) { }

  fetchDataFromUrl(url=this.apiUrl){
    return this.http.get<UserPage>(url)
  }

}
