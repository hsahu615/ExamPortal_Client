import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:23,
      title: 'Basic Java Quiz',
      description: 'The word Core describes the basic concept of something, and here, the phrase Core Java defines the basic Java that covers the basic concept of Java programming language.',
      numberOfQuestions: '20',
      maxMarks: '50',
      active:'',
      category: {
        title: 'category title'
      }
    },
    {
      qId:23,
      title: 'Basic Java Quiz',
      description: 'The word Core describes the basic concept of something, and here, the phrase Core Java defines the basic Java that covers the basic concept of Java programming language.',
      numberOfQuestions: '20',
      maxMarks: '50',
      active:'',
      category: {
        title: 'category title'
      }
    }
  ]

  constructor(private _service: QuizService) { }

  ngOnInit(): void {
    this._service.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      error=>{
        Swal.fire("Error!!", "Error in Loading data", "error")
      }
    )
  }
  deleteQuiz(q: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you Wanted to delete ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.DeleteQuiz(q.qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((e) => e.qId != q.qId);
          },
          (error: any) => {
            Swal.fire('Error!!', `Some Error Occured`, 'error');
          }
        );
      }
    });
  }

}
