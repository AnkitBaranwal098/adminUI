import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { User, UserPage } from './User.interface'
import { HttpRequestService } from './http-request.service'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userData: User[] = []
  currentPage: number = 0;
  totalPages: number = 0;
  totalPagesArray: number[] = []
  generateTotalPagesArray: boolean = true;
  constructor(private http: HttpClient, private httpService: HttpRequestService) { }

  ngOnInit() {
    this.FetchData('');
  }

  FetchData(passedUrl: string) {
    if (passedUrl.length === 0) {
      this.httpService.fetchDataFromUrl().subscribe((responseData: UserPage) => {
        // console.log(responseData.data);
        this.userData = responseData.data;
        console.log(this.userData);
        this.currentPage = responseData.page;
        this.totalPages = responseData.total_pages
        if (this.generateTotalPagesArray) {
          for (let i = 0; i < this.totalPages; i++) {
            this.totalPagesArray.push(i + 1)
          }
          console.log(this.totalPagesArray)
          this.generateTotalPagesArray = false
        }
      });
    } else {
      this.httpService.fetchDataFromUrl(passedUrl).subscribe((responseData: UserPage) => {
        // console.log(responseData.data);
        this.userData = responseData.data;
        // console.log(this.userData);
        this.currentPage = responseData.page;
        this.totalPages = responseData.total_pages
      });
    }
  }

  DeleteUser(id: number) {
    console.log(id)
    this.userData = this.userData.filter((user) => {
      return user.id != id
    })
    if (this.userData.length == 0 && this.currentPage > 1) {
      this.FetchData(`https://reqres.in/api/users?page=${this.currentPage - 1}`);
    }
  }

  EditUser(id: number) {
    console.log(id)

  }

  ChangePage(btn: number) {
    this.FetchData(`https://reqres.in/api/users?page=${btn}`)
  }



}
