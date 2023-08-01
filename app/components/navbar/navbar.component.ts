import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

interface user {
  username: String | null,
  password: String | null;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: user | null = null;
  constructor(public login: LoginService) {
    
  }

  logOut(){
    this.login.logout();
    window.location.reload();
  }

  ngOnInit(): void {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user = this.login.getUser();
      console.log("Hello");
    })
  }

}
