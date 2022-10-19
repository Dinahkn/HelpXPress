import { OfferTeacher } from './../model/offerTeacher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferTeacherService {

  public endPointApi='https://localhost:44380/api/OfferTeacher/'
  constructor(private http:HttpClient) { }

  getOfferTeacherByCitySubjectLevel(idCity:any,idSubject:any,idLevel:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"citySubjectLevel?city="+idCity+"&subject="+idSubject+"&level="+idLevel)
  }
  getOfferTeacherByCitySubject(idCity:any,idSubject:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"citySubject?city="+idCity+"&subject="+idSubject)
  }
  getOfferTeacherBySubjectLevel(idSubject:any,idLevel:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"subjectLevel?subject="+idSubject+"&level="+idLevel)
  }
  getOfferTeacherByCityLevel(idCity:any,idLevel:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"cityLevel?city="+idCity+"&level="+idLevel)
  }
  getOfferTeacherByCity(idCity:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"city?city="+idCity)
  }
  getOfferTeacherBySubject(idSubject:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"subject?subject="+idSubject)
  }
  getOfferTeacherByLevel(idLevel:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"level?level="+idLevel)
  }

  postOfferTeacher(newOfferTeacher:any,header:any){
    return this.http.post<any>(this.endPointApi+"addOfferTeacher",newOfferTeacher,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  getOfferTeachers():Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"getOfferTeachers");
  }
  getOfferTeacher(idOfferTeacher:any){
    return this.http.get<OfferTeacher>(this.endPointApi+"getOfferTeachers/"+idOfferTeacher);
  }
  getOfferTeacherByUserID(userID:any,header:any):Observable<OfferTeacher[]>{
    return this.http.get<OfferTeacher[]>(this.endPointApi+"getOfferTeacherByUserID?userID="+userID,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  putOfferTeacher(offerTeacherToUpdate:any,id:any,header:any){
    return this.http.put<OfferTeacher>(this.endPointApi+"updateOfferTeacher/"+id,offerTeacherToUpdate,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  deleteOfferTeacher(id:number,header:any){
    return this.http.delete<OfferTeacher>(this.endPointApi+"deleteOfferTeacher/"+id,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }
}
