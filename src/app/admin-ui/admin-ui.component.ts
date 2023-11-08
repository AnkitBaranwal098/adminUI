import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from '../User.interface'
@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.css']
})
export class AdminUIComponent 
{
  userData : User[] = []
  constructor(private http:HttpClient){}

  ngOnInit(){
    this.fetchDataFromUrl()
  }
  handleClick(){
    
    this.fetchDataFromUrl('https://reqres.in/api/users?page=2')
  }
  fetchDataFromUrl(url='https://reqres.in/api/users'){
    this.http.get<{data: User[]}>(url).subscribe((responseData)=>{
      this.userData = responseData['data']
    })
  }

}
