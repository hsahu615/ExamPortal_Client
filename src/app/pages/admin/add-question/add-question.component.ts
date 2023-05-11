import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionServiceService } from 'src/app/services/question-service.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId=null;
  public editor = ClassicEditor;
  question:any={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }
  constructor(private _route: ActivatedRoute, private _service: QuestionServiceService) {}

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.question.quiz['qId']=this.qId;
  }

  formSubmit(){
    this._service.addQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('Success!!', 'Question added successfully', 'success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error)=>{
        Swal.fire('Error!!', 'Failed to add question', 'error');

      }
    )
  }

}
