import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from 'src/app/model/user';
import { City } from 'src/app/model/city';
import { Levels } from 'src/app/model/levels';
import { OfferBabysitter } from 'src/app/model/offerBabysitter';
import { NeedBabysitter } from 'src/app/model/needBabysitter';
import { SubjectSchool } from 'src/app/model/subjectSchool';
import { NeedTeacher } from 'src/app/model/needTeacher';
import { OfferTeacher } from 'src/app/model/offerTeacher';
import { OfferCarpool } from 'src/app/model/offerCarpool';
import { NeedCarpool } from 'src/app/model/needCarpool';

import { CityServiceService } from 'src/app/services/city-service.service';
import { SubjectSchoolService } from 'src/app/services/subject-school.service';
import { UsersService } from 'src/app/services/users.service';
import { NeedBabysitterService } from 'src/app/services/need-babysitter.service';
import { OfferBabysitterService } from 'src/app/services/offer-babysitter.service';
import { LevelSchoolService } from 'src/app/services/level-school.service';
import { NeedCarpoolService } from 'src/app/services/need-carpool.service';
import { OfferCarpoolService } from 'src/app/services/offer-carpool.service';
import { NeedTeacherService } from 'src/app/services/need-teacher.service';
import { OfferTeacherService } from 'src/app/services/offer-teacher.service';

import { DialogCityComponent } from '../dialogs/dialog-city/dialog-city.component';
import { DialogLevelComponent } from '../dialogs/dialog-level/dialog-level.component';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogSubjectComponent } from '../dialogs/dialog-subject/dialog-subject.component';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';

import { MatSort } from '@angular/material/sort';
import { MatPaginator, } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  public userLogged:User=sessionStorage.getItem('userDetails') as User;

  //cities info
  @ViewChild('cityPaginator')cityPaginator!: MatPaginator;
  @ViewChild('citySort') citySort!: MatSort;
  dataSourceCities=new MatTableDataSource<City>();
  public displayedColumnCities:string[]=['IDCity','CityName','actionsBtn'];

  //levels
  @ViewChild('levelsPaginator')levelsPaginator!:MatPaginator;
  @ViewChild('levelSort')levelSort!:MatSort;
  dataSourceLevels=new MatTableDataSource<Levels>();
  public displayedColumnLevels:string[]=['IDLevel','NameLevel','actionsBtn'];

  //subjects
  @ViewChild('subjectPaginator')subjectPaginator!:MatPaginator;
  @ViewChild('subjectSort')subjectSort!:MatSort;
  dataSourceSubjects=new MatTableDataSource<SubjectSchool>();
  public displayedColumnSubjects:string[]=['IDSubject','NameSubject','actionsBtn'];

  //users info
  @ViewChild('usersPaginator')usersPaginator!:MatPaginator;
  @ViewChild('usersSort')usersSort!:MatSort;
  show:boolean=false;
  dataSourceUsers=new MatTableDataSource<User>();
  public displayColumnUsers:string[]=['IDUser','Mail','TZ','FullName','Phone','IDCity','CityName','CreateDate','LastConnectDate','RoleUser','actionsBtn'];
  // public displayColumnUsers:string[]=['ID','Mail','TZ','FullName','Phone','City','Adress','CreateDate','LastConnectDate','Role','editBtn','deleteBtn'];

  //need and offer babysitters info
  //need
  @ViewChild('needBabysitterPaginator')needBabysitterPaginator!:MatPaginator;
  @ViewChild('needBabysitterSort')needBabysitterSort!:MatSort;
  dataSourceNeedBabysitters=new MatTableDataSource<NeedBabysitter>();
  public displayColumnNeedBabysitter:string[]=['IDNeedBabysitter','IDUser','Mail','FullName','Phone','City','DateBabysitter','Comments'];

  //offer
  @ViewChild('offerBabysitterPaginator')offerBabysitterPaginator!:MatPaginator;
  @ViewChild('offerBabysitterSort')offerBabysitterSort!:MatSort;
  dataSourceOfferBabysitters=new MatTableDataSource<OfferBabysitter>();
  public displayColumnOfferBabysitter:string[]=['IDBabysitter','IDUser','Mail','FullName','Phone','YearsExperience','Price','City','DateBabysitter','Comments']

  //need and offer carpools info
  //need
  @ViewChild('needCarpoolPaginator')needCarpoolPaginator!:MatPaginator;
  @ViewChild('needCarpoolSort')needCarpoolSort!:MatSort;
  dataSourceNeedCarpool=new MatTableDataSource<NeedCarpool>()
  public displayColumnNeedCarpool:string[]=['IDNeedCarpool','IDUser','Mail','FullName','Phone','CityDeparture','CityArrival','DateHourDeparture','Comments']
  //offer
  @ViewChild('offerCarpoolPaginator')offerCarpoolPaginator!:MatPaginator;
  @ViewChild('offerCarpoolSort')offerCarpoolSort!:MatSort;
  dataSourceOfferCarpool=new MatTableDataSource<OfferCarpool>();
  public displayColumnOfferCarpool:string[]=['IDCarpool','IDUser','Mail','FullName','Phone','CityDeparture','CityArrival','DateHourDeparture','Price','CarModel','Comments']

  //need and offer teachers info
  //need
  @ViewChild('needTeacherPaginator')needTeacherPaginator!:MatPaginator;
  @ViewChild('needTeacherSort')needTeacherSort!:MatSort;
  dataSourceNeedTeacher=new MatTableDataSource<NeedTeacher>();
  public displayColumnNeedTeacher:string[]=['IDNeedTeacher','IDUser','Mail','FullName','Phone','City','DatePossible','Subject','Level','Comments']

  //offer
  @ViewChild('offerTeacherPaginator')offerTeacherPaginator!:MatPaginator;
  @ViewChild('offerTeacherSort')offerTeacherSort!:MatSort;
  dataSourceOfferTeacher=new MatTableDataSource<OfferTeacher>();
  public displayColumnOfferTeacher:string[]=['IDTeacher','IDUser','Mail','FullName','Phone','City','DatePossible','Subject','Level','YearsExperience','Price','Comments']

  constructor(private dialog:MatDialog,private _router: Router,private _authService:AuthentificationService,private _userService:UsersService,private _cityService:CityServiceService,private _levelService:LevelSchoolService,private _subjectService:SubjectSchoolService,private _needBabysitterService:NeedBabysitterService,private _offerBabysitterService:OfferBabysitterService,private _needCarpoolService:NeedCarpoolService,private _offerCarpoolService:OfferCarpoolService,private _needTeacherService:NeedTeacherService,private _offerTeacherService:OfferTeacherService) {}

  ngOnInit(){
    this.getAllCities();
    this.getAllLevels();
    this.getAllSubjects();
    this.getAllUsers();
    this.getAllNeedBabysitters();
    this.getAllOfferBabysitters();
    this.getAllNeedCarpools();
    this.getAllOfferCarpools();
    this.getAllNeedTeachers();
    this.getAllOfferTeachers();
  }

  /*Cities*/
  getAllCities(){
    this._cityService.getCities()
    .subscribe({
      next:(res)=>{
        this.dataSourceCities=new MatTableDataSource(res);
        this.dataSourceCities.paginator=this.cityPaginator;
        this.dataSourceCities.sort=this.citySort;
      },
      error:(err)=>{
        alert("Errror while get all cities")
      }
    })
  }
  onCreateCity(){
    this.dialog.open(DialogCityComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val==='שמור'){
        this.getAllCities()
      }
    })
  }
  onEditCity(city:any){
    this.dialog.open(DialogCityComponent,{
      width:'40%',
      data:city
    }).afterClosed().subscribe(val=>{
      if(val==='עדכון'){
        this.getAllCities();
      }
    })
  }
  onDeleteCity(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק העיר הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._cityService.deleteCity(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("עיר מוחק בהצלחה!")
          },
          error:()=>{
            alert("בעייה במחיקה של העיר!")
          }
        })
      }
    })
  }
  applyFilterCities(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCities.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceCities.paginator) {
      this.dataSourceCities.paginator.firstPage();
    }
  }

  /*Levels*/
  getAllLevels(){
    this._levelService.getLevels()
    .subscribe({
      next:(res)=>{
        this.dataSourceLevels=new MatTableDataSource(res);
        this.dataSourceLevels.paginator=this.levelsPaginator;
        this.dataSourceLevels.sort=this.levelSort;
      },
      error:(err)=>{
        alert("Errror while get all level")
      }
    })
  }
  onCreateLevel(){
    this.dialog.open(DialogLevelComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val==='שמור'){
        this.getAllLevels()
      }
    })
  }
  onEditLevel(level:any){
    this.dialog.open(DialogLevelComponent,{
      width:'40%',
      data:level
    }).afterClosed().subscribe(val=>{
      if(val==='עדכון'){
        this.getAllLevels();
      }
    })
  }
  onDeleteLevel(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק הכיתה הזאת"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._levelService.deleteLevel(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("כיתה נמחקה בהצלחה!")
            this.getAllLevels()
          },
          error:()=>{
            alert("בעייה במחיקה של הכיתה!")
          }
        })
      }
    })
  }
  applyFilterLevel(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLevels.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceLevels.paginator) {
      this.dataSourceLevels.paginator.firstPage();
    }
  }

  /*Subjects*/
  getAllSubjects(){
    this._subjectService.getSubjects()
    .subscribe({
      next:(res)=>{
        this.dataSourceSubjects=new MatTableDataSource(res);
        this.dataSourceSubjects.paginator=this.subjectPaginator;
        this.dataSourceSubjects.sort=this.subjectSort;
      },
      error:(err)=>{
        alert("Error while get all subject")
      }
    })
  }
  onCreateSubject(){
    this.dialog.open(DialogSubjectComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val==='שמור'){
        this.getAllSubjects()
      }
    })
  }
  onEditSubject(subject:any){
    this.dialog.open(DialogSubjectComponent,{
      width:'40%',
      data:subject
    }).afterClosed().subscribe(val=>{
      if(val==='עדכון'){
        this.getAllSubjects();
      }
    })
  }
  onDeleteSubject(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק המקצוע הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._subjectService.deleteSubject(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("כיתה נמחקה בהצלחה!")
            this.getAllLevels()
          },
          error:()=>{
            alert("בעייה במחיקה של הכיתה!")
          }
        })
      }
    })
  }
  applyFilterSubject(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSubjects.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceSubjects.paginator) {
      this.dataSourceSubjects.paginator.firstPage();
    }
  }

  /*Users*/
  getAllUsers(){
    this._userService.getUsers()
    .subscribe({
      next:(res)=>{
        this.dataSourceUsers=new MatTableDataSource(res);
        this.dataSourceUsers.paginator=this.usersPaginator;
        this.dataSourceUsers.sort=this.usersSort;
      },
      error:(err)=>{
        alert("Error while get all users")
      }
    })
  }
  onCreateAdmin(){
     this.dialog.open(DialogUserComponent,{
       width:'100%'
     }).afterClosed().subscribe(val=>{
       if(val==='שמור'){
         this.getAllUsers()
       }
     })
  }
  onEditUser(user:any){
    this.dialog.open(DialogUserComponent,{
      width:'100%',
      data:user
    }).afterClosed().subscribe(val=>{
      if(val==='עדכון'){
        this.getAllUsers();
      }
    })
  }
  onDeleteUser(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק המשתמש הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._userService.deleteUser(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("משתמש נמחק בהצלחה!")
            this.getAllCities()
          },
          error:()=>{
            alert("בעייה במחיקה של המשתמש!")
          }
        })
      }
    })
  }
  applyFilterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceUsers.paginator) {
      this.dataSourceUsers.paginator.firstPage();
    }
  }

  /*Need babysitters*/
  getAllNeedBabysitters(){
    this._needBabysitterService.getNeedBabysitters()
    .subscribe({
      next:(res)=>{
        this.dataSourceNeedBabysitters=new MatTableDataSource(res);
        this.dataSourceNeedBabysitters.paginator=this.needBabysitterPaginator;
        this.dataSourceNeedBabysitters.sort=this.needBabysitterSort;
      },
      error:(err)=>{
        alert("Errror while get all need babysitters")
      }
    })
  }
  applyFilterNeedBabysitters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceNeedBabysitters.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceNeedBabysitters.paginator) {
      this.dataSourceNeedBabysitters.paginator.firstPage();
    }
  }

  /*Offer babysitters*/
  getAllOfferBabysitters(){
    this._offerBabysitterService.getOfferBabysitters()
    .subscribe({
      next:(res)=>{
        this.dataSourceOfferBabysitters=new MatTableDataSource(res);
        this.dataSourceOfferBabysitters.paginator=this.offerBabysitterPaginator;
        this.dataSourceOfferBabysitters.sort=this.offerBabysitterSort;
      },
      error:(err)=>{
        alert("Error while get all offer babysitters")
      }
    })
  }
  applyFilterOfferBabysitters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOfferBabysitters.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceOfferBabysitters.paginator) {
      this.dataSourceOfferBabysitters.paginator.firstPage();
    }
  }

  /*Need carpool*/
  getAllNeedCarpools(){
    this._needCarpoolService.getNeedCarpools()
    .subscribe({
      next:(res)=>{
        this.dataSourceNeedCarpool=new MatTableDataSource(res);
        this.dataSourceNeedCarpool.paginator=this.needCarpoolPaginator;
        this.dataSourceNeedCarpool.sort=this.needCarpoolSort;
      },
      error:(err)=>{
        alert("Errror while get all need carpools")
      }
    })
  }
  applyFilterNeedCarpools(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceNeedCarpool.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceNeedCarpool.paginator) {
      this.dataSourceNeedCarpool.paginator.firstPage();
    }
  }

  /*Offer carpools*/
  getAllOfferCarpools(){
    this._offerCarpoolService.getOfferCarpools()
    .subscribe({
      next:(res)=>{
        this.dataSourceOfferCarpool=new MatTableDataSource(res);
        this.dataSourceOfferCarpool.paginator=this.offerCarpoolPaginator;
        this.dataSourceOfferCarpool.sort=this.offerCarpoolSort;
      },
      error:(err)=>{
        alert("Errror while get all offer carpool")
      }
    })
  }
  applyFilterOfferCarpools(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOfferCarpool.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceOfferCarpool.paginator) {
      this.dataSourceOfferCarpool.paginator.firstPage();
    }
  }

  /*Need teacher*/
  getAllNeedTeachers(){
    this._needTeacherService.getNeedTeachers()
    .subscribe({
      next:(res)=>{
        this.dataSourceNeedTeacher=new MatTableDataSource(res);
        this.dataSourceNeedTeacher.paginator=this.needTeacherPaginator;
        this.dataSourceNeedTeacher.sort=this.needTeacherSort;
      },
      error:(err)=>{
        alert("Errror while get all need teachers")
      }
    })
  }
  applyFilterNeedTeachers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceNeedTeacher.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceNeedTeacher.paginator) {
      this.dataSourceNeedTeacher.paginator.firstPage();
    }
  }

  /*Offer teacher*/
  getAllOfferTeachers(){
    this._offerTeacherService.getOfferTeachers()
    .subscribe({
      next:(res)=>{
        this.dataSourceOfferTeacher=new MatTableDataSource(res);
        this.dataSourceOfferTeacher.paginator=this.offerTeacherPaginator;
        this.dataSourceOfferTeacher.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("Errror while get all offer teacher")
      }
    })
  }
  applyFilterOfferTeachers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceOfferTeacher.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceOfferTeacher.paginator) {
      this.dataSourceOfferTeacher.paginator.firstPage();
    }
  }
}
