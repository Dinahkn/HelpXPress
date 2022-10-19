import { DialogNeedTeacherComponent } from './../dialogs/dialog-need-teacher/dialog-need-teacher.component';
import { DialogNeedCarpoolComponent } from './../dialogs/dialog-need-carpool/dialog-need-carpool.component';
import { NeedTeacherService } from 'src/app/services/need-teacher.service';
import { NeedCarpoolService } from 'src/app/services/need-carpool.service';
import { NeedBabysitterService } from 'src/app/services/need-babysitter.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NeedBabysitter } from 'src/app/model/needBabysitter';
import { NeedCarpool } from 'src/app/model/needCarpool';
import { NeedTeacher } from 'src/app/model/needTeacher';
import { User } from 'src/app/model/user';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { DialogNeedBabysitterComponent } from '../dialogs/dialog-need-babysitter/dialog-need-babysitter.component';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-search-board',
  templateUrl: './search-board.component.html',
  styleUrls: ['./search-board.component.css']
})
export class SearchBoardComponent implements OnInit {

  public userLogged:User=JSON.parse(sessionStorage.getItem('userDetails')||'');
  name:string='';

  @ViewChild('needBabysitterPaginator')needBabysitterPaginator!:MatPaginator;
  @ViewChild('needBabysitterSort')needBabysitterSort!:MatSort;
  dataSourceNeedBabysitters=new MatTableDataSource<NeedBabysitter>();
  public displayColumnNeedBabysitter:string[]=['IDCity','City','DateBabysitter','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','Comments','actionsBtn'];

  @ViewChild('needCarpoolPaginator')needCarpoolPaginator!:MatPaginator;
  @ViewChild('needCarpoolSort')needCarpoolSort!:MatSort;
  dataSourceNeedCarpool=new MatTableDataSource<NeedCarpool>()
  public displayColumnNeedCarpool:string[]=['IDCityDeparture','CityDeparture','IDCityArrival','CityArrival','DateHourDeparture','Comments','actionsBtn']

  @ViewChild('needTeacherPaginator')needTeacherPaginator!:MatPaginator;
  @ViewChild('needTeacherSort')needTeacherSort!:MatSort;
  dataSourceNeedTeacher=new MatTableDataSource<NeedTeacher>();
  public displayColumnNeedTeacher:string[]=['IDCity','City','DatePossible','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','IDSubject','Subject','IDLevel','Level','Comments','actionsBtn']

  constructor(private dialog:MatDialog,private _authService:AuthentificationService,private _needBabysitterService:NeedBabysitterService,private _needCarpoolService:NeedCarpoolService,private _needTeacherService:NeedTeacherService) { }

  ngOnInit() {
    this.getNeedBabysittersByUserID();
    this.getNeedCarpoolsByUserID();
    this.getNeedTeachersByUserID();
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
  getNeedBabysittersByUserID(){
    this._needBabysitterService.getNeedBabysitterByUserID(this.userLogged.IDUser,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        this.dataSourceNeedBabysitters=new MatTableDataSource(res);
        this.dataSourceNeedBabysitters.paginator=this.needBabysitterPaginator;
        this.dataSourceNeedBabysitters.sort=this.needBabysitterSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת נתונים! תנסה להתחבר שוב אם עדיין לא עובד תיצור קשר עם האדמין")
      }
    })
  }

  onEditNeedBabysitter(bbsit:any){
    this.dialog.open(DialogNeedBabysitterComponent,{
      width:'auto',
      data:bbsit
    }).afterClosed().subscribe({
      next:()=>{
        this.getNeedBabysittersByUserID()
      },
      error:(err)=>{
        alert("תנסה להתחבר שוב אם עדיין לא עובד תיצור קשר עם האדמין")
      }
    })
  }
  onDeleteNeedBabysitter(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק הביקוש ביביסיטר הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._needBabysitterService.deleteNeedBabysitter(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("ביקוש ביביסיטר נמחק בהצלחה!")
            this.getNeedBabysittersByUserID()
          },
          error:()=>{
            alert("בעייה במחיקה של ההצעה ביביסיטר!")
          }
        })
      }
    })
  }

  //get carpools
  getNeedCarpoolsByUserID(){
    this._needCarpoolService.getNeedCarpoolByUserID(this.userLogged.IDUser,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        this.dataSourceNeedCarpool=new MatTableDataSource(res);
        this.dataSourceNeedCarpool.paginator=this.needCarpoolPaginator;
        this.dataSourceNeedCarpool.sort=this.needCarpoolSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת נתונים! תנסה להתחבר שוב אם עדיין לא עובד תיצור קשר עם האדמין")
      }
    })
  }

  onEditNeedCarpool(carpool:any){
    this.dialog.open(DialogNeedCarpoolComponent,{
      width:'auto',
      data:carpool
    }).afterClosed().subscribe(()=>{
      this.getNeedCarpoolsByUserID();
    })
  }
  onDeleteNeedCarpool(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק הביקוש נסיעה משותפת הזה"
      }
    }).afterClosed()
    .subscribe(
      res=>{
      if(res===true){
        this._needCarpoolService.deleteNeedCarpool(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("הצעת נסיעה משותפת נמחק בהצלחה!")
            this.getNeedCarpoolsByUserID()
          },
          error:()=>{
            alert("בעייה במחיקה של ההצעת נסיעה משותפת!")
          }
        })
      }
    })
  }

  //get teachers
  getNeedTeachersByUserID(){
    this._needTeacherService.getNeedTeacherByUserID(this.userLogged.IDUser,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        this.dataSourceNeedTeacher=new MatTableDataSource(res);
        this.dataSourceNeedTeacher.paginator=this.needTeacherPaginator;
        this.dataSourceNeedTeacher.sort=this.needTeacherSort;
      },
      error:(err)=>{
        alert("בעייה בקבלת נתונים! תנסה להתחבר שוב אם עדיין לא עובד תיצור קשר עם האדמין")
      }
    })
  }

  onEditNeedTeacher(teacher:any){
    this.dialog.open(DialogNeedTeacherComponent,{
      width:'auto',
      data:teacher
    }).afterClosed().subscribe(()=>{
      this.getNeedTeachersByUserID();
    })
  }
  onDeleteNeedTeacher(id:number){
    this.dialog.open(DialogConfirmComponent,{
      width: '500px',
      panelClass: 'confirm-dialog-container',
      position: { top: "20px" },
      data :{
        message : "? האם אתה בטוח שאתה רוצה למחוק הביקוש מורה פרטי הזה"
      }
    }).afterClosed().subscribe(res=>{
      if(res===true){
        this._needTeacherService.deleteNeedTeacher(id,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("הצעת מורה פרטי נמחק בהצלחה!")
            this.getNeedTeachersByUserID()
          },
          error:()=>{
            alert("בעייה במחיקה של ההצעת מורה פרטי !")
          }
        })
      }
    })
  }

}
