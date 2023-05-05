import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // current user which is loggedin
  public getCurrentUser(){
    return this.http.get(baseUrl + "/current-user");
  }

  // generate token
  public generateToken(loginData: Object){
    return this.http.post(baseUrl+"/generate-token", loginData);
  }

  public loginUser(token: string): boolean{
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(): boolean{
    let token: string | null = localStorage.getItem('token');
    if(token==undefined || token== '' || token==null){
      return false;
    } else{
      return true;
    }
  }

  public logout(): boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  
  public getToken(): string | null{
    return localStorage.getItem('token');
  }

  public setUser(user: Object){
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    } else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
