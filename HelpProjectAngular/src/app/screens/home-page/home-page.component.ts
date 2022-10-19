import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(){}
  isLogged():boolean{
    if(sessionStorage.length!=0 && JSON.parse(sessionStorage.getItem('userDetails')||'')!=''){
      return true;
    }
    else{
      sessionStorage.setItem('userDetails',JSON.stringify(''))
      return false
    }
  }

  async seeBabysitters(){
    sessionStorage.setItem('needBabysitterDetails','seeBabysitters')
    sessionStorage.setItem('needCarpoolDetails','')
    sessionStorage.setItem('needTeacherDetails','')
    this._router.navigateByUrl('/SeeResults');
  }
  async seeTeachers(){
    sessionStorage.setItem('needBabysitterDetails','')
    sessionStorage.setItem('needCarpoolDetails','')
    sessionStorage.setItem('needTeacherDetails','seeTeachers')

    this._router.navigateByUrl('/SeeResults');
  }
  async seeCarpools(){
    sessionStorage.setItem('needBabysitterDetails','')
    sessionStorage.setItem('needCarpoolDetails','seeCarpools')
    sessionStorage.setItem('needTeacherDetails','')
    this._router.navigateByUrl('/SeeResults');
  }
}

