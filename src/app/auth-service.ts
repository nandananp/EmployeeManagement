import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseurl = 'http://localhost:8082'
  constructor(private http:HttpClient){}
  login(credentials : any){
    return this.http.post<any>(`${this.baseurl}/login`,credentials);
  }
  saveToken(token:string){
    localStorage.setItem('userToken', token);
  }
  getToken(){
    return localStorage.getItem('userToken');
  }
  logout(){
    return localStorage.removeItem('userToken');
  }
  isLoggedIn(): boolean{
    return !!this.getToken();
  }
}
  

    

