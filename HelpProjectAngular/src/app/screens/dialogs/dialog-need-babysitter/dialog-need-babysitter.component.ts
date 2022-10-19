import { NeedBabysitter } from './../../../model/needBabysitter';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityServiceService } from 'src/app/services/city-service.service';
import { NeedBabysitterService } from 'src/app/services/need-babysitter.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-dialog-need-babysitter',
  templateUrl: './dialog-need-babysitter.component.html',
  styleUrls: ['./dialog-need-babysitter.component.css']
})
export class DialogNeedBabysitterComponent implements OnInit {

  minDate:Date;
  maxDate:Date;
  needBabysitterForm!:FormGroup;
  sliceTimeBabysitter:FormGroup;
  nameForm:string="עדכון חיפוש ביביסיטר"
  actionBtn:string="שמור";
  public cities:any=[];
  constructor(private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _bbsitService:NeedBabysitterService,private dialogRef:MatDialogRef<DialogNeedBabysitterComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) {
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

  ngOnInit(){
    this.cities=this._cityService.getCities().subscribe({
      next:(res)=>{
        this.cities=res;
      }
    });
    this.needBabysitterForm=this._formBuilder.group({
      IDCity:new FormControl('',[Validators.required]),
      DateBabysitter:new FormControl(''),
      sliceTimeBabysitter:this._formBuilder.group({
        TimeSlice1:false,
        TimeSlice2:false,
        TimeSlice3:false,
        TimeSlice4:false
      }),
      Comments:new FormControl('')
    });
    if(this.editData){
      this.actionBtn="עדכון";
      this.needBabysitterForm.controls['IDCity'].setValue(this.editData.IDCity)
      this.needBabysitterForm.controls['DateBabysitter'].setValue(this.editData.DateBabysitter)
      this.sliceTimeBabysitter.controls['TimeSlice1'].setValue(this.editData.TimeSlice1)
      this.sliceTimeBabysitter.controls['TimeSlice2'].setValue(this.editData.TimeSlice2)
      this.sliceTimeBabysitter.controls['TimeSlice3'].setValue(this.editData.TimeSlice3)
      this.sliceTimeBabysitter.controls['TimeSlice4'].setValue(this.editData.TimeSlice4)
      this.needBabysitterForm.controls['Comments'].setValue(this.editData.Comments)
    }
  }

  updateNeedBabysitter(){
    let updNeedBabysitter:NeedBabysitter={
      IDNeedBabysitter:this.editData.IDNeedBabysitter,
      IDUser:this.editData.IDUser,
      IDCity:this.needBabysitterForm.get("IDCity")?.value,
      DateBabysitter:this.needBabysitterForm.get("DateBabysitter")?.value,
      TimeSlice1:this.sliceTimeBabysitter.get("TimeSlice1")?.value,
      TimeSlice2:this.sliceTimeBabysitter.get("TimeSlice2")?.value,
      TimeSlice3:this.sliceTimeBabysitter.get("TimeSlice3")?.value,
      TimeSlice4:this.sliceTimeBabysitter.get("TimeSlice4")?.value,
      Comments:this.needBabysitterForm.get("Comments")?.value
    };

    this._bbsitService.putNeedBabysitter(updNeedBabysitter,updNeedBabysitter.IDNeedBabysitter,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("עודכן בהצלחה")
        this.dialogRef.close()
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    })
  }

}
