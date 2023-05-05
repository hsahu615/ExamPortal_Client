import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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

  constructor(private userService: UserService, private _snack: MatSnackBar) { }

  formSubmit(){
    this.userService.addUser(this.User).subscribe(
      (data: any)=>{
        Swal.fire('Success','User id is: ' + data.id, 'success');
      },
      (error)=>{
        console.log(error);
        this._snack.open("Something went wrong!", "Ok", {
          duration: 3000,
          horizontalPosition:"right",
        });
      }
    );
  }

  ngOnInit(): void {
  }

}
