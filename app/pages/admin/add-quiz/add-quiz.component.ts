import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  category =[
    {
      cid : '',
      title: '',
      description : '',
    }
  ];

  quiz = {
      title : '',
      description : '',
      active : false,
      maxMarks : '',
      numberOfQuestions : '',
      category : {
        cid : '',
      },
    };
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.LoadCat();
  }


  LoadCat()
  {
    this.quizService.LoadCategories().subscribe(
      (data:any)=>{
        this.category = data;
        // console.log(this.category);
      },
      (error:any)=>{
        Swal.fire('Error!!' , `Can't able to load the category` , 'error');
        console.log(error);
      }
    );
  }

  AddQuiz()
  {
    // console.log(this.quiz);
    this.quizService.AddQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Successfull' , `Quiz Added Successfully` , 'success');
      },
      (error:any)=>{
        Swal.fire('Error!!' , `Error!!` , 'error');
      }
    );
  }
}