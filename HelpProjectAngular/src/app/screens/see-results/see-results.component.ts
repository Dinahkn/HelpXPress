import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OfferBabysitter } from 'src/app/model/offerBabysitter';
import { OfferCarpool } from 'src/app/model/offerCarpool';
import { OfferTeacher } from 'src/app/model/offerTeacher';
import { OfferBabysitterService } from 'src/app/services/offer-babysitter.service';
import { OfferCarpoolService } from 'src/app/services/offer-carpool.service';
import { OfferTeacherService } from 'src/app/services/offer-teacher.service';

@Component({
  selector: 'app-see-results',
  templateUrl: './see-results.component.html',
  styleUrls: ['./see-results.component.css']
})
export class SeeResultsComponent implements OnInit {

  public showbbsit=false;
  public showcarpool=false;
  public showteacher=false;

  @ViewChild('offerBabysitterPaginator')offerBabysitterPaginator!:MatPaginator;
  @ViewChild('offerBabysitterSort')offerBabysitterSort!:MatSort;
  dataSourceBabysitters=new MatTableDataSource<OfferBabysitter>();
  public displayColumnOfferBabysitter:string[]=['City','DateBabysitter','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','Comments']

  @ViewChild('offerCarpoolPaginator')offerCarpoolPaginator!:MatPaginator;
  @ViewChild('offerCarpoolSort')offerCarpoolSort!:MatSort;
  dataSourceCarpools=new MatTableDataSource<OfferCarpool>();
  public displayColumnOfferCarpool:string[]=['CityDeparture','CityArrival','DateHourDeparture','CarModel','Comments']


  @ViewChild('offerTeacherPaginator')offerTeacherPaginator!:MatPaginator;
  @ViewChild('offerTeacherSort')offerTeacherSort!:MatSort;
  dataSourceTeachers=new MatTableDataSource<OfferTeacher>();
  public displayColumnOfferTeacher:string[]=['City','DatePossible','TimeSlice1','TimeSlice2','TimeSlice3','TimeSlice4','Subject','Level','Comments']

  constructor(private _teacherService:OfferTeacherService,private _bbsitService:OfferBabysitterService,private _carpoolService:OfferCarpoolService) { }

  isLogged():boolean{
    if(sessionStorage.length!=0 && JSON.parse(sessionStorage.getItem('userDetails')||'')!=''){
      return true;
    }
    else{
      sessionStorage.setItem('userDetails',JSON.stringify(''))
      return false
    }
  }
  ngOnInit() {
    if(sessionStorage.getItem('needBabysitterDetails')!='' && sessionStorage.getItem('needTeacherDetails')=='' && sessionStorage.getItem('needCarpoolDetails')==''){
      sessionStorage.setItem('needBabysitterDetails','')
      this.showbbsit=true;
      this.showcarpool=false;
      this.showteacher=false;
      this.getAllOfferBabysitters()
    }
    if(sessionStorage.getItem('needBabysitterDetails')=='' && sessionStorage.getItem('needTeacherDetails')!='' && sessionStorage.getItem('needCarpoolDetails')==''){
      sessionStorage.setItem('needTeacherDetails','')
      this.showbbsit=false;
      this.showcarpool=false;
      this.showteacher=true;
      this.getAllOfferTeachers()
    }
    if(sessionStorage.getItem('needBabysitterDetails')=='' && sessionStorage.getItem('needTeacherDetails')=='' && sessionStorage.getItem('needCarpoolDetails')!=''){
      sessionStorage.setItem('needCarpoolDetails','')
      this.showbbsit=false;
      this.showcarpool=true;
      this.showteacher=false;
      this.getAllOfferCarpools()
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


}
