import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NeedTeacher } from '../model/needTeacher';

@Injectable({
  providedIn: 'root'
})
export class NeedTeacherService {

  public endPointApi='https://localhost:44380/api/NeedTeachers/'
  constructor(private http:HttpClient) { }


  getNeedTeachers():Observable<NeedTeacher[]>{
    return this.http.get<NeedTeacher[]>(this.endPointApi+"getNeedTeacher");
  }
  getNeedTeacher(idNeedCarpool:any){
    return this.http.get<NeedTeacher>(this.endPointApi+"getNeedTeacher/"+idNeedCarpool);
  }
  getNeedTeacherByUserID(userID:any,header:any):Observable<NeedTeacher[]>{
    return this.http.get<NeedTeacher[]>(this.endPointApi+"getNeedTeacherByUserID?userID="+userID,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }

  postNeedTeacher(newNeedTeacher:any,header:any){
    return this.http.post<any>(this.endPointApi+"addNeedTeacher",newNeedTeacher,
      {
        headers:new HttpHeaders().set('Authorization',header)
      });
  }
  putNeedTeacher(needTeacherToUpdate:any,id:any,header:any){
    return this.http.put<NeedTeacher>(this.endPointApi+"updateNeedTeacher/"+id,needTeacherToUpdate,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  deleteNeedTeacher(id:number,header:any){
    return this.http.delete<NeedTeacher>(this.endPointApi+"deleteNeedTeacher/"+id,
      {
        headers:new HttpHeaders().set('Authorization',header)
      })
  }


}
