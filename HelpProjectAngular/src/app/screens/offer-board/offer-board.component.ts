import { DialogOfferCarpoolComponent } from './../dialogs/dialog-offer-carpool/dialog-offer-carpool.component';
import { DialogOfferTeacherComponent } from './../dialogs/dialog-offer-teacher/dialog-offer-teacher.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OfferBabysitter } from 'src/app/model/offerBabysitter';
import { OfferCarpool } from 'src/app/model/offerCarpool';
import { OfferTeacher } from 'src/app/model/offerTeacher';
import { User } from 'src/app/model/user';
import { OfferBabysitterService } from 'src/app/services/offer-babysitter.service';
import { OfferCarpoolService } from 'src/app/services/offer-carpool.service';
import { OfferTeacherService } from 'src/app/services/offer-teacher.service';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogOfferBabysitterComponent } from '../dialogs/dialog-offer-babysitter/dialog-offer-babysitter.component';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-offer-board',
  templateUrl: './offer-board.component.html',
  styleUrls: ['./offer-board.component.css']
})
export class OfferBoardComponent implements OnInit {

  public userLogged:User=JSON.parse(sessionStorage.getItem('userDetails')||'');
  name:string='';

  //offer babysitter
  @ViewChild('offerBabysitterPaginator')offerBabysitterPaginator!:MatPaginator;
  @ViewChild('offerBabysitterSort')offerBabysitterSort!:MatSort;
  dataSourceOfferBabysitters=new MatTableDataSource<OfferBabysitter>();
  public displayColumnOfferBabysitter:string[]=['IDCity','City','DateBabysitter','YearsExperience','Price','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','Comments','actionsBtn']

  //offerCarpool
  @ViewChild('offerCarpoolPaginator')offerCarpoolPaginator!:MatPaginator;
  @ViewChild('offerCarpoolSort')offerCarpoolSort!:MatSort;
  dataSourceOfferCarpool=new MatTableDataSource<OfferCarpool>();
  public displayColumnOfferCarpool:string[]=['IDCityDeparture','CityDeparture','IDCityArrival','CityArrival','DateHourDeparture','Price','CarModel','Comments','actionsBtn']

  //offer teacher
  @ViewChild('offerTeacherPaginator')offerTeacherPaginator!:MatPaginator;
  @ViewChild('offerTeacherSort')offerTeacherSort!:MatSort;
  dataSourceOfferTeacher=new MatTableDataSource<OfferTeacher>();
  public displayColumnOfferTeacher:string[]=['IDCity','City','DatePossible','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','IDSubject','Subject','IDLevel','Level','YearsExperience','Price','Comments','actionsBtn']

  constructor(private dialog:MatDialog,private _authService:AuthentificationService,private _offerBabysitterService:OfferBabysitterService,private _offerCarpoolService:OfferCarpoolService,private _offerTeacherService:OfferTeacherService) { }

  ngOnInit() {
    this.getOfferBabysittersByUserID();
    this.getOfferCarpoolsByUserID();
    this.getOfferTeachersByUserID();
  }

  getNameUser():string{
    return this.userLogged.FullName||'';
  }
  onEditUser(){
    this.dialog.open(DialogUserComponent,{
      width:'100%',
      data:this.userLogged
    }).afterClosed();
  }

  //get bbsit
  getOfferBabysittersByUserID(){
    this._offerBabysitterService.getOfferBabysitterByUserID(this.userLogged.IDUser,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        this.dataSourceOfferBabysitters=new MatTableDataSource(res);
        this.dataSourceOfferBabysitters.paginator=this.offerBabysitterPaginator;
        this.dataSourceOfferBabysitters.sort=this.offerBabysitterSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת רשימת הביביסיטר")
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
  onEditBabysitter(bbsit:any){
    this.dialog.open(DialogOfferBabysitterComponent,{
      width:'auto',
      data:bbsit
    }).afterClosed().subscribe(()=>{
      this.getOfferBabysittersByUserID()
    })
  }
  onDeleteBabysitter(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק ההצעת ביביסיטר הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._offerBabysitterService.deleteOfferBabysitter(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("הצעת ביביסיטר נמחק בהצלחה!")
            this.getOfferBabysittersByUserID()
          },
          error:()=>{
            alert("בעייה במחיקה של ההצעה ביביסיטר!")
          }
        })
      }
    })
  }

  //get carpools
  getOfferCarpoolsByUserID(){
    this._offerCarpoolService.getOfferCarpoolByUserID(this.userLogged.IDUser,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        this.dataSourceOfferCarpool=new MatTableDataSource(res);
        this.dataSourceOfferCarpool.paginator=this.offerCarpoolPaginator;
        this.dataSourceOfferCarpool.sort=this.offerCarpoolSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת רשימת הנסיעות המשותפות")
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
  onEditCarpool(carpool:any){
    this.dialog.open(DialogOfferCarpoolComponent,{
      width:'auto',
      data:carpool
    }).afterClosed().subscribe(()=>{
      this.getOfferCarpoolsByUserID()
    })
  }
  onDeleteCarpool(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק ההצעה נסיעה משותפת הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._offerCarpoolService.deleteOfferCarpool(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("הצעת נסיעה משותפת נמחק בהצלחה!")
            this.getOfferCarpoolsByUserID()
          },
          error:()=>{
            alert("בעייה במחיקה של ההצעת נסיעה משותפת!")
          }
        })
      }
    })
  }

  //get teachers
  getOfferTeachersByUserID(){
    this._offerTeacherService.getOfferTeacherByUserID(this.userLogged.IDUser,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        this.dataSourceOfferTeacher=new MatTableDataSource(res);
        this.dataSourceOfferTeacher.paginator=this.offerTeacherPaginator;
        this.dataSourceOfferTeacher.sort=this.offerTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת רשימת המורים פרטיים")
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
  onEditTeacher(teacher:any){
    this.dialog.open(DialogOfferTeacherComponent,{
      width:'auto',
      data:teacher
    }).afterClosed().subscribe(()=>{
      this.getOfferTeachersByUserID()
    })
  }
  onDeleteTeacher(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק ההצעה מורה פרטי הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._offerTeacherService.deleteOfferTeacher(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("הצעת מורה פרטי נמחק בהצלחה!")
            this.getOfferTeachersByUserID()
          },
          error:()=>{
            alert("בעייה במחיקה של ההצעת מורה פרטי !")
          }
        })
      }
    })
  }


}
