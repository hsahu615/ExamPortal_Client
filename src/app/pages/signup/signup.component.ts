import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public User = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  }

  constructor(private userService: UserService, private _snack: MatSnackBar, private route: Router) { }

  formSubmit(){
    this.userService.addUser(this.User).subscribe(
      (data: any)=>{
        Swal.fire('Success','User id is: ' + data.id, 'success');
        this.route.navigate(['/login']);
        
      },
      (error)=>{
        
        console.log("hey", error);
        this._snack.open(error.error, "Ok", {
          duration: 3000,
          horizontalPosition:"right",
        });
      }
    );
  }

  ngOnInit(): void {
  }

}
