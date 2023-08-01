import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId=0;
  quizzes:any=[];
  checked=true
  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private matSnackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.catId=this._route.snapshot.params['catId'];
    this._route.params.subscribe((param)=>{
      this.catId=param['catId'];
      if(this.catId==0){
        this._quiz.getActiveQuizzes().subscribe(
          (data)=>{
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error)=>{
            Swal.fire('Error!!', 'Error in loading quizzes', 'error');
          }
        )
      } else{
        this._quiz.getAllActiveQuizBasedOnCategory(this.catId).subscribe(
          (data)=>{
            this.quizzes=data;
          },
          (error)=>{
            alert("Error in loading quizzes");
          }
        )
      }
    })
    
  }
  startQuiz(qid: any){
    if (this.checked == true) {
      Swal.fire({
        icon: 'info',
        title: 'Do You want to Start the Quiz ?...',
        confirmButtonText: 'Start',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate([`start/${qid}`]);
        }
      });
    } else {
      this.matSnackBar.open(
        'Please Click On the Checkbox if you read all the Instruction Carefully',
        'ok',
        {
          duration: 3000,
        }
      );
    }
  }

  }

