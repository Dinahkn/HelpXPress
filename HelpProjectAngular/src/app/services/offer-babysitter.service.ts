import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferBabysitter } from '../model/offerBabysitter';

@Injectable({
  providedIn: 'root'
})
export class OfferBabysitterService {

  public endPointApi='https://localhost:44380/api/OfferBabysitters/'
  constructor(private http:HttpClient) { }


  getOfferBabysitters():Observable<OfferBabysitter[]>{
    return this.http.get<OfferBabysitter[]>(this.endPointApi+"getOfferBabysitter");
  }
  getOfferBabysitter(idOfferBabysitter:any){
    return this.http.get<OfferBabysitter>(this.endPointApi+"getOfferBabysitter/"+idOfferBabysitter);
  }
  getOfferBabysitterByCity(idCity:any):Observable<OfferBabysitter[]>{
    return this.http.get<OfferBabysitter[]>(this.endPointApi+"getOfferBabysitterCity?cityID="+idCity)
  }
  getOfferBabysitterByDateCity(dateOffer:any,idCity:any):Observable<OfferBabysitter[]>{
    return this.http.get<OfferBabysitter[]>(this.endPointApi+"getOfferBabysitterByDateCity?date="+dateOffer+"&cityID="+idCity)
  }
  getOfferBabysitterByUserID(userID:any,header:any):Observable<OfferBabysitter[]>{
    return this.http.get<OfferBabysitter[]>(this.endPointApi+"getOfferBabysitterByUserID?userID="+userID,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }


  postOfferBabysitter(newOfferBabysitter:any,header:any){
    return this.http.post<any>(this.endPointApi+"addOfferBabysitter",newOfferBabysitter,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  putOfferBabysitter(offerBabysitterToUpdate:any,id:any,header:any){
    return this.http.put<OfferBabysitter>(this.endPointApi+"updateOfferBabysitter/"+id,offerBabysitterToUpdate,
      {
        headers:new HttpHeaders().set('Authorization',header)
      });
  }
  deleteOfferBabysitter(id:number,header:any){
    return this.http.delete<OfferBabysitter>(this.endPointApi+"deleteOfferBabysitter/"+id,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }

}
