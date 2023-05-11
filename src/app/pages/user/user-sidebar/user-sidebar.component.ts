import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  categories=null;
  constructor(private _cat: CategoryService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      error=>{
        Swal.fire('error!!', 'there is an error in getting categories', 'error');
      }
    )
  }

}
