import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid = null;
  questions:any = [];
  marksGot = 0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;

  constructor(private location: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionServiceService, private router: Router) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data)=>{
        this.questions=data;
        this.questions.forEach((q:any)=>{
          q['givenAnswer']='';
        })
      },
      (error)=>{
        console.log()
        Swal.fire('Error', 'error in loading questions', 'error');
      }
    )
  }

  preventBackButton(){
    history.pushState(null, "", location.href);
    this.location.onPopState(()=>{
      history.pushState(null, "", location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:"Do you want to submit the quiz?",
      showCancelButton: true,
      denyButtonText: "Don't save",
      icon: 'info',
      confirmButtonText:"Submit"
    }).then((e)=>{
      if(e.isConfirmed){
        this.isSubmit=true;
        this.questions.forEach((q:any)=>{
          if(q.givenAnswer==q.answer){
            this.correctAnswers++;
            let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
            this.marksGot += marksSingle;
          }
          if(q.givenAnswer.trim()!=''){
            this.attempted++;
          }
        })
      }
    })
    
  }
  goBack(){
    this.router.navigate(['/user-dashboard/0']);
  }
}
