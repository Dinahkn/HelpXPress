import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/model/user';
import { NeedCarpool } from 'src/app/model/needCarpool';
import { NeedBabysitter } from 'src/app/model/needBabysitter';
import { NeedTeacher } from 'src/app/model/needTeacher';

import { NeedTeacherService } from 'src/app/services/need-teacher.service';
import { NeedCarpoolService } from 'src/app/services/need-carpool.service';
import { NeedBabysitterService } from 'src/app/services/need-babysitter.service';
import { CityServiceService } from 'src/app/services/city-service.service';
import { LevelSchoolService } from 'src/app/services/level-school.service';
import { SubjectSchoolService } from 'src/app/services/subject-school.service';


import * as $ from 'jquery';
import * as moment from 'moment';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthentificationService } from 'src/app/services/authentification.service';



@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.css']
})
export class NeedHelpComponent implements OnInit {

  public userLogged:User=JSON.parse(sessionStorage.getItem('userDetails')||'');
  minDate:Date;
  maxDate:Date;
  formControlItem: FormControl = new FormControl("");
  required: boolean = !1;

  @ViewChild("timepicker") timepicker: any;

  needBabysitterForm!:FormGroup;
  sliceTimeBabysitter:FormGroup;
  needCarpoolForm!:FormGroup;
  needTeacherForm!:FormGroup;
  sliceTimeTeacher:FormGroup;
  public cities:any=[];
  public levelsSchool:any =[];
  public subjectsSchool:any=[];

  //hour picker
  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }
  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }
  onEditUser(){
    this.dialog.open(DialogUserComponent,{
      width:'100%',
      data:this.userLogged
    }).afterClosed();
  }
  getNameUser():string{
    return this.userLogged.FullName||'';
  }
  constructor(private dialog:MatDialog,private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _teacherService:NeedTeacherService,private _levelsService:LevelSchoolService,private _subjectService:SubjectSchoolService,private _bbsitService:NeedBabysitterService,private _carpoolService:NeedCarpoolService,private _router: Router) {
    const currentYear=new Date().getFullYear();
    const currentMonth=new Date().getMonth();
    const currentDay=new Date().getDate();
    this.minDate=new Date(currentYear,currentMonth,currentDay);
    this.maxDate=new Date(currentYear+1,11,32);

    this.sliceTimeBabysitter=this._formBuilder.group({
      morning:false,
      afternoon:false,
      evening:false,
      night:false
    });
    this.sliceTimeTeacher=this._formBuilder.group({
      morning:false,
      afternoon:false,
      evening:false,
      night:false
    });
  }

  async ngOnInit() {
    this.cities=this._cityService.getCities().subscribe({
      next:(res)=>{
        this.cities=res;
      }
    });
    this.levelsSchool=this._levelsService.getLevels().subscribe({
      next:(res)=>{
        this.levelsSchool=res;
      }
    })
    this.subjectsSchool=this._subjectService.getSubjects().subscribe({
      next:(res)=>{
        this.subjectsSchool=res;
      }
    })

    //form need babysitter
    this.needBabysitterForm=this._formBuilder.group({
      cityNeedBabysitter:new FormControl('',[Validators.required]),
      dateNeedBabysitter:new FormControl(''),
      sliceTimeBabysitter:this._formBuilder.group({
        morning:false,
        afternoon:false,
        evening:false,
        night:false
      }),
      Comments:new FormControl('')
    })
    //form need carpool
    this.needCarpoolForm=this._formBuilder.group({
      cityDepartureNeedCarpool:new FormControl('',[Validators.required]),
      cityArrivalNeedCarpool:new FormControl('',[Validators.required]),
      adressDepartureNeedCarpool:new FormControl(''),
      adressArrivalNeedCarpool:new FormControl(''),
      dateNeedCarpool:new FormControl('',[Validators.required]),
      hourDepartureNeedCarpool:new FormControl(''),
      Comments:new FormControl('')
    })
    //form need teacher
    this.needTeacherForm=this._formBuilder.group({
      cityNeedTeacher:new FormControl('',[Validators.required]),
      subjectNeedTeacher:new FormControl('',[Validators.required]),
      classNeedTeacher:new FormControl('',[Validators.required]),
      dateTeacher:new FormControl(''),
      sliceTimeTeacher:this._formBuilder.group({
        morning:false,
        afternoon:false,
        evening:false,
        night:false
      }),
      Comments:new FormControl('')
    })

  }

  async onSubmitSearchBabysitter(){
    let submitNeedBabysitter:NeedBabysitter={
      IDUser:this.userLogged.IDUser,
      IDCity:this.needBabysitterForm.get("cityNeedBabysitter")?.value,
      DateBabysitter:this.needBabysitterForm.get("dateNeedBabysitter")?.value,
      TimeSlice1:this.sliceTimeBabysitter.get("morning")?.value,
      TimeSlice2:this.sliceTimeBabysitter.get("afternoon")?.value,
      TimeSlice3:this.sliceTimeBabysitter.get("evening")?.value,
      TimeSlice4:this.sliceTimeBabysitter.get("night")?.value,
      Comments:this.needBabysitterForm.get("Comments")?.value
    };
    this._bbsitService.postNeedBabysitter(submitNeedBabysitter,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("נקלט בהצלחה")
        this.needBabysitterForm.reset();
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    });
    sessionStorage.setItem('needBabysitterDetails',JSON.stringify(submitNeedBabysitter))
    sessionStorage.setItem('needCarpoolDetails','')
    sessionStorage.setItem('needTeacherDetails','')
    this._router.navigateByUrl('/Results');
  }

  async onSubmitSearchCarpool(){
    var adressDToChange=this.needCarpoolForm.get("adressDepartureNeedCarpool")?.value ||'תחנה מחכזית';
    adressDToChange=adressDToChange.replace(" ","+");
    let cityDName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.needCarpoolForm.get("cityDepartureNeedCarpool")?.value))).CityName;
    var adressAToChange=this.needCarpoolForm.get("adressArrivalNeedCarpool")?.value||'תחנה מחכזית' ;
    adressAToChange=adressAToChange.replace(" ","+");
    let cityAName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.needCarpoolForm.get("cityArrivalNeedCarpool")?.value))).CityName;
    let date=new Date(this.needCarpoolForm.get("dateNeedCarpool")?.value).toString();
    let hour=this.needCarpoolForm.get("hourDepartureNeedCarpool")?.value;
    let dateHour=new Date(date.replace("00:00:00",hour));
    $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressDToChange+","+cityDName+",+IL&key="+MYAPIKEY,
    async (data1)=>{
       $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressAToChange+","+cityAName+",+IL&key="+MYAPIKEY,
       async (data2)=>{
         let submitNeedCarpool:NeedCarpool={
           IDUser:this.userLogged.IDUser,
           IDCityDeparture:this.needCarpoolForm.get("cityDepartureNeedCarpool")?.value,
           IDCityArrival:this.needCarpoolForm.get("cityArrivalNeedCarpool")?.value,
           DepartureLatitude: data1.results[0].geometry.location.lat,
           DepartureLongitude:data1.results[0].geometry.location.lng,
           ArrivalLatitude: data2.results[0].geometry.location.lat,
           ArrivalLongitude:data2.results[0].geometry.location.lng,
           DateHourDeparture:dateHour,
           Comments:this.needCarpoolForm.get("Comments")?.value
         };
        this._carpoolService.postNeedCarpool(submitNeedCarpool,this._authService.shareData)
        .subscribe({
          next:()=>{
            alert("נקלט בהצלחה")
            this.needCarpoolForm.reset();
          },
          error:()=>{
            alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
          }
        });
        sessionStorage.setItem('needBabysitterDetails','')
        sessionStorage.setItem('needCarpoolDetails',JSON.stringify(submitNeedCarpool))
        sessionStorage.setItem('needTeacherDetails','')
        this._router.navigateByUrl('/Results');
      });
    });
  }

  async onSubmitSearchTeacher(){
    let submitNeedTeacher:NeedTeacher={
      IDUser:this.userLogged.IDUser,
      IDCity:this.needTeacherForm.get("cityNeedTeacher")?.value,
      IDSubject:this.needTeacherForm.get("subjectNeedTeacher")?.value,
      IDLevel:this.needTeacherForm.get("classNeedTeacher")?.value,
      DatePossible:this.needTeacherForm.get("dateTeacher")?.value,
      TimeSlice1:this.sliceTimeTeacher.get("morning")?.value,
      TimeSlice2:this.sliceTimeTeacher.get("afternoon")?.value,
      TimeSlice3:this.sliceTimeTeacher.get("evening")?.value,
      TimeSlice4:this.sliceTimeTeacher.get("night")?.value,
      Comments:this.needTeacherForm.get("Comments")?.value
    };
    this._teacherService.postNeedTeacher(submitNeedTeacher,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("נקלט בהצלחה");
        this.needTeacherForm.reset();
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    });
    sessionStorage.setItem('needBabysitterDetails','')
    sessionStorage.setItem('needCarpoolDetails','')
    sessionStorage.setItem('needTeacherDetails',JSON.stringify(submitNeedTeacher))
    this._router.navigateByUrl('/Results');
  }
}
