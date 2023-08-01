import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category={
    title: '',
    description: ''
  }

  constructor(private categoryService: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this._snack.open("Title Required !!", '', {
        duration: 3000
      })
    }
    console.log(this.category);
    this.categoryService.addCategory(this.category).subscribe(
      (data)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success!!", "Category added successfuly", 'success')
      }, 
      (error)=>{
        this._snack.open("There is an error in adding category.", "", {duration:3000})
      }
    )
  }

  

}
