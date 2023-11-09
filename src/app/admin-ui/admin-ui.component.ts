import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from '../User.interface'

import {HttpRequestService} from '../http-request.service'

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.css']
})
export class AdminUIComponent 
{
  userData : User[] = []
  constructor(private http:HttpClient, private httpService:HttpRequestService){}

  ngOnInit(){
    this.onFetchData();   
  }
  
  onFetchData(){
    this.httpService.fetchDataFromUrl().subscribe((responseData)=>{
      this.userData = responseData.data
      console.log(this.userData)
    })
  }

}
