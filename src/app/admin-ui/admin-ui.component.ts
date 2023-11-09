import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User, UserPage} from '../User.interface'

import {HttpRequestService} from '../http-request.service'

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.css']
})
export class AdminUIComponent 
{
  userData : User[] = []
  currentPage: number = 0;
  totalPages:number = 0;
  totalPagesArray : number[] = []
  generateTotalPagesArray: boolean = true;
  constructor(private http:HttpClient, private httpService:HttpRequestService){}

  ngOnInit(){
    this.onFetchData(''); 
  }
  
  onFetchData(passedUrl:string) {
    if(passedUrl.length===0)
    {
      this.httpService.fetchDataFromUrl().subscribe((responseData: UserPage) => {
        // console.log(responseData.data);
        this.userData = responseData.data;
        // console.log(this.userData);
        this.currentPage = responseData.page;
        this.totalPages = responseData.total_pages
        if(this.generateTotalPagesArray){
          for(let i=0;i<this.totalPages;i++){
            this.totalPagesArray.push(i+1)
          }
          console.log(this.totalPagesArray)
          this.generateTotalPagesArray = false
        }
      });
    }else{
      this.httpService.fetchDataFromUrl(passedUrl).subscribe((responseData: UserPage) => {
        // console.log(responseData.data);
        this.userData = responseData.data;
        // console.log(this.userData);
        this.currentPage = responseData.page;
        this.totalPages = responseData.total_pages
      });
    }
  }
  
  onDeleteUser(id:number){
    console.log(id)
    this.userData = this.userData.filter((user)=>{
      return user.id!=id
    })
    if(this.userData.length==0 && this.currentPage>1){
      this.onFetchData(`https://reqres.in/api/users?page=${this.currentPage-1}`);
    }  
  }

  onEditUser(id:number){
    console.log(id)

  }

  onChangePage(btn:number){
    this.onFetchData(`https://reqres.in/api/users?page=${btn}`)
  }

}
