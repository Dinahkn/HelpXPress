import { Observable } from 'rxjs';
import { OfferBabysitter } from './../model/offerBabysitter';
import { NeedBabysitter } from './../model/needBabysitter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NeedBabysitterService {

  public endPointApi='https://localhost:44380/api/NeedBabysitters/'
  constructor(private http:HttpClient) { }


  getNeedBabysitters():Observable<NeedBabysitter[]>{
    return this.http.get<NeedBabysitter[]>(this.endPointApi+"getNeedBabysitter");
  }
  getNeedBabysitter(idNeedBabysitter:any){
    return this.http.get<NeedBabysitter>(this.endPointApi+"getNeedBabysitter/"+idNeedBabysitter);
  }
  getNeedBabysitterByUserID(userID:any,header:any):Observable<NeedBabysitter[]>{
    return this.http.get<NeedBabysitter[]>(this.endPointApi+"getNeedBabysitterByUserID?userID="+userID,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }
  postNeedBabysitter(newNeedBabysitter:any,header:any){
    return this.http.post<any>(this.endPointApi+"addNeedBabysitter",newNeedBabysitter,
      {
        headers:new HttpHeaders().set('Authorization',header)
      });
  }
  putNeedBabysitter(needBabysitterToUpdate:any,id:any,header:any){
    return this.http.put<NeedBabysitter>(this.endPointApi+"updateNeedBabysitter/"+id,needBabysitterToUpdate,
      {
        headers:new HttpHeaders().set('Authorization',header)
      });
  }
  deleteNeedBabysitter(id:number,header:any){
    return this.http.delete<NeedBabysitter>(this.endPointApi+"deleteNeedBabysitter/"+id,
      {
        headers:new HttpHeaders().set('Authorization',header)
      })
  }
}
