import { NeedCarpool } from './../../../model/needCarpool';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityServiceService } from 'src/app/services/city-service.service';
import { NeedCarpoolService } from 'src/app/services/need-carpool.service';
import * as $ from 'jquery';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-dialog-need-carpool',
  templateUrl: './dialog-need-carpool.component.html',
  styleUrls: ['./dialog-need-carpool.component.css']
})
export class DialogNeedCarpoolComponent implements OnInit {
  nameForm:string="עדכון חיפוש נסיעה משותפת"
  actionBtn:string="שמור";
  minDate:Date;
  maxDate:Date;
  formControlItem: FormControl = new FormControl("");
  required: boolean = !1;
  needCarpoolForm!:FormGroup;
  public cities:any=[];
  @ViewChild("timepicker") timepicker: any;
    //hour picker
    openFromIcon(timepicker: { open: () => void }) {
      if (!this.formControlItem.disabled) {
        timepicker.open();
      }
    }
    onClear($event: Event) {
      this.formControlItem.setValue(null);
    }

  constructor(private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _carpoolService:NeedCarpoolService,private dialogRef:MatDialogRef<DialogNeedCarpoolComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) {
    const currentYear=new Date().getFullYear();
    const currentMonth=new Date().getMonth();
    const currentDay=new Date().getDate();
    this.minDate=new Date(currentYear,currentMonth,currentDay);
    this.maxDate=new Date(currentYear+1,11,32);
   }

  ngOnInit(){
    this.cities=this._cityService.getCities().subscribe({
      next:(res)=>{
        this.cities=res;
      }
    });
    this.needCarpoolForm=this._formBuilder.group({
      IDCityDeparture:new FormControl('',[Validators.required]),
      IDCityArrival:new FormControl('',[Validators.required]),
      adressDepartureNeedCarpool:new FormControl(''),
      adressArrivalNeedCarpool:new FormControl(''),
      dateCarpool:new FormControl('',[Validators.required]),
      hourDepartureCarpool:new FormControl(''),
      Comments:new FormControl('')
    });
    if(this.editData){
      let LatLngDeparture=(this.editData.DepartureLatitude).toString()+","+(this.editData.DepartureLongitude).toString();
      $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+LatLngDeparture+"&key="+MYAPIKEY,
        async(data)=>{
          let res=data.results[0].formatted_address;
          var partsAdressDeparture=res.split(',')
          let theAdressDeparture=partsAdressDeparture[0]
          $('#adressDeparture').val(theAdressDeparture)
      })
      let LatLngArrival=(this.editData.ArrivalLatitude).toString()+","+(this.editData.ArrivalLongitude).toString();
      $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+LatLngArrival+"&key="+MYAPIKEY,
        async(data)=>{
          let res=data.results[0].formatted_address;
          let partsAdressArrival=res.split(',')
          let theAdressArrival=partsAdressArrival[0]
          $('#adressArrival').val(theAdressArrival)
      })
      this.actionBtn="עדכון";
      this.needCarpoolForm.controls['dateCarpool'].setValue(this.editData.DateHourDeparture.substring(0,10))
      console.log(this.editData.DateHourDeparture.substring(11))
      this.needCarpoolForm.controls['hourDepartureCarpool'].setValue(this.editData.DateHourDeparture.substring(11))
      this.needCarpoolForm.controls['IDCityDeparture'].setValue(this.editData.IDCityDeparture)
      this.needCarpoolForm.controls['IDCityArrival'].setValue(this.editData.IDCityArrival)
      this.needCarpoolForm.controls['Comments'].setValue(this.editData.Comments)
    }
  }

  async updateNeedCarpool(){
    var adressDToChange=this.needCarpoolForm.get("adressDepartureNeedCarpool")?.value||'תחנה מרכזית';
    adressDToChange=adressDToChange.replace(" ","+");
    let cityDName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.needCarpoolForm.get("IDCityDeparture")?.value))).CityName;
    var adressAToChange=this.needCarpoolForm.get("adressArrivalNeedCarpool")?.value||"תחנה מרכזית";
    adressAToChange=adressAToChange.replace(" ","+");
    let cityAName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.needCarpoolForm.get("IDCityArrival")?.value))).CityName;
    let date=new Date(this.needCarpoolForm.get("dateCarpool")?.value).toString();
    let hour=this.needCarpoolForm.get("hourDepartureCarpool")?.value;
    let dateHour=new Date(date.replace("00:00:00",hour));
    $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressDToChange+","+cityDName+",+IL&key="+MYAPIKEY,
    async (data1)=>{
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressAToChange+","+cityAName+",+IL&key="+MYAPIKEY,
      async (data2)=>{
        let updateCarpool:NeedCarpool={
          IDUser:this.editData.IDUser,
          IDNeedCarpool:this.editData.IDNeedCarpool,
          IDCityDeparture:this.needCarpoolForm.get("IDCityDeparture")?.value,
          IDCityArrival:this.needCarpoolForm.get("IDCityArrival")?.value,
          DepartureLatitude: data1.results[0].geometry.location.lat,
          DepartureLongitude:data1.results[0].geometry.location.lng,
          ArrivalLatitude: data2.results[0].geometry.location.lat,
          ArrivalLongitude:data2.results[0].geometry.location.lng,
          DateHourDeparture:dateHour,
          Comments:this.needCarpoolForm.get("Comments")?.value
        };
        this._carpoolService.putNeedCarpool(updateCarpool,updateCarpool.IDNeedCarpool,this._authService.shareData)
        .subscribe({
          next:()=>{
            alert("עודכן בהצלחה")
            this.dialogRef.close()
          },
          error:()=>{
            alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
          }
        });
      });
    });


  }

}
