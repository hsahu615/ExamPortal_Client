import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: "",
    password: ""
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open("Username is required!!", '', {
        duration: 3000
      });
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open("Password is required!!", '', {
        duration: 3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data: any)=>{
        
        // login 
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user) => {
            this.loginService.setUser(user);
            console.log(user);
            // redirect... ADMIN: admin-dashboard
            // redirect... NORMAL: normal-dashboard
            if(this.loginService.getUserRole()=='ADMIN'){
              this.router.navigate(['/admin/profile']);
              this.loginService.loginStatusSubject.next(true);
            } else if(this.loginService.getUserRole()=='NORMAL'){
              this.router.navigate(['/user-dashboard/0']);
              this.loginService.loginStatusSubject.next(true);
            } else{
              this.loginService.logout();
            }
          },
          error => console.log(error)
        )
      },
      (error)=>{
        console.log(error);
        this.snack.open("Invalid Details !! Try again", '', {
          duration: 3000
        })
      }
    )

  }

}
