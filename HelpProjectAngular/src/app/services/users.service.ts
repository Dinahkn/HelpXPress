import { ForgotPassword } from './../model/forgotPassword';
import { User } from './../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public endPointApi='https://localhost:44380/api/users/'
  constructor(private http:HttpClient) { }

  async getUserByJWT(header:any){
    return this.http.get(this.endPointApi+"getByJWT/",{
      headers:new HttpHeaders().set('Authorization',header)
    }).toPromise<any>();
  }
  postUser(newUser:any){
    return this.http.post<any>(this.endPointApi+"addUser/",newUser);
  }
  postAdmin(newAdmin:any,header:any){
    return this.http.post<any>(this.endPointApi+"addAdmin/",newAdmin,
    {
      headers:new HttpHeaders().set('Authorization',header)
    })
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.endPointApi+"getUsers/");
  }
  getUser(idUser:number){
    return this.http.get<User>(this.endPointApi+"getUsers/"+idUser);
  }
  putUser(userToUpdate:any,header:any){
    return this.http.put<User>(this.endPointApi+"updateUser/"+userToUpdate.IDUser,userToUpdate,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  deleteUser(id:number,header:any){
    return this.http.delete<User>(this.endPointApi+"deleteUser/"+id,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  forgetPassword(userForgotPass:any){
    return this.http.post<any>(this.endPointApi+"forgetPassword/",userForgotPass);
  }
  resetPassword(userResetPass:any){
    return this.http.post<any>(this.endPointApi+"resetPassword/",userResetPass);
  }
  contactUs(formContact:any){
    return this.http.post<any>(this.endPointApi+"contactUs/",formContact);
  }
}
