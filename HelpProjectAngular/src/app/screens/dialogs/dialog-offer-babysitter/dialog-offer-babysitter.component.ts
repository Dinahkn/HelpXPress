import { OfferBabysitter } from './../../../model/offerBabysitter';
import { City } from './../../../model/city';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityServiceService } from 'src/app/services/city-service.service';
import { OfferBabysitterService } from 'src/app/services/offer-babysitter.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-dialog-offer-babysitter',
  templateUrl: './dialog-offer-babysitter.component.html',
  styleUrls: ['./dialog-offer-babysitter.component.css']
})
export class DialogOfferBabysitterComponent implements OnInit {

  minDate:Date;
  maxDate:Date;
  offerBabysitterForm!:FormGroup;
  sliceTimeBabysitter:FormGroup;
  nameForm:string="עדכון הצעת ביביסיטר"
  actionBtn:string="שמור";
  public cities:any=[];
  constructor(private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _bbsitService:OfferBabysitterService,private dialogRef:MatDialogRef<DialogOfferBabysitterComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) {
    const currentYear=new Date().getFullYear();
    const currentMonth=new Date().getMonth();
    const currentDay=new Date().getDate();
    this.minDate=new Date(currentYear,currentMonth,currentDay);
    this.maxDate=new Date(currentYear+1,11,32);
    this.sliceTimeBabysitter=this._formBuilder.group({
      TimeSlice1:false,
      TimeSlice2:false,
      TimeSlice3:false,
      TimeSlice4:false
    });
  }

  ngOnInit() {
    this.cities=this._cityService.getCities().subscribe({
      next:(res)=>{
        this.cities=res;
      }
    });

    this.offerBabysitterForm=this._formBuilder.group({
      IDCity:new FormControl('',[Validators.required]),
      DateBabysitter:new FormControl(''),
      sliceTimeBabysitter:this._formBuilder.group({
        TimeSlice1:false,
        TimeSlice2:false,
        TimeSlice3:false,
        TimeSlice4:false
      }),
      YearsExperience:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      Price:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      Comments:new FormControl('')
    })

    if(this.editData){
      this.actionBtn="עדכון";
      this.offerBabysitterForm.controls['IDCity'].setValue(this.editData.IDCity)
      this.offerBabysitterForm.controls['DateBabysitter'].setValue(this.editData.DateBabysitter)
      this.sliceTimeBabysitter.controls['TimeSlice1'].setValue(this.editData.TimeSlice1)
      this.sliceTimeBabysitter.controls['TimeSlice2'].setValue(this.editData.TimeSlice2)
      this.sliceTimeBabysitter.controls['TimeSlice3'].setValue(this.editData.TimeSlice3)
      this.sliceTimeBabysitter.controls['TimeSlice4'].setValue(this.editData.TimeSlice4)
      this.offerBabysitterForm.controls['YearsExperience'].setValue(this.editData.YearsExperience)
      this.offerBabysitterForm.controls['Price'].setValue(this.editData.Price)
      this.offerBabysitterForm.controls['Comments'].setValue(this.editData.Comments)
   }
  }

  updateBabysitter(){
    let updBabysitter:OfferBabysitter={
      IDUser:this.editData.IDUser,
      IDBabysitter:this.editData.IDBabysitter,
      IDCity:this.offerBabysitterForm.get("IDCity")?.value,
      Price:this.offerBabysitterForm.get("Price")?.value,
      DateBabysitter:this.offerBabysitterForm.get("DateBabysitter")?.value,
      TimeSlice1:this.sliceTimeBabysitter.get("TimeSlice1")?.value,
      TimeSlice2:this.sliceTimeBabysitter.get("TimeSlice2")?.value,
      TimeSlice3:this.sliceTimeBabysitter.get("TimeSlice3")?.value,
      TimeSlice4:this.sliceTimeBabysitter.get("TimeSlice4")?.value,
      YearsExperience:this.offerBabysitterForm.get("YearsExperience")?.value,
      Comments:this.offerBabysitterForm.get("Comments")?.value
    };
    this._bbsitService.putOfferBabysitter(updBabysitter,updBabysitter.IDBabysitter,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("עודכן בהצלחה")
        this.dialogRef.close()
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    });
  }


}
