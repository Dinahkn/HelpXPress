
import { OfferCarpool } from './../../model/offerCarpool';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from 'src/app/model/user';
import { NeedBabysitter } from 'src/app/model/needBabysitter';
import { NeedCarpool } from 'src/app/model/needCarpool';
import { NeedTeacher } from 'src/app/model/needTeacher';
import { OfferBabysitter } from 'src/app/model/offerBabysitter';

import { OfferCarpoolService } from 'src/app/services/offer-carpool.service';
import { OfferBabysitterService } from 'src/app/services/offer-babysitter.service';
import { OfferTeacherService } from 'src/app/services/offer-teacher.service';
import { OfferTeacher } from 'src/app/model/offerTeacher';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-results-search',
  templateUrl: './results-search.component.html',
  styleUrls: ['./results-search.component.css']
})
export class ResultsSearchComponent implements OnInit {

  userLogged:User=JSON.parse(sessionStorage.getItem('userDetails')||'');
  onEditUser(){
    this.dialog.open(DialogUserComponent,{
      width:'100%',
      data:this.userLogged
    }).afterClosed();
  }
  getNameUser():string{
    return this.userLogged.FullName||'';
  }

  public showbbsit=false;
  public showcarpool=false;
  public showteacher=false;

  @ViewChild('offerBabysitterPaginator')offerBabysitterPaginator!:MatPaginator;
  @ViewChild('offerBabysitterSort')offerBabysitterSort!:MatSort;
  dataSourceBabysitters=new MatTableDataSource<OfferBabysitter>();
  public displayColumnOfferBabysitter:string[]=['City','DateBabysitter','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','Comments','detailsBtn']

  @ViewChild('offerCarpoolPaginator')offerCarpoolPaginator!:MatPaginator;
  @ViewChild('offerCarpoolSort')offerCarpoolSort!:MatSort;
  dataSourceCarpools=new MatTableDataSource<OfferCarpool>();
  public displayColumnOfferCarpool:string[]=['CityDeparture','CityArrival','DateHourDeparture','CarModel','Comments','detailsBtn']


  @ViewChild('offerTeacherPaginator')offerTeacherPaginator!:MatPaginator;
  @ViewChild('offerTeacherSort')offerTeacherSort!:MatSort;
  dataSourceTeachers=new MatTableDataSource<OfferTeacher>();
  public displayColumnOfferTeacher:string[]=['City','DatePossible','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','Subject','Level','Comments','detailsBtn']


  constructor(private dialog:MatDialog,private _teacherService:OfferTeacherService,private _bbsitService:OfferBabysitterService,private _carpoolService:OfferCarpoolService) { }

  async ngOnInit() {
    if(sessionStorage.getItem('needBabysitterDetails')!='' && sessionStorage.getItem('needTeacherDetails')=='' && sessionStorage.getItem('needCarpoolDetails')==''){
      this.showbbsit=true;
      this.showcarpool=false;
      this.showteacher=false;
      this.resultsBabysitter();
    }
    if(sessionStorage.getItem('needCarpoolDetails')!='' && sessionStorage.getItem('needBabysitterDetails')=='' && sessionStorage.getItem('needTeacherDetails')==''){
      this.showbbsit=false;
      this.showcarpool=true;
      this.showteacher=false;
      this.resultsCarpool();
    }
    if(sessionStorage.getItem('needTeacherDetails')!='' && sessionStorage.getItem('needBabysitterDetails')=='' && sessionStorage.getItem('needCarpoolDetails')==''){
      this.showbbsit=false;
      this.showcarpool=false;
      this.showteacher=true;
      this.resultTeachers();
    }
  }


  getAllOfferBabysitters(){
    this._bbsitService.getOfferBabysitters()
    .subscribe({
      next:(res)=>{
        this.dataSourceBabysitters=new MatTableDataSource(res);
        this.dataSourceBabysitters.paginator=this.offerBabysitterPaginator;
        this.dataSourceBabysitters.sort=this.offerBabysitterSort;
      },
      error:()=>{
        alert("בעייה בקבלת רשימת הביביביטרים! ")
      }
    })
  }
  getOfferBabysitterByCity(){
    let bbsitNeed:NeedBabysitter=JSON.parse(sessionStorage.getItem('needBabysitterDetails')||'')
    let idCity=bbsitNeed.IDCity||0
    this._bbsitService.getOfferBabysitterByCity(idCity)
    .subscribe({
      next:(res)=>{
        this.dataSourceBabysitters=new MatTableDataSource(res);
        this.dataSourceBabysitters.paginator=this.offerBabysitterPaginator;
        this.dataSourceBabysitters.sort=this.offerBabysitterSort;
      },
      error:()=>{
        alert("בעייה בקבלת הרשימת הביביסיטרים לתאריך זו!")
      }
    })
  }
  getOfferBabysitterDateAndCity(idCity:any,date:any){
    this._bbsitService.getOfferBabysitterByDateCity(date,idCity)
    .subscribe({
      next:(res)=>{
        this.dataSourceBabysitters=new MatTableDataSource(res);
        this.dataSourceBabysitters.paginator=this.offerBabysitterPaginator;
        this.dataSourceBabysitters.sort=this.offerBabysitterSort;
      },
      error:()=>{
        alert("בעייה בקבלת הרשימת הביביסטרים לתאריך ולעיר האלו")
      }
    })
  }

  getAllOfferCarpools(){
    this._carpoolService.getOfferCarpools()
    .subscribe({
      next:(res)=>{
        this.dataSourceCarpools=new MatTableDataSource(res);
        this.dataSourceCarpools.paginator=this.offerCarpoolPaginator;
        this.dataSourceCarpools.sort=this.offerCarpoolSort;
      },
      error:()=>{
        alert("בעייה בקבלת הרשימה של הנסיעות המשוטפות!")
      }
    })
  }
  getAllOfferCarpoolsByCities(){
    let carpoolNeed:NeedCarpool=JSON.parse(sessionStorage.getItem('needCarpoolDetails')||'');
    let idDep=carpoolNeed.IDCityDeparture||0;
    let idArr=carpoolNeed.IDCityArrival||0;
    this._carpoolService.getOfferCarpoolByCities(idDep,idArr)
    .subscribe({
      next:(res)=>{
        this.dataSourceCarpools=new MatTableDataSource(res);
        this.dataSourceCarpools.paginator=this.offerCarpoolPaginator;
        this.dataSourceCarpools.sort=this.offerCarpoolSort;
      },
      error:()=>{
        alert("בעייה בקבלת הרשימה של הנסיעות המשוטפות בין הערים האלו!")
      }
    })
  }
  getAllOfferCarpoolsByDateAndCities(date:any,idDep:any,idArr:any){
    this._carpoolService.getOfferCarpoolByCitiesAndDate(idDep,idArr,date)
    .subscribe({
      next:(res)=>{
        this.dataSourceCarpools=new MatTableDataSource(res);
        this.dataSourceCarpools.paginator=this.offerCarpoolPaginator;
        this.dataSourceCarpools.sort=this.offerCarpoolSort;
      },
      error:()=>{
        alert("בעייה בקבלת הרשימה של הנסיעות המשוטפות בין הערים האלו לתאריך זו!")
      }
    })
  }

  getAllOfferTeachers(){
    this._teacherService.getOfferTeachers()
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים !")
      }
    })
  }
  getAllOfferTeachersByCitiesSubjectAndLevels(cityID:any,subjectID:any,levelID:any){
    this._teacherService.getOfferTeacherByCitySubjectLevel(cityID,subjectID,levelID)
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים למקצוע זו לכיתה זו בעיר המבוקש!")
      }
    })
  }
  getAllOfferTeachersByCitiesAndSubject(){
    let teacherNeed:NeedTeacher=JSON.parse(sessionStorage.getItem('needTeacherDetails')||'');
    let IDCity=teacherNeed.IDCity||0;
    let IDSubject=teacherNeed.IDSubject||0;
    this._teacherService.getOfferTeacherByCitySubject(IDCity,IDSubject)
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים למקצוע זו בעיר המבוקש!")
      }
    })
  }
  getAllOfferTeachersBySubjectAndLevels(){
    let teacherNeed:NeedTeacher=JSON.parse(sessionStorage.getItem('needTeacherDetails')||'');
    let IDSubject=teacherNeed.IDSubject||0;
    let IDLevel=teacherNeed.IDLevel||0;

    this._teacherService.getOfferTeacherBySubjectLevel(IDSubject,IDLevel)
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים למקצוע זו לכיתה המבוקש!")
      }
    })
  }
  getAllOfferTeachersByCitiesAndLevels(){
    let teacherNeed:NeedTeacher=JSON.parse(sessionStorage.getItem('needTeacherDetails')||'');
    let IDCity=teacherNeed.IDCity||0;
    let IDLevel=teacherNeed.IDLevel||0;
    this._teacherService.getOfferTeacherByCityLevel(IDCity,IDLevel)
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים לכיתה זו בעיר המבוקש!")
      }
    })
  }
  getAllOfferTeachersByCities(){
    let teacherNeed:NeedTeacher=JSON.parse(sessionStorage.getItem('needTeacherDetails')||'');
    let IDCity=teacherNeed.IDCity||0;
    this._teacherService.getOfferTeacherByCity(IDCity)
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים בעיר המבוקש!")
      }
    })
  }
  getAllOfferTeachersBySubjects(){
    let teacherNeed:NeedTeacher=JSON.parse(sessionStorage.getItem('needTeacherDetails')||'');
    let IDSubject=teacherNeed.IDSubject||0;
    this._teacherService.getOfferTeacherBySubject(IDSubject)
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים למקצוע המבוקש!")
      }
    })
  }
  getAllOfferTeachersByLevels(){
    let teacherNeed:NeedTeacher=JSON.parse(sessionStorage.getItem('needTeacherDetails')||'');
    let IDLevel=teacherNeed.IDLevel||0;
    this._teacherService.getOfferTeacherByLevel(IDLevel)
    .subscribe({
      next:(res)=>{
        this.dataSourceTeachers=new MatTableDataSource(res);
        this.dataSourceTeachers.paginator=this.offerTeacherPaginator;
        this.dataSourceTeachers.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת הרשימה של המורים הפרטיים לכיתה המבוקש!")
      }
    })
  }

  async resultsBabysitter(){
    let bbsitterNeed:NeedBabysitter=JSON.parse(sessionStorage.getItem('needBabysitterDetails')||'');
    let IDCity=bbsitterNeed.IDCity||0;
    let DateBabysitter=bbsitterNeed.DateBabysitter;
    if(IDCity!=0 && DateBabysitter!=null){
      this.getOfferBabysitterDateAndCity(IDCity,DateBabysitter);
    }
    else if(IDCity!=0 && DateBabysitter==null){
      this.getOfferBabysitterByCity()
    }
    else{
      this.getAllOfferBabysitters();
    }
  }

  async resultsCarpool(){
    let carpoolNeed:NeedCarpool=JSON.parse(sessionStorage.getItem('needCarpoolDetails')||'');
    let IDCityD=carpoolNeed.IDCityDeparture||0;
    let IDCityA=carpoolNeed.IDCityArrival||0;
    let DateCarpool=carpoolNeed.DateHourDeparture;

    if(IDCityD!=0&&IDCityA!=0&&DateCarpool!=null){
      this.getAllOfferCarpoolsByDateAndCities(DateCarpool,IDCityD,IDCityA)
    }
    else if(IDCityD!=0&&IDCityA!=0&&DateCarpool==null){
      this.getAllOfferCarpoolsByCities()
    }
  }

  async resultTeachers(){
    let teacherNeed:NeedTeacher=JSON.parse(sessionStorage.getItem('needTeacherDetails')||'');
    let IDCity=teacherNeed.IDCity||0;
    let IDSubject=teacherNeed.IDSubject||0;
    let IDLevel=teacherNeed.IDLevel||0;

    if(IDCity!=0&&IDLevel!=0&&IDSubject!=0){
      this.getAllOfferTeachersByCitiesSubjectAndLevels(IDCity,IDSubject,IDLevel)
    }
    else{
      this.getAllOfferTeachers()
    }
  }

  async getBabysitterDetails(idBbsit:number){
    this._bbsitService.getOfferBabysitter(idBbsit)
    .subscribe({
      next:(bbsit)=>{
        alert("שם:"+bbsit.FullName+"\nשנות ניסיון:"+bbsit.YearsExperience+"\nמחיר:"+bbsit.Price+" שקלים\nטלפון:"+bbsit.Phone+"\nמייל:"+bbsit.Mail)
      },
      error:()=>{
        alert("שגיאה בהצגת הפרטים. תיצור קשר עם האדמין!")
      }
    })
  }

  async getCarpoolDetails(idCarpool:number){
    this._carpoolService.getOfferCarpool(idCarpool)
    .subscribe({
      next:(carpool)=>{
        alert("שם:"+carpool.FullName+"\nמחיר:"+carpool.Price+" שקלים\nטלפון:"+carpool.Phone+"\nמייל:"+carpool.Mail)
      },
      error:()=>{
        alert("שגיאה בהצגת הפרטים. תיצור קשר עם האדמין!")
      }
    })
  }

  async getTeacherDetails(idTeacher:number){
    this._teacherService.getOfferTeacher(idTeacher)
    .subscribe({
      next:(teacher)=>{
        alert("שם:"+teacher.FullName+"\nשנות ניסיון:"+teacher.YearsExperience+"\nמחיר:"+teacher.Price+" שקלים\nטלפון:"+teacher.Phone+"\nמייל:"+teacher.Mail)
      },
      error:()=>{
        alert("שגיאה בהצגת הפרטים. תיצור קשר עם האדמין!")
      }
    })
  }

}
