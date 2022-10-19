import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NeedCarpool } from '../model/needCarpool';
import { OfferCarpool } from '../model/offerCarpool';

@Injectable({
  providedIn: 'root'
})
export class NeedCarpoolService {

  public endPointApi='https://localhost:44380/api/NeedCarpool/'
  constructor(private http:HttpClient) { }


  getNeedCarpools():Observable<NeedCarpool[]>{
    return this.http.get<NeedCarpool[]>(this.endPointApi+"getNeedCarpool");
  }
  getNeedCarpool(idNeedCarpool:any){
    return this.http.get<NeedCarpool>(this.endPointApi+"getNeedCarpool/"+idNeedCarpool);
  }
  getNeedCarpoolByUserID(userID:any,header:any):Observable<NeedCarpool[]>{
    return this.http.get<NeedCarpool[]>(this.endPointApi+"getNeedCarpoolByUserID?userID="+userID,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }

  postNeedCarpool(newNeedCarpool:any,header:any){
    return this.http.post<any>(this.endPointApi+"addNeedCarpool",newNeedCarpool,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  putNeedCarpool(needCarpoolToUpdate:any,id:any,header:any){
    return this.http.put<any>(this.endPointApi+"updateNeedCarpool/"+id,needCarpoolToUpdate,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  deleteNeedCarpool(id:number,header:any){
    return this.http.delete<NeedCarpool>(this.endPointApi+"deleteNeedCarpool/"+id,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }


}
