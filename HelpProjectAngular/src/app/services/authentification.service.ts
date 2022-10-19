import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  constructor(private http:HttpClient) { }
  public endPointApi='https://localhost:44380/api/users/login'

  login(auth:any){
    return this.http.post(this.endPointApi,auth,{responseType:"text"}).toPromise<any>();
  }

  set shareData(val:string){
    window.sessionStorage.setItem("data",val);
  }
  get shareData(){
    return window.sessionStorage.getItem("data")||'{}';
  }



}
