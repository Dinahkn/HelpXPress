import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfferCarpool } from 'src/app/model/offerCarpool';
import { CityServiceService } from 'src/app/services/city-service.service';
import { OfferCarpoolService } from 'src/app/services/offer-carpool.service';
import * as $ from 'jquery';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-dialog-offer-carpool',
  templateUrl: './dialog-offer-carpool.component.html',
  styleUrls: ['./dialog-offer-carpool.component.css']
})
export class DialogOfferCarpoolComponent implements OnInit {

  minDate:Date;
  maxDate:Date;
  nameForm:string="עדכון הצעת נסיעה משותפת"
  actionBtn:string="שמור";
  formControlItem: FormControl = new FormControl("");
  @ViewChild("timepicker") timepicker: any;
  offerCarpoolForm!:FormGroup;
  public cities:any=[];

  //hour picker
  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }
  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }
  constructor(private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _carpoolService:OfferCarpoolService,private dialogRef:MatDialogRef<DialogOfferCarpoolComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) {
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
    this.offerCarpoolForm=this._formBuilder.group({
      IDCityDeparture:new FormControl('',[Validators.required]),
      IDCityArrival:new FormControl('',[Validators.required]),
      adressDepartureCarpool:new FormControl(''),
      adressArrivalCarpool:new FormControl(''),
      dateCarpool:new FormControl('',[Validators.required]),
      hourDepartureCarpool:new FormControl(''),
      CarModel:new FormControl(''),
      Price:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
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
      this.offerCarpoolForm.controls['dateCarpool'].setValue(this.editData.DateHourDeparture.substring(0,10))
      this.offerCarpoolForm.controls['hourDepartureCarpool'].setValue(this.editData.DateHourDeparture.substring(11))
      this.offerCarpoolForm.controls['IDCityDeparture'].setValue(this.editData.IDCityDeparture)
      this.offerCarpoolForm.controls['IDCityArrival'].setValue(this.editData.IDCityArrival)
      this.offerCarpoolForm.controls['CarModel'].setValue(this.editData.CarModel)
      this.offerCarpoolForm.controls['Price'].setValue(this.editData.Price)
      this.offerCarpoolForm.controls['Comments'].setValue(this.editData.Comments)
   }
  }

  async updateCarpool(){
    var adressDToChange=this.offerCarpoolForm.get("adressDepartureCarpool")?.value||'תחנה מרכזית';
    adressDToChange=adressDToChange.replace(" ","+");
    let cityDName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.offerCarpoolForm.get("cityDepartureCarpool")?.value))).CityName;
    var adressAToChange=this.offerCarpoolForm.get("adressArrivalCarpool")?.value||'תחנה מרכזית';
    adressAToChange=adressAToChange.replace(" ","+");
    let cityAName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.offerCarpoolForm.get("cityArrivalCarpool")?.value))).CityName;
    let date=new Date(this.offerCarpoolForm.get("dateCarpool")?.value).toString();
    let dateHour=date.replace("00:00:00",this.offerCarpoolForm.get("hourDepartureCarpool")?.value);
    $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressDToChange+","+cityDName+",+IL&key="+MYAPIKEY,
    async (data1)=>{
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressAToChange+","+cityAName+",+IL&key="+MYAPIKEY,
      async (data2)=>{
        let updateCarpool:OfferCarpool={
          IDUser:this.editData.IDUser,
          IDCarpool:this.editData.IDCarpool,
          IDCityDeparture:this.offerCarpoolForm.get("IDCityDeparture")?.value,
          IDCityArrival:this.offerCarpoolForm.get("IDCityArrival")?.value,
          DepartureLatitude: data1.results[0].geometry.location.lat,
          DepartureLongitude:data1.results[0].geometry.location.lng,
          ArrivalLatitude: data2.results[0].geometry.location.lat,
          ArrivalLongitude:data2.results[0].geometry.location.lng,
          DateHourDeparture:new Date(dateHour),
          CarModel:this.offerCarpoolForm.get("CarModel")?.value,
          Price:this.offerCarpoolForm.get("Price")?.value,
          Comments:this.offerCarpoolForm.get("Comments")?.value
        };
        this._carpoolService.putOfferCarpool(updateCarpool,updateCarpool.IDCarpool,this._authService.shareData)
        .subscribe({
          next:()=>{
            alert("עודכן בהצלחה")
            this.dialogRef.close()
          },
          error:(error)=>{
            alert(error)
            alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
          }
        });
      })
      .fail(()=>{
        alert('תכתוב הכתובת באנגלית'); // or whatever
      })
    });
  }

}
