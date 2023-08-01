import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qId=null;
  title=null;
  questions:any=[];
  constructor(private _route: ActivatedRoute, private _service: QuestionServiceService) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.title = this._route.snapshot.params['title'];
    console.log(this.qId);
    console.log(this.title);
    this._service.getQuestionsOfQuiz(this.qId).subscribe((data: any)=>{
      this.questions=data;
      console.log(this.questions);
    },
    (error)=>{
      console.log(error);
    }
    );
  }

  deleteQuestion(quesId: any){
    this._service.deleteQuestion(quesId).subscribe(
      (data:any)=>{
        Swal.fire('Success!!', 'Question delete successfully!!', 'success');
      },
      (error)=>{
        Swal.fire('Error!!', 'Error in deleting question', 'error');
      }
    )
  }

}
