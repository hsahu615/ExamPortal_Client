import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`)
  }
  public getQuiz(): Observable<any> {
    return this._http.get<any>(`${baseUrl}/quiz/`);
  }

  //Loading Category
  public LoadCategories(): Observable<any> {
    return this._http.get<any>(`${baseUrl}/category/`);
  }

  public AddQuiz(data: any): Observable<any> {
    return this._http.post<any>(`${baseUrl}/quiz/`, data);
  }

  //delete the quiz
  public DeleteQuiz(id: any) {
    return this._http.delete(`${baseUrl}/quiz/${id}`, id);
  }

  //get The single quiz;
  public getSingleQuiz(qid: any): Observable<any> {
    return this._http.get<any>(`${baseUrl}/quiz/${qid}`, qid);
  }

  //update Quiz
  public updateQuiz(data: any) {
    return this._http.post<any>(`${baseUrl}/quiz/`, data);
  }

  // getQuestionbased on categoryId
  public getQuizBasedonCid(val : any):Observable<any>
  {
     return this._http.get<any>(`${baseUrl}/quiz/category/${val}`);
  }

  //getOnlyActive Quizzes
  public getActiveQuizzes():Observable<any>
  {
    return this._http.get<any>(`${baseUrl}/quiz/active`);
  }

  public getAllActiveQuizBasedOnCategory(cid : any)
  {
    return this._http.get<any>(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
