import { Component } from '@angular/core';
import {User, UserPage} from '../User.interface'

import {HttpRequestService} from '../http-request.service'
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.css']
})
export class AdminUIComponent 
{
  userData : User[] = []
  modifiedUserData:User[] = []
  currentPage: number = 0;
  totalPages:number = 0;
  totalPagesArray : number[] = []
  generateTotalPagesArray: boolean = true;
  constructor(private httpService:HttpRequestService, private userService: UserServiceService){}

  ngOnInit(){
    this.onFetchData(''); 
  }
  
  onFetchData(passedUrl:string) {
    if(passedUrl.length===0)
    {
      this.httpService.fetchDataFromUrl().subscribe((responseData: UserPage) => {
        // console.log(responseData.data);
        this.userData = responseData.data;
        this.modifiedUserData = this.userData
        console.log(this.userData);
        this.currentPage = responseData.page;
        this.totalPages = responseData.total_pages
        if(this.generateTotalPagesArray){
          for(let i=0;i<this.totalPages;i++){
            this.totalPagesArray.push(i+1)
          }
          // console.log(this.totalPagesArray)
          this.generateTotalPagesArray = false
        }
      });
    }else{
      this.httpService.fetchDataFromUrl(passedUrl).subscribe((responseData: UserPage) => {
        // console.log(responseData.data);
        this.userData = responseData.data;
        this.modifiedUserData = this.userData
        // console.log(this.userData);
        this.currentPage = responseData.page;
        this.totalPages = responseData.total_pages
      })
    }
  }

  // onFetchData(passedUrl:string){
  //   this.userService.FetchData('')
  //   console.log(this.userService.userData)
  // }
  
  onDeleteUser(id:number){
    console.log(id)
    this.modifiedUserData = this.modifiedUserData.filter((user)=>{
      return user.id!=id
    })
    this.userData = this.modifiedUserData
    if(this.modifiedUserData.length==0 && this.currentPage>1){
      this.onFetchData(`https://reqres.in/api/users?page=${this.currentPage-1}`);
    }  
  }

  onEditUser(id:number){
    console.log(id)

  }

  onChangePage(btn:number){
    this.onFetchData(`https://reqres.in/api/users?page=${btn}`)
  }

  onSearchUsers(event:any){
    console.log(event.target.value.length)

    if(event.target.value.length>0){
      this.modifiedUserData = this.modifiedUserData.filter((user)=>{
        return user.first_name.includes(event.target.value) || user.last_name.includes(event.target.value) || user.email.includes(event.target.value)
      })
    }
    else{
      this.modifiedUserData = this.userData
    }
    console.log(this.modifiedUserData)
    // this.userData = this.modifiedUserData
  }

}
