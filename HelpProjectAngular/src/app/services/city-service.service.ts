import { City } from './../model/city';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityServiceService {

  public endPointApi='https://localhost:44380/api/City/'
  constructor(private http:HttpClient) { }


  getCities(){
    return this.http.get<City[]>(this.endPointApi+"getCity")
  }
  async getCity(idCity:any){
    return this.http.get(this.endPointApi+"getCity/"+idCity).toPromise<any>()
  }

  postCity(newCity:any,header:any){
    return this.http.post<any>(this.endPointApi+"addCity",newCity,
      {
        headers:new HttpHeaders().set('Authorization',header)
      })
  }
  putCity(cityToUpdate:any,id:any,header:any){
    return this.http.put<City>(this.endPointApi+"updateCity/"+id,cityToUpdate,
      {
        headers:new HttpHeaders().set('Authorization',header)
      })
  }
  deleteCity(id:number,header:any){
    return this.http.delete<City>(this.endPointApi+"deleteCity/"+id,
      {
        headers:new HttpHeaders().set('Authorization',header)
      })
  }
}

