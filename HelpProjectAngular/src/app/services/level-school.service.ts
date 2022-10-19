import { Observable } from 'rxjs';
import { Levels } from './../model/levels';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LevelSchoolService {

  public endPointApi='https://localhost:44380/api/Levels/'
  constructor(private http:HttpClient) { }


  getLevels():Observable<Levels[]>{
    return this.http.get<Levels[]>(this.endPointApi+"getLevels");
  }
  getLevel(idLevel:number){
    return this.http.get<Levels>(this.endPointApi+"getLevels/"+idLevel);
  }

  postLevel(newLevel:any,header:any){
    return this.http.post<any>(this.endPointApi+"addLevel",newLevel,
      {
        headers:new HttpHeaders().set('Authorization',header)
      });
  }
  putLevel(levelToUpdate:any,id:any,header:any){
    return this.http.put<Levels>(this.endPointApi+"updateLevel/"+id,levelToUpdate,
    {
      headers:new HttpHeaders().set('Authorization',header)
    });
  }
  deleteLevel(id:number,header:any){
    return this.http.delete<Levels>(this.endPointApi+"deleteLevel/"+id,
      {
        headers:new HttpHeaders().set('Authorization',header)
      });
  }
}
