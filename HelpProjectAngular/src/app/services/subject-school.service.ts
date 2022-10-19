import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectSchool } from '../model/subjectSchool';

@Injectable({
  providedIn: 'root'
})
export class SubjectSchoolService {

  public endPointApi='https://localhost:44380/api/SubjectSchool/'
  constructor(private http:HttpClient) { }

  postSubject(newLevel:any,header:any){
    return this.http.post<any>(this.endPointApi+"addSubjectSchool",newLevel,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  getSubjects():Observable<SubjectSchool[]>{
    return this.http.get<SubjectSchool[]>(this.endPointApi+"getSubjectSchool");
  }
  getSubject(idLevel:number){
    return this.http.get<SubjectSchool>(this.endPointApi+"getSubjectSchool/"+idLevel);
  }
  putSubject(levelToUpdate:any,id:any,header:any){
    return this.http.put<SubjectSchool>(this.endPointApi+"updateSubjectSchool/"+id,levelToUpdate,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  deleteSubject(id:number,header:any){
    return this.http.delete<SubjectSchool>(this.endPointApi+"deleteSubjectSchool/"+id,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
}
