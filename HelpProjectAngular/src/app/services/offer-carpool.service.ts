import { OfferCarpool } from './../model/offerCarpool';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferCarpoolService {

  public endPointApi='https://localhost:44380/api/OfferCarpool/'
  constructor(private http:HttpClient) { }

  getOfferCarpools():Observable<OfferCarpool[]>{
    return this.http.get<OfferCarpool[]>(this.endPointApi+"getOfferCarpool");
  }
  getOfferCarpool(idOfferCarpool:any){
    return this.http.get<OfferCarpool>(this.endPointApi+"getOfferCarpool/"+idOfferCarpool);
  }
  getOfferCarpoolByCities(idCityDep:any,idCityArr:any):Observable<OfferCarpool[]>{
    return this.http.get<OfferCarpool[]>(this.endPointApi+"cities?cityD="+idCityDep+"&cityA="+idCityArr)
  }
  getOfferCarpoolByCitiesAndDate(idCityDep:any,idCityArr:any,dateCar:any):Observable<OfferCarpool[]>{
    return this.http.get<OfferCarpool[]>(this.endPointApi+"citiesAndDate?cityD="+idCityDep+"&cityA="+idCityArr+"&date="+dateCar)
  }
  getOfferCarpoolByUserID(userID:any,header:any):Observable<OfferCarpool[]>{
    return this.http.get<OfferCarpool[]>(this.endPointApi+"getOfferCarpoolByUserID?userID="+userID,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }


  postOfferCarpool(newOfferCarpool:any,header:any){
    return this.http.post<any>(this.endPointApi+"addOfferCarpool",newOfferCarpool,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  putOfferCarpool(offerCarpoolToUpdate:any,id:any,header:any){
    return this.http.put<OfferCarpool>(this.endPointApi+"updateOfferCarpool/"+id,offerCarpoolToUpdate,
      {
        headers:new HttpHeaders().set('Authorization',header)
      });
  }
  deleteOfferCarpool(id:number,header:any){
    return this.http.delete<OfferCarpool>(this.endPointApi+"deleteOfferCarpool"+id,
      {
        headers:new HttpHeaders().set('Authorization',header)
      })
  }
}
