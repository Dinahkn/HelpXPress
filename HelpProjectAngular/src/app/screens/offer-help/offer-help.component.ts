import { OfferTeacher } from './../../model/offerTeacher';
import { OfferBabysitter } from './../../model/offerBabysitter';
import { OfferBabysitterService } from './../../services/offer-babysitter.service';
import { OfferTeacherService } from './../../services/offer-teacher.service';
import { User } from 'src/app/model/user';
import { LevelSchoolService } from './../../services/level-school.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { CityServiceService } from 'src/app/services/city-service.service';
import { SubjectSchoolService } from 'src/app/services/subject-school.service';
import * as $ from 'jquery';
import { OfferCarpoolService } from 'src/app/services/offer-carpool.service';
import { OfferCarpool } from 'src/app/model/offerCarpool';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-offer-help',
  templateUrl: './offer-help.component.html',
  styleUrls: ['./offer-help.component.css']
})
export class OfferHelpComponent implements OnInit {


  public userLogged:User=JSON.parse(sessionStorage.getItem('userDetails')||'');

  minDate:Date;
  maxDate:Date;
  formControlItem: FormControl = new FormControl("");
  @ViewChild("timepicker") timepicker: any;

  offerBabysitterForm!:FormGroup;
  sliceTimeBabysitter:FormGroup;
  offerCarpoolForm!:FormGroup;
  offerTeacherForm!:FormGroup;
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

  constructor(private dialog:MatDialog,private _router: Router,private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _teacherService:OfferTeacherService, private _levelsService:LevelSchoolService,private _subjectService:SubjectSchoolService,private _bbsitService:OfferBabysitterService,private _carpoolService:OfferCarpoolService) {
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

    //form babysitter
    this.offerBabysitterForm=this._formBuilder.group({
      cityBabysitter:new FormControl('',[Validators.required]),
      dateBabysitter:new FormControl(''),
      sliceTimeBabysitter:this._formBuilder.group({
        morning:false,
        afternoon:false,
        evening:false,
        night:false
      }),
      yearsExperienceBabysitter:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      priceBabysitter:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      Comments:new FormControl('')
    })
    //form carpool
    this.offerCarpoolForm=this._formBuilder.group({
      cityDepartureCarpool:new FormControl('',[Validators.required]),
      cityArrivalCarpool:new FormControl('',[Validators.required]),
      adressDepartureCarpool:new FormControl(''),
      adressArrivalCarpool:new FormControl(''),
      dateCarpool:new FormControl('',[Validators.required]),
      hourDepartureCarpool:new FormControl(''),
      typeCar:new FormControl('',[Validators.required]),
      priceCarpool:new FormControl('',[
        Validators.required,
        Validators.min(0)
      ]),
      Comments:new FormControl('')
    })
    //form teacher
    this.offerTeacherForm=this._formBuilder.group({
      cityTeacher:new FormControl('',[Validators.required]),
      subjectTeacher:new FormControl('',[Validators.required]),
      classTeacher:new FormControl('',[Validators.required]),
      dateTeacher:new FormControl('',[Validators.required]),
      priceTeacher:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      yearsExperienceTeacher:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      sliceTimeTeacher:this._formBuilder.group({
        morning:false,
        afternoon:false,
        evening:false,
        night:false
      }),
      Comments:new FormControl('')
    })

  }

  async onSubmitBabysitter(){
    let submitBabysitter:OfferBabysitter={
      IDUser:this.userLogged.IDUser,
      IDCity:this.offerBabysitterForm.get("cityBabysitter")?.value,
      Price:this.offerBabysitterForm.get("priceBabysitter")?.value,
      DateBabysitter:this.offerBabysitterForm.get("dateBabysitter")?.value,
      TimeSlice1:this.sliceTimeBabysitter.get("morning")?.value,
      TimeSlice2:this.sliceTimeBabysitter.get("afternoon")?.value,
      TimeSlice3:this.sliceTimeBabysitter.get("evening")?.value,
      TimeSlice4:this.sliceTimeBabysitter.get("night")?.value,
      YearsExperience:this.offerBabysitterForm.get("yearsExperienceBabysitter")?.value,
      Comments:this.offerBabysitterForm.get("Comments")?.value
    };
    this._bbsitService.postOfferBabysitter(submitBabysitter,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("נקלט בהצלחה\nתודה רבה לך לעזרה. \nאם יהיה צורך הזקוק לעזרה ייצור איתך קשר דרך טלפון או דרך המייל")
        this.offerBabysitterForm.reset();
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    });
    this._router.navigateByUrl('/Dashboard');
  }
  async onSubmitCarpool(){
    var adressDToChange=this.offerCarpoolForm.get("adressDepartureCarpool")?.value||'תחנה מחכזית';
    adressDToChange=adressDToChange.replace(" ","+");
    let cityDName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.offerCarpoolForm.get("cityDepartureCarpool")?.value))).CityName;
    var adressAToChange=this.offerCarpoolForm.get("adressArrivalCarpool")?.value||'תחנה מחכזית';
    adressAToChange=adressAToChange.replace(" ","+");
    let cityAName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.offerCarpoolForm.get("cityArrivalCarpool")?.value))).CityName;
    let date=new Date(this.offerCarpoolForm.get("dateCarpool")?.value).toString();
    let hour=this.offerCarpoolForm.get("hourDepartureCarpool")?.value;
    let dateHour=new Date(date.replace("00:00:00",hour));
     $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressDToChange+","+cityDName+",+IL&key="+MYAPIKEY,
     async (data1)=>{
       $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressAToChange+","+cityAName+",+IL&key="+MYAPIKEY,
        async (data2)=>{
         let submitCarpool:OfferCarpool={
           IDUser:this.userLogged.IDUser,
           IDCityDeparture:this.offerCarpoolForm.get("cityDepartureCarpool")?.value,
           IDCityArrival:this.offerCarpoolForm.get("cityArrivalCarpool")?.value,
           DepartureLatitude: data1.results[0].geometry.location.lat,
           DepartureLongitude:data1.results[0].geometry.location.lng,
           ArrivalLatitude: data2.results[0].geometry.location.lat,
           ArrivalLongitude:data2.results[0].geometry.location.lng,
           DateHourDeparture:dateHour,
           CarModel:this.offerCarpoolForm.get("typeCar")?.value,
           Price:this.offerCarpoolForm.get("priceCarpool")?.value,
           Comments:this.offerCarpoolForm.get("Comments")?.value
         };
         this._carpoolService.postOfferCarpool(submitCarpool,this._authService.shareData)
         .subscribe({
          next:()=>{
            alert("נקלט בהצלחה\nתודה רבה לך לעזרה. \nאם יהיה צורך הזקוק לעזרה ייצור איתך קשר דרך טלפון או דרך המייל")
            this.offerCarpoolForm.reset();
          },
          error:()=>{
            alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
          }
        });
      });
     });
     this._router.navigateByUrl('/Dashboard');
  }
  async onSubmitTeacher(){
    let submitTeacher:OfferTeacher={
      IDUser:this.userLogged.IDUser,
      IDCity:this.offerTeacherForm.get("cityTeacher")?.value,
      Price:this.offerTeacherForm.get("priceTeacher")?.value,
      IDSubject:this.offerTeacherForm.get("subjectTeacher")?.value,
      IDLevel:this.offerTeacherForm.get("classTeacher")?.value,
      YearsExperience:this.offerTeacherForm.get("yearsExperienceTeacher")?.value,
      DatePossible:this.offerTeacherForm.get("dateTeacher")?.value,
      TimeSlice1:this.sliceTimeTeacher.get("morning")?.value,
      TimeSlice2:this.sliceTimeTeacher.get("afternoon")?.value,
      TimeSlice3:this.sliceTimeTeacher.get("evening")?.value,
      TimeSlice4:this.sliceTimeTeacher.get("night")?.value,
      Comments:this.offerTeacherForm.get("Comments")?.value
    };
    this._teacherService.postOfferTeacher(submitTeacher,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("נקלט בהצלחה\nתודה רבה לך לעזרה. \nאם יהיה צורך הזקוק לעזרה ייצור איתך קשר דרך טלפון או דרך המייל")
        this.offerTeacherForm.reset();
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    });
    this._router.navigateByUrl('/Dashboard');

  }

}
